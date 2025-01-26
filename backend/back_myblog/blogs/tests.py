from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from django.contrib.auth import get_user_model
from .models import Blog, BlogAndComment

User = get_user_model()

class BlogTests(APITestCase):
    def setUp(self):
        """
        テストの準備
        """
        self.user = User.objects.create_user(username='testuser', password='testpassword')
        self.blog = Blog.objects.create(title='Test Blog', tsx_path='/test/path', img_path='/image/path')

    def test_blog_list(self):
        """
        ブログリストAPIのテスト
        """
        url = reverse('blogs:blog-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['title'], 'Test Blog')

    def test_blog_detail(self):
        """
        ブログ詳細APIのテスト
        """
        url = reverse('blogs:blog-detail', kwargs={'id': self.blog.id})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['title'], 'Test Blog')

    def test_blog_detail_not_found(self):
        """
        ブログ詳細APIのNotFoundテスト
        """
        url = reverse('blogs:blog-detail', kwargs={'id': 999}) # 存在しないID
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_comment_create(self):
        """
        コメント作成APIのテスト
        """
        self.client.force_authenticate(user=self.user) # 認証
        url = reverse('blogs:comment-create', kwargs={'id': self.blog.id})
        data = {'comment': 'Test comment'}
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(BlogAndComment.objects.count(), 1)
        self.assertEqual(BlogAndComment.objects.get().comment, 'Test comment')
        self.assertEqual(BlogAndComment.objects.get().owner, self.user)
        self.assertEqual(BlogAndComment.objects.get().blog, self.blog)

    def test_comment_create_unauthenticated(self):
        """
        コメント作成APIの未認証エラーテスト
        """
        url = reverse('blogs:comment-create', kwargs={'id': self.blog.id})
        data = {'comment': 'Test comment'}
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertEqual(BlogAndComment.objects.count(), 0)

    def test_comment_edit(self):
        """
        コメント編集APIのテスト (PUT)
        """
        comment = BlogAndComment.objects.create(blog=self.blog, owner=self.user, comment='Old comment')
        self.client.force_authenticate(user=self.user) # 認証
        url = reverse('blogs:comment-edit', kwargs={'pk': comment.pk})
        data = {'comment': 'Updated comment'}
        response = self.client.put(url, data) # PUTリクエスト
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(BlogAndComment.objects.get(pk=comment.pk).comment, 'Updated comment')

    def test_comment_edit_unauthenticated(self):
        """
        コメント編集APIの未認証エラーテスト
        """
        comment = BlogAndComment.objects.create(blog=self.blog, owner=self.user, comment='Old comment')
        url = reverse('blogs:comment-edit', kwargs={'pk': comment.pk})
        data = {'comment': 'Updated comment'}
        response = self.client.put(url, data) # PUTリクエスト
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertEqual(BlogAndComment.objects.get(pk=comment.pk).comment, 'Old comment') # 更新されていないこと

    def test_comment_edit_other_user_comment(self):
        """
        コメント編集APIの別ユーザーのコメント編集エラーテスト
        """
        other_user = User.objects.create_user(username='otheruser', password='testpassword')
        comment = BlogAndComment.objects.create(blog=self.blog, owner=other_user, comment='Old comment')
        self.client.force_authenticate(user=self.user) # 認証 (別のユーザーで認証)
        url = reverse('blogs:comment-edit', kwargs={'pk': comment.pk})
        data = {'comment': 'Updated comment'}
        response = self.client.put(url, data) # PUTリクエスト
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND) # 404になる (get_querysetでフィルタリング)
        self.assertEqual(BlogAndComment.objects.get(pk=comment.pk).comment, 'Old comment') # 更新されていないこと


    def test_comment_delete(self):
        """
        コメント削除APIのテスト
        """
        comment = BlogAndComment.objects.create(blog=self.blog, owner=self.user, comment='Test comment')
        self.client.force_authenticate(user=self.user) # 認証
        url = reverse('blogs:comment-edit', kwargs={'pk': comment.pk})
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(BlogAndComment.objects.count(), 0)

    def test_comment_list(self):
        """
        コメントリストAPIのテスト
        """
        BlogAndComment.objects.create(blog=self.blog, owner=self.user, comment='Comment 1')
        BlogAndComment.objects.create(blog=self.blog, owner=self.user, comment='Comment 2')
        other_user = User.objects.create_user(username='otheruser2', password='testpassword')
        BlogAndComment.objects.create(blog=self.blog, owner=other_user, comment='Other user comment') # 他のユーザーのコメント
        self.client.force_authenticate(user=self.user) # 認証
        url = reverse('blogs:comment-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2) # ログインユーザーのコメントのみ取得される
        comment_texts = [item['comment'] for item in response.data]
        self.assertIn('Comment 1', comment_texts)
        self.assertIn('Comment 2', comment_texts)
        self.assertNotIn('Other user comment', comment_texts) # 他のユーザーのコメントは含まれない