import json

from braces.views import CsrfExemptMixin
from django.contrib.auth.hashers import make_password
from django.core import serializers
from django.forms.models import model_to_dict
from django.http import HttpResponse, JsonResponse
from django.utils import timezone
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.debug import sensitive_post_parameters
from django.views.generic import View
from oauth2_provider.models import get_access_token_model
from oauth2_provider.settings import oauth2_settings
from oauth2_provider.signals import app_authorized
from oauth2_provider.views.mixins import OAuthLibMixin
from rest_framework import status, permissions
from rest_framework import status as status_rest
from rest_framework import viewsets
from rest_framework.decorators import action, api_view
from rest_framework.response import Response
from rolepermissions.roles import assign_role
from django.views.decorators.csrf import ensure_csrf_cookie

from email_manager.service import EmailSender
from utils import utils_token
from . import models, serializers
from .models import User


@api_view(['GET'])
def get_user_data(request, token):
    try:
        user = utils_token.get_user_token(token)
        dict_obj = model_to_dict(user)
        dict_obj.pop('id')
        dict_obj.pop('last_login')
        dict_obj.pop('groups')
        dict_obj.pop('user_permissions')
        dict_obj.pop('password')
        print(dict_obj)
    except Exception as e:
        return Response({'detail': e.args}, status=status.HTTP_404_NOT_FOUND)
    return Response(dict_obj, status=status.HTTP_200_OK)


@api_view(['GET'])
def is_admin(request, token):
    try:
        user = utils_token.get_user_token(token)
    except Exception as e:
        return Response({'detail': e.args}, status=status.HTTP_404_NOT_FOUND)
    return Response({"is_admin": user.is_admin}, status=status.HTTP_200_OK)


class UserRegisterDRF(viewsets.ModelViewSet, CsrfExemptMixin, OAuthLibMixin):
    queryset = models.User.objects.filter(is_active=False)
    serializer_class = serializers.UserSerializer

    permission_classes = (permissions.AllowAny,)
    # permission_classes = (IsAuthenticatedOrCreate,)
    server_class = oauth2_settings.OAUTH2_SERVER_CLASS
    validator_class = oauth2_settings.OAUTH2_VALIDATOR_CLASS
    oauthlib_backend_class = oauth2_settings.OAUTH2_BACKEND_CLASS

    @action(methods=['post'], detail=False)
    def create_user(self, request):
        email_sender = EmailSender()
        serializer = serializers.UserSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            try:
                try:
                    user = serializer.save()
                except Exception as e:
                    return Response({"detail": e.args}, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
                # url, headers, body, token_status = self.create_token_response(request)
                assign_role(user, 'academic')
                token = utils_token.generate_email_token(user.id)
                body_verify_email = email_sender.verify_email_body(token=token)
                email_sender.send_html_email(subject_param="Verify register", to_param=request.data['email'],
                                             html_content=body_verify_email)
            except Exception:
                return Response({"detail": "Error to send email"},
                                status=status.HTTP_422_UNPROCESSABLE_ENTITY)

            return Response({"detail": "user created"}, status=status.HTTP_201_CREATED)

    @action(methods=['post'], detail=False)
    def create_admin(self, request):
        email_sender = EmailSender()
        serializer = serializers.AdminSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            try:
                try:
                    user = serializer.save()
                except Exception:
                    return Response({"detail": "Error to save user"}, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
                # url, headers, body, token_status = self.create_token_response(request)
                assign_role(user, 'admin')
                token = utils_token.generate_email_token(user.id)
                body_verify_email = email_sender.verify_email_body(token=token)
                email_sender.send_html_email(subject_param="Verify register", to_param=request.data['email'],
                                             html_content=body_verify_email)
            except Exception:
                return Response({"detail": "Error to send email"},
                                status=status.HTTP_422_UNPROCESSABLE_ENTITY)

            return Response({"detail": "user created"}, status=status.HTTP_201_CREATED)

    # metodo para enviar link para cambiar password
    @action(methods=['post'], detail=False)
    def restore_password(self, request):
        if 'email' in request.data:
            email_params = request.data['email']
            try:
                user = models.User.objects.get(email=email_params)
            except Exception:
                return Response({"detail": "email don't exist"}, status=status.HTTP_404_NOT_FOUND)

            try:
                email_sender = EmailSender()
                token = utils_token.generate_email_token(user.id)
                body_verify_email = email_sender.restore_password_body(token=token)
                email_sender.send_html_email(subject_param="Restore password", to_param=request.data['email'],
                                             html_content=body_verify_email)
                return Response({"detail": "email send"}, status=status.HTTP_200_OK)
            except Exception:
                return Response({"detail": "Server failed"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
            return Response({"detail": "needs email param"}, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

    # metodo para recibir nuevo password
    @action(methods=['post'], detail=False)
    def new_password(self, request):
        serializer = serializers.PasswordRestoreSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            token = request.data['token']
            password_1 = request.data['password_1']
            password_2 = request.data['password_2']
            if password_1 != password_2:
                return Response({"detail": "password don't match"}, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
            try:
                user = utils_token.get_user_token(token)
            except Exception:
                return Response({"detail": "unknown token"}, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
            password = make_password(password_1)
            user.password = password
            user.save()
        return Response({"detail": "Password changed, please login"}, status=status.HTTP_200_OK)

    # metodo para recibir token para verificar email
    @action(methods=['post'], detail=False)
    def verify_email(self, request):
        if 'token' in request.data:
            token_param = request.data['token']
            try:
                token = utils_token.get_token(token_param)
            except Exception:
                return Response({"detail": "token not found"}, status=status.HTTP_404_NOT_FOUND)
            token_time_expires = token.expires
            time_now = timezone.now()
            if token_time_expires < time_now:
                return Response({"detail": "token expired"}, status=status.HTTP_406_NOT_ACCEPTABLE)
            try:
                user = utils_token.get_user_token(token=token)
                user.is_active = True
                user.save()
                utils_token.delete_token(token)
            except Exception:
                return Response({"detail": "token not found"}, status=status.HTTP_404_NOT_FOUND)
            return Response({"detail": "verified account"}, status=status.HTTP_200_OK)
        else:
            return Response({"detail": "needs token param"}, status=status.HTTP_422_UNPROCESSABLE_ENTITY)


@method_decorator(csrf_exempt, name='dispatch')
class TokenView(OAuthLibMixin, View):
    server_class = oauth2_settings.OAUTH2_SERVER_CLASS
    validator_class = oauth2_settings.OAUTH2_VALIDATOR_CLASS
    oauthlib_backend_class = oauth2_settings.OAUTH2_BACKEND_CLASS

    @method_decorator(sensitive_post_parameters("password"))
    def post(self, request, *args, **kwargs):
        load_body = json.loads(request.body)
        try:
            username = load_body['username']
            try:
                user = User.objects.get(email=username)
            except Exception as e:
                body = {"error": "email don't found"}
                response = JsonResponse(body, status=status_rest.HTTP_401_UNAUTHORIZED)
                return response
        except KeyError:
            token = request.META.get('HTTP_AUTHORIZATION').split('Bearer ')[1]
            try:
                user = utils_token.get_user_token(token)
            except Exception as e:
                body = {"error": "Bearer token don't found"}
                response = JsonResponse(body, status=status_rest.HTTP_401_UNAUTHORIZED)
                return response

        if user.is_active:
            url, headers, body, status = self.create_token_response(request)
            if status == 200:
                access_token = json.loads(body).get("access_token")
                if access_token is not None:
                    token = get_access_token_model().objects.get(
                        token=access_token)
                    app_authorized.send(
                        sender=self, request=request,
                        token=token)
                data = json.loads(body)
                if user.is_admin:
                    data.update({'is_admin': True})
                else:
                    data.update({'is_admin': False})
                body = json.dumps(data)
            response = HttpResponse(content=body, status=status)

            for k, v in headers.items():
                response[k] = v
            return response
        else:
            body = {"error": "unverify email"}
            response = JsonResponse(body, status=status_rest.HTTP_401_UNAUTHORIZED)
            return response
