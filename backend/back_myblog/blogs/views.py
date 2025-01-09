from rest_framework import views, permissions, generics, mixins, status
from . import models, serializers, custompermissions
from rest_framework.response import Response
from rest_framework.exceptions import NotFound

class BlogList(generics.ListAPIView):
    '''
    HTTP Methods: GET
    Permissions: Anyone
    Operation: 複数の記事を表示する
    '''
    queryset = models.Blog.objects.all()  
    serializer_class = serializers.BlogSeriaizer  


class BlogDetail(generics.RetrieveAPIView):
    '''
    HTTP Methods: GET
    Permissions: Anyone
    Operation: Blog と Commentを表示する
    '''
    queryset = models.Blog.objects.all()
    serializer_class = serializers.BlogSeriaizer
    lookup_field = 'id'

class CommentCreate(generics.CreateAPIView):
    '''
    HTTP Methods: POST
    Permissions: LoginUser
    Operation: Commentを保存する
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
