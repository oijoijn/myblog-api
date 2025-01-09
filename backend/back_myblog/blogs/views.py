from rest_framework import views, permissions, generics, mixins, status
from . import models, serializers, custompermissions
from rest_framework.response import Response
from django.views.generic import TemplateView
from rest_framework.exceptions import NotFound


class BlogListAPI(generics.ListAPIView):
    '''
    HTTP Methods: GET
    Permissions: Anyone
    Operation: 複数の記事を表示
    '''
    queryset = models.Blog.objects.all().order_by('-created_at')
    serializer_class = serializers.BlogListSeriaizer  
    permission_classes = [permissions.AllowAny]


class BlogDetailAPI(generics.RetrieveAPIView):
    '''
    HTTP Methods: GET
    Permissions: Anyone
    Operation: 1つのBlogとBlogに対するCommentを表示
    '''
    queryset = models.Blog.objects.all()
    serializer_class = serializers.BlogDetailSeriaizer
    permission_classes = [permissions.AllowAny]
    lookup_field = 'id'

class CommentCreateAPI(generics.CreateAPIView):
    '''
    HTTP Methods: POST
    Permissions: LoginUser
    Operation: Commentを保存
    '''
    queryset = models.BlogAndComment.objects.all()
    serializer_class = serializers.BlogAndCommentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        print(f'request:{self.request}')
        try:
            blog = models.Blog.objects.get(id=self.kwargs['id'])  # URLからidを取得
            serializer.save(blog=blog, owner=self.request.user)  # blogとownerを保存
        except models.Blog.DoesNotExist:
            raise NotFound("404 Not Found")


class CommentEditAPI(generics.RetrieveUpdateDestroyAPIView):
    '''
    todo: permissionsはこれでいいのか
    HTTP Methods: GET, PUT, PATCH, DELETE
    Permissions: LoginUser
    Operation: 特定のコメントを取得または編集
    '''
    queryset = models.BlogAndComment.objects.all()
    serializer_class = serializers.BlogAndCommentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # ログインユーザーが所有するコメントのみを対象とする
        return models.BlogAndComment.objects.filter(owner=self.request.user)


class CommentListAPI(generics.ListAPIView):
    '''
    HTTP Methods: GET
    Permissions: LoginUser
    Operation: ログインユーザのコメントを取得
    '''
    queryset = models.BlogAndComment.objects.all()
    serializer_class = serializers.BlogAndCommentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # ログインユーザーが所有するコメントのみを対象とする
        return models.BlogAndComment.objects.filter(owner=self.request.user)


class DocsView(TemplateView):
    template_name = 'swagger-ui.html'
    extra_context = {'schema_url': 'schema'}
    permission_classes = [permissions.AllowAny]