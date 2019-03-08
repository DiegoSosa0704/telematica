from rest_framework.validators import UniqueValidator
from rest_framework import serializers
from . import models


class UserSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(required=False)
    last_name = serializers.CharField(required=False)
    password = serializers.CharField(write_only=True, required=True)
    email = serializers.EmailField(validators=[UniqueValidator(queryset=models.User.objects.all())])

    class Meta:
        model = models.User
        fields = ('email', 'first_name', 'last_name', 'password')

    def create(self, validated_data):
        user = super(UserSerializer, self).create(validated_data)
        user.set_password(validated_data['password'])
        user.save()
        return user


class PasswordRestoreSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.PasswordRestore
        fields = ("__all__")
