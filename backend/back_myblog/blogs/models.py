from django.db import models
from django.conf import settings

class Blog(models.Model):
    '''
    Operation:ブログ記事のメタデータを保存する
    id:自動的に付加される
    '''
    title = models.CharField(max_length=255)  # 記事のタイトル
    created_at = models.DateField(auto_now_add=True)  # 作成日（時間なし）
    updated_at = models.DateTimeField(auto_now=True)  # 更新日
    html_file = models.CharField(max_length=255)  # 記事に対応するHTMLファイルのパス
    img_file = models.CharField(max_length=255)  # 記事の画像に対するpath

    def __str__(self):
        return self.title

class BlogAndComment(models.Model):
    '''
    Operation:記事に対するコメントを保存する
    '''
    blog = models.ForeignKey(Blog, related_name='comments', on_delete=models.CASCADE)  # 修正済み
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    comment = models.TextField(max_length=200, blank=False, null=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'owner : {self.owner} on {self.comment}'