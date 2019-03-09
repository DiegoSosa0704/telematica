from rest_framework.validators import UniqueValidator
from rest_framework import serializers
from .models import User, PasswordRestore
from telematics import models as telematics_models


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True)
    email = serializers.EmailField(validators=[UniqueValidator(queryset=User.objects.all())])

    type = serializers.CharField(max_length=2)
    code = serializers.CharField(max_length=25, required=True)
    first_name = serializers.CharField(max_length=25)
    last_name = serializers.CharField(max_length=25)
    academic_program = serializers.CharField(max_length=2)

    class Meta:
        model = User
        fields = ('email', 'password', 'first_name', 'last_name', 'code', 'type', 'academic_program')

    def create(self, validated_data):
        user = User.objects.create(email=validated_data.get('email'), password=validated_data.get('password'))
        user.set_password(validated_data['password'])
        academic = telematics_models.Academic.objects.create(
            user=user,
            first_name=validated_data.get('first_name'),
            last_name=validated_data.get('last_name'),
            code=validated_data.get('code'),
            type=validated_data.get('type'),
            academic_program=validated_data.get('academic_program'),
        )
        academic.save()
        return user


class AdminSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True)
    email = serializers.EmailField(validators=[UniqueValidator(queryset=User.objects.all())])

    first_name = serializers.CharField(max_length=25)
    last_name = serializers.CharField(max_length=25)
    cc = serializers.CharField(max_length=25)

    class Meta:
        model = User
        fields = ('email', 'password', 'first_name', 'last_name', 'cc')

    def create(self, validated_data):
        print(validated_data)
        user = User.objects.create(email=validated_data.get('email'), password=validated_data.get('password'),
                                   is_admin=True)
        user.set_password(validated_data['password'])
        user.save()
        admin = telematics_models.Administrator.objects.create(
            user=user,
            first_name=validated_data.get('first_name'),
            last_name=validated_data.get('last_name'),
            cc=validated_data.get('cc'),
        )
        admin.save()
        return user


class PasswordRestoreSerializer(serializers.ModelSerializer):
    class Meta:
        model = PasswordRestore
        fields = ("__all__")
