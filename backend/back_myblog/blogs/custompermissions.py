from rest_framework import permissions

class IsOwnerOrReadOnly(permissions.BasePermission):
    """
    オブジェクトの所有者にのみ編集を許可するカスタム権限
    """

    def has_object_permission(self, request, view, obj):
        # 読み取り権限はどのリクエストにも許可されます。
        # したがって、GET、HEAD、または OPTIONS リクエストは常に許可されます。
        if request.method in permissions.SAFE_METHODS:
            return True

        # 書き込み権限はスニペットの所有者にのみ許可されます。
        return obj.owner == request.user
