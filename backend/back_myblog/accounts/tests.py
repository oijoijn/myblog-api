from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from django.contrib.auth import get_user_model

User = get_user_model()

class AccountTests(APITestCase):
    def test_signup(self):
        """
        サインアップAPIのテスト
        """
        url = reverse('accounts:signup')
        data = {
            'username': 'testuser',
            'password1': 'testpassword',
            'password2': 'testpassword'
        }
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(User.objects.count(), 1)
        self.assertEqual(User.objects.get().username, 'testuser')

    def test_signup_password_mismatch(self):
        """
        サインアップAPIのパスワード不一致エラーテスト
        """
        url = reverse('accounts:signup')
        data = {
            'username': 'testuser',
            'password1': 'testpassword',
            'password2': 'differentpassword'
        }
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(User.objects.count(), 0)
        self.assertIn('password', response.data)

    def test_password_change(self):
        """
        パスワード変更APIのテスト
        """
        user = User.objects.create_user(username='testuser', password='oldpassword')
        self.client.force_authenticate(user=user) # 認証
        url = reverse('accounts:passwordchange')
        data = {
            'old_password': 'oldpassword',
            'new_password1': 'newpassword_newpassword',
            'new_password2': 'newpassword_newpassword'
        }
        response = self.client.put(url, data) # PUTリクエスト
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # パスワードが変更されたか検証
        self.assertTrue(user.check_password('newpassword_newpassword'))

    def test_password_change_incorrect_old_password(self):
        """
        パスワード変更APIの古いパスワード間違いエラーテスト
        """
        user = User.objects.create_user(username='testuser', password='oldpassword')
        self.client.force_authenticate(user=user) # 認証
        url = reverse('accounts:passwordchange')
        data = {
            'old_password': 'wrongpassword',
            'new_password1': 'newpassword',
            'new_password2': 'newpassword'
        }
        response = self.client.put(url, data) # PUTリクエスト
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('old_password', response.data)

    def test_password_change_password_mismatch(self):
        """
        パスワード変更APIの新しいパスワード不一致エラーテスト
        """
        user = User.objects.create_user(username='testuser', password='oldpassword')
        self.client.force_authenticate(user=user) # 認証
        url = reverse('accounts:passwordchange')
        data = {
            'old_password': 'oldpassword',
            'new_password1': 'newpassword',
            'new_password2': 'differentpassword'
        }
        response = self.client.put(url, data) # PUTリクエスト
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('new_password2', response.data)