from rest_framework.routers import DefaultRouter
from django.urls import path, include
from . import views

router = DefaultRouter()
router.register('loan', views.LoanView, base_name='loan')

urlpatterns = [
    path('read_data/', views.read_data, name='read_data'),
] + router.urls
