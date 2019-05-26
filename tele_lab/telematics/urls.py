from django.urls import path
from rest_framework.routers import DefaultRouter

from . import views

router = DefaultRouter()
router.register('academic_program', views.AcademicProgramView, base_name='academic_program')

urlpatterns = [
    path('loan/create/', views.LoanView.as_view({'post': 'create_loan'}), name='create_loan'),
    path('loan/edit/<int:pk>/', views.LoanView.as_view({'put': 'edit_loan'}), name='edit_loan'),
    path('loan/pending/', views.LoanView.as_view({'get': 'get_pending_loan'}), name='get_pending_loan'),
    path('loan/component/<int:pk>/', views.LoanView.as_view({'get': 'get'}), name='get_component'),
    path('loan/components/<int:loan_id>/', views.LoanView.as_view({'get': 'get_components_loan'}),
         name='get_pending_loan'),
    path('loan/component/update/<int:pk>/', views.LoanView.as_view({'patch': 'patch'}),
         name='update'),
    path('loan/update/<int:pk>/', views.LoanView.as_view({'put': 'change_loan'}),
         name='change_loan'),
    path('loan/pending/search', views.LoanView.as_view({'get': 'search_pending_loan'}), name='search_pending_loan'),
    path('loan/components/search', views.LoanView.as_view({'post': 'search_components'}), name='search_components'),
    path('loan/history/search', views.LoanView.as_view({'get': 'search_loan_history'}), name='search_loan_history'),

    path('sanction/create/', views.SanctionsView.as_view({'post': 'post'}), name='create_sanction'),
    path('sanction/update/<int:pk>/', views.SanctionsView.as_view({'patch': 'patch'}), name='update_sanction'),
    path('sanction/delete/<int:pk>/', views.SanctionsView.as_view({'delete': 'delete'}), name='delete_sanction'),

    path('loan/pending/components', views.get_components_pending_loan, name='get_components_pending_loan'),
    path('loan/components', views.get_components, name='get_components'),
]
urlpatterns += router.urls
