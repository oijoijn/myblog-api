from rest_framework import generics, permissions, status
from rest_framework.response import Response
from . import models, serializers

class SignUpAPI(generics.CreateAPIView):
    '''
    HTTP Methods: POST
    Permissions: Anyone
    Operation: Userの作成
    '''
    queryset = models.CustomUser.objects.all()
    serializer_class = serializers.SignUpSerializer
    permission_classes = [permissions.AllowAny]

class PasswordChangeViewAPI(generics.UpdateAPIView):
    serializer_class = serializers.PasswordChangeSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user

    def update(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data, user=request.user)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({'detail': 'パスワードが正常に更新されました。'}, status=status.HTTP_200_OK)
