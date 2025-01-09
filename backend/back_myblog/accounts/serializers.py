from rest_framework import serializers
from django.contrib.auth import authenticate, password_validation
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.password_validation import validate_password
from . import models

class SignUpSerializer(serializers.ModelSerializer):
    '''
    SignUp時に使用
    '''
    password1 = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = models.CustomUser
        fields = ["username", "password1", "password2"]

    def validate(self, attrs):
        if attrs['password1'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Passwords do not match."})
        return attrs

    def create(self, validated_data):
        user = models.CustomUser.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password1'],
            email=validated_data.get('email')
        )
        return user

class PasswordChangeSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True, write_only=True, label=_("Old password"))
    new_password1 = serializers.CharField(required=True, write_only=True, style={'input_type': 'password'}, label=_("New password"))
    new_password2 = serializers.CharField(required=True, write_only=True, style={'input_type': 'password'}, label=_("New password confirmation"))

    def __init__(self, *args, **kwargs):
        self.user = kwargs.pop('user', None)
        super().__init__(*args, **kwargs)

    def validate_old_password(self, value):
        if not authenticate(username=self.user.username, password=value):
            raise serializers.ValidationError(_("Your old password was entered incorrectly. Please enter it again."))
        return value

    def validate(self, data):
        if data.get('new_password1') and data.get('new_password2') and data['new_password1'] != data['new_password2']:
            raise serializers.ValidationError({
                'new_password2': _("The two password fields didn't match.")
            })
        password_validation.validate_password(data['new_password1'], user=self.user)
        return data

    def save(self, **kwargs):
        self.user.set_password(self.validated_data['new_password1'])
        self.user.save()
        return self.user