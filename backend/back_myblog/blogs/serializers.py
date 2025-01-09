from rest_framework import serializers
from . import models

class BlogListSeriaizer(serializers.ModelSerializer):
    '''
    複数のblogをシリアライズ,デシリアライズする
    '''
    class Meta:
        model = models.Blog
        fields = ['id', 'title', 'created_at', 'html_file', 'img_file']

class BlogDetailSeriaizer(serializers.ModelSerializer):
    '''
    一つのblogとcommentをシリアライズ,デシリアライズする
    '''
    comments = serializers.SerializerMethodField()
    class Meta:
        model = models.Blog
        fields = ['id', 'title', 'created_at', 'html_file', 'img_file', 'comments']

    def get_comments(self, obj):
        comments = obj.comments.all().order_by('-created_at')  # 最新のコメントを上に表示
        return BlogAndCommentSerializer(comments, many=True).data

class BlogAndCommentSerializer(serializers.ModelSerializer):
    '''
    commentをシリアライズ,デシリアライズする
    '''
    owner = serializers.SerializerMethodField()
    class Meta:
        model = models.BlogAndComment
        fields = ['blog', 'owner', 'comment', 'created_at', 'updated_at']
        read_only_fields = ['blog', 'owner']

    def get_owner(self, obj):
        return obj.owner.username  # ownerのusernameを返す

    def create(self, validated_data):
        request = self.context.get('request')  # リクエスト情報を取得
        blog_id = self.context.get('view').kwargs.get('id')  # URLのブログIDを取得
        try:
            blog = models.Blog.objects.get(id=blog_id)
        except models.Blog.DoesNotExist:
            raise serializers.ValidationError("Blog not found")

        validated_data['owner'] = request.user
        validated_data['blog'] = blog

        return super().create(validated_data)