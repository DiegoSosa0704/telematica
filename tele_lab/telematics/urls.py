from django.urls import path
from rest_framework.routers import DefaultRouter

from . import views

router = DefaultRouter()
router.register('loan', views.LoanView, base_name='loan')
router.register('academic_program', views.AcademicProgramView, base_name='academic_program')
router.register('components', views.ComponentView, base_name='components')

urlpatterns = [
                  path('components/search', views.search_components, name='get_data_table'),
                  path('loan/pending/components', views.get_components_pending_loan,
                       name='get_components_pending_loan'),
                  path('loan/components', views.get_components,
                       name='get_components'),
              ] + router.urls
