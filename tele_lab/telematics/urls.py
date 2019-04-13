from rest_framework.routers import DefaultRouter
from django.urls import path, include
from django.conf.urls import url

from . import views

router = DefaultRouter()
router.register('loan', views.LoanView, base_name='loan')
router.register('academic_program', views.AcademicProgramView, base_name='academic_program')
router.register('get_components', views.ComponentsView, base_name='get_components')

urlpatterns = [
                  path('read_data/', views.read_data, name='read_data'),
                  path('get_data_table', views.view_components_table, name='get_data_table'),
              ] + router.urls
