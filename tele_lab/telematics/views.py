from django.core.paginator import Paginator
from django.db.models import Q, Subquery, Count
from django.shortcuts import get_object_or_404
from rest_framework import mixins
from rest_framework import status, viewsets
from rest_framework.decorators import api_view, action
from rest_framework.response import Response

from utils.utils_token import get_user_token
from .models import Loan, Sanction, AcademicProgram, Component, LoanComponent, ComponentStock
from .serializers import LoanSerializer, SanctionSerializer, AcademicProgramSerializer, ComponentSerializer, \
    ComponentLoanSerializer, LoanComponentSerializer, LoanBaseSerializer, LoanHistorySerializer, \
    ComponentStockSerializer


class LoanView(mixins.UpdateModelMixin,
               mixins.RetrieveModelMixin,
               viewsets.GenericViewSet):
    queryset = LoanComponent.objects.all()
    serializer_class = LoanComponentSerializer

    @action(methods=['get'], detail=False)
    def search_components(self, request):
        if 'q' in request.GET \
                and '_page' in request.GET \
                and '_sort' in request.GET \
                and '_order' in request.GET \
                and '_limit' in request.GET:
            q = request.GET.get('q')
            page = request.GET.get('_page')
            order = request.GET.get('_order')
            sort = request.GET.get('_sort')
            limit = request.GET.get('_limit')
            order_sort = "-" + sort if order == 'desc' else sort
            components = ComponentStock.objects.filter(
                Q(id__icontains=q) |
                Q(name__icontains=q) |
                Q(level__icontains=q) |
                Q(type_component__name__icontains=q)
            ).order_by(order_sort)
            paginator = Paginator(components, int(limit))
            components_paginate = paginator.get_page(page)
            count_components = components.count()
            serializer = ComponentStockSerializer(components_paginate, many=True)
            return Response({"components": serializer.data, "totalCount": count_components}, status=status.HTTP_200_OK)

    @action(methods=['post'], detail=False)
    def create_loan(self, request):
        try:
            admin = get_user_token(request.auth)
        except Exception as e:
            return Response({"detail": e.args}, status.HTTP_400_BAD_REQUEST)
        request_data = request.data
        request_data.update(dict(administrator=admin.id))
        loan_serializer = LoanSerializer(data=request_data)
        if loan_serializer.is_valid(raise_exception=True):
            loan_serializer.save()
        return Response({"detail": "Loan created."}, status.HTTP_201_CREATED)

    @action(methods=['put'], detail=False)
    def edit_loan(self, request, pk):
        instance = get_object_or_404(Loan.objects.all(), pk=pk)
        serializer = LoanSerializer(instance, data=request.data, partial=True)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response({"detaul": "Loan edited."}, status=status.HTTP_200_OK)
        else:
            return Response({"detail": "Error of edited."}, status.HTTP_404_NOT_FOUND)

    @action(methods=['get'], detail=False)
    def get_pending_loan(self, request):
        pending_loan = Loan.objects.filter(state_loan=0).order_by('date_start')
        serializer_loan = LoanSerializer(pending_loan, many=True)
        return Response(serializer_loan.data, status.HTTP_200_OK)

    @action(methods=['get'], detail=False)
    def get_components_loan(self, request, loan_id):
        components_loan = LoanComponent.objects.filter(loan=loan_id).order_by('component__name')
        components_serializer = ComponentLoanSerializer(components_loan, many=True)
        if components_serializer.data:
            return Response(components_serializer.data, status.HTTP_200_OK)
        else:
            return Response({"detail": "Not found."}, status.HTTP_404_NOT_FOUND)

    @action(methods=['put'], detail=False)
    def change_loan(self, request, pk):
        instance = get_object_or_404(Loan.objects.all(), pk=pk)
        serializer = LoanBaseSerializer(instance, data=request.data, partial=True)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({"detail": "Error of update."}, status.HTTP_404_NOT_FOUND)

    @action(methods=['get'], detail=False)
    def search_pending_loan(self, request):
        if 'q' in request.GET:
            q = request.GET.get('q')
            pending_loan = Loan.objects.filter(state_loan=0).filter(
                Q(academic__first_name__icontains=q) |
                Q(academic__last_name__icontains=q) |
                Q(academic__code__icontains=q)
            ).order_by('-date_start')
            serializer = LoanSerializer(pending_loan, many=True)
            if serializer.data:
                return Response(serializer.data, status.HTTP_200_OK)
            else:
                return Response({"detail": "Not found."}, status.HTTP_404_NOT_FOUND)
        else:
            return Response({"detail": "Not found parameter 'q'"}, status.HTTP_400_BAD_REQUEST)

    @action(methods=['get'], detail=False)
    def search_loan_history(self, request):
        if 'q' in request.GET \
                and '_page' in request.GET \
                and '_sort' in request.GET \
                and '_order' in request.GET \
                and '_limit' in request.GET:
            q = request.GET.get('q')
            page = request.GET.get('_page')
            order = request.GET.get('_order')
            sort = request.GET.get('_sort')
            limit = request.GET.get('_limit')
            order_sort = "-" + sort if order == 'desc' else sort
            loans = Loan.objects.filter(
                Q(academic__first_name__icontains=q) |
                Q(academic__last_name__icontains=q) |
                Q(academic__code__icontains=q) |
                Q(administrator__first_name__icontains=q) |
                Q(administrator__last_name__icontains=q)
            ).order_by(order_sort)
            paginator = Paginator(loans, int(limit))
            loan_paginate = paginator.get_page(page)
            count_loans = loans.count()
            serializer = LoanHistorySerializer(loan_paginate, many=True)
            return Response({"loans": serializer.data, "totalCount": count_loans}, status=status.HTTP_200_OK)

    @action(methods=['get'], detail=False)
    def get_stock_components(self, request, main_component):
        stock_components = Component.objects.filter(stock_component=main_component).order_by('status')
        stock_components_serializer = ComponentSerializer(stock_components, many=True)
        if stock_components_serializer.data:
            return Response(stock_components_serializer.data, status.HTTP_200_OK)
        else:
            return Response({"details": "Not found"}, status.HTTP_404_NOT_FOUND)

    @action(methods=['patch'], detail=True)
    def patch(self, request, *args, **kwargs):
        return self.partial_update(request, *args, **kwargs)

    @action(methods=['get'], detail=True)
    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)


class SanctionsView(mixins.CreateModelMixin,
                    mixins.UpdateModelMixin,
                    mixins.DestroyModelMixin,
                    viewsets.GenericViewSet):
    queryset = Sanction.objects.all()
    serializer_class = SanctionSerializer

    @action(methods=['post'], detail=True)
    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

    @action(methods=['patch'], detail=True)
    def patch(self, request, *args, **kwargs):
        return self.partial_update(request, *args, **kwargs)

    @action(methods='delete', detail=True)
    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)


class AcademicProgramView(viewsets.ViewSet):
    def list(self, request):
        queryset = AcademicProgram.objects.all()
        serializer = AcademicProgramSerializer(queryset, many=True)
        return Response(serializer.data, status.HTTP_200_OK)


@api_view(['GET'])
def get_components_pending_loan(request):
    components_loan = LoanComponent.objects.all()
    serializer_component_loan = LoanSerializer(components_loan, many=True)
    return Response(serializer_component_loan.data, status.HTTP_200_OK)


@api_view(['GET'])
def get_components(request):
    components_loan = Component.objects.all()
    serializer_component = ComponentSerializer(components_loan, many=True)
    return Response(serializer_component.data, status.HTTP_200_OK)
