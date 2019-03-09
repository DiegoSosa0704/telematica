from tele_lab.settings import OAUTH2_CLIENT_ID
from oauth2_provider.models import Application, AccessToken
from datetime import timedelta
from django.utils import timezone
from oauthlib import common
from users.models import User


def generate_email_token(id_user):
    user = User.objects.get(pk=id_user)
    application = Application.objects.get(client_id=OAUTH2_CLIENT_ID)
    expires = timezone.now() + timedelta(seconds=36000)
    access_token = AccessToken(
        user=user,
        scope='',
        expires=expires,
        token=common.generate_token(),
        application=application
    )
    try:
        access_token.save()
        token = access_token
    except Exception:
        token = None
    return token


def delete_token(token_param):
    access_token = AccessToken.objects.get(token=token_param).delete()
    return access_token


def get_token(token_param):
    access_token = AccessToken.objects.get(token=token_param)
    return access_token


def get_user_token(token):
    access_token = AccessToken.objects.get(token=token)
    user = User.objects.get(pk=access_token.user.id)
    return user


def get_token_for_user(user_id):
    access_token = AccessToken.objects.filter(user_id=user_id)
    token = None
    for i in access_token:
        token = i.token
    return token
