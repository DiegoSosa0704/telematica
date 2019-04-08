from rest_framework.routers import DefaultRouter
from django.urls import path
from . import views

router = DefaultRouter()
router.register('user/registry', views.UserRegisterDRF, base_name='users_registry')
router.register('user', views.UserView, base_name='user')

urlpatterns = [
  path('get_token/', views.TokenView.as_view(), name="token"),
  path('is_admin/<str:token>', views.is_admin, name="is_admin"),
  path('get_user_data/<str:token>', views.is_admin, name="is_admin"),
] + router.urls
