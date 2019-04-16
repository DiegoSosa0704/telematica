from django.urls import path
from rest_framework.routers import DefaultRouter

from . import views

router = DefaultRouter()
router.register('loan', views.LoanView, base_name='loan')
router.register('academic_program', views.AcademicProgramView, base_name='academic_program')

urlpatterns = [
                  path('read_data/', views.read_data, name='read_data'),
                  path('components/search', views.search_components, name='get_data_table'),
              ] + router.urls
