from datetime import datetime

from django.core.paginator import Paginator
from django.db.models import Q
from rest_framework import status, viewsets
from rest_framework.decorators import api_view, action
from rest_framework.response import Response

from utils.utils_token import get_user_token
from .models import Loan, Sanction, AcademicProgram, Component, LoanComponent, Administrator, Academic
from .serializers import LoanSerializer, SanctionSerializer, AcademicProgramSerializer, ComponentSerializer, \
    LoanComponentSerializer


@api_view(['GET'])
def read_data(request):
    return Response({'detail': 'keyword search completed'}, status.HTTP_200_OK)


class LoanView(viewsets.ModelViewSet):
    queryset = Loan.objects.all()
    serializer_class = LoanSerializer

    @action(methods=['post'], detail=False)
    def create_loan(self, request):
        """
        {
            "components": [{},{}],
            "user": {}
        }
        :param request:
        :return:
        """

        user_admin = get_user_token(request.auth)
        administrator = Administrator.objects.get(user=user_admin)
        components = request.data['components']
        user = request.data['user']
        academic = Academic.objects.get(code=user.get('code'))
        date_start = datetime.today().strftime('%Y-%m-%d')
        date_end = datetime.today().strftime('%Y-%m-%d')

        try:
            # Crear préstamo
            loan = Loan.objects.create(
                date_start=date_start,
                state=0,
                academic=academic,
                administrator=administrator
            )
            loan.save()
        except Exception as e:
            return Response({"details", e.args}, status.HTTP_404_NOT_FOUND)

        # Crear préstamo componentes
        for component in components:
            LoanComponent.objects.create(
                date_end=date_end,
                state=0,
                loan=loan,
                component_id=component.get('id')
            ).save()
        return Response({"detail": "Loan created"}, status.HTTP_200_OK)

    @action(methods=['get'], detail=False)
    def get_pending_loan(self, request):
        pending_loan = Loan.objects.filter(state=0).order_by('date_start')
        serializer_loan = LoanSerializer(pending_loan, many=True)
        return Response(serializer_loan.data, status.HTTP_200_OK)


class SanctionView(viewsets.ModelViewSet):
    queryset = Sanction.objects.all()
    serializer_class = SanctionSerializer


class AcademicProgramView(viewsets.ViewSet):
    def list(self, request):
        queryset = AcademicProgram.objects.all()
        serializer = AcademicProgramSerializer(queryset, many=True)
        return Response(serializer.data, status.HTTP_200_OK)


class ComponentView(viewsets.ModelViewSet):
    queryset = Component.objects.all()
    serializer_class = ComponentSerializer


@api_view(['POST', 'GET'])
def search_components(request):
    newListComponents = []
    try:
        if request.data['components']:
            for component in request.data['components']:
                newListComponents.append(component['id'])
    except KeyError as e:
        print(e.args)

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
        components = Component.objects.filter(
            Q(id__icontains=q) |
            Q(name__icontains=q) |
            Q(serial__icontains=q) |
            Q(uptc_serial__icontains=q)
        ).exclude(id__in=newListComponents).order_by(order_sort)
        paginator = Paginator(components, int(limit))
        components_paginate = paginator.get_page(page)
        countComponents = components.count()
        serializer = ComponentSerializer(components_paginate, many=True)
        return Response({"components": serializer.data, "totalCount": countComponents}, status=status.HTTP_200_OK)


"""
Loan Components
"""


@api_view(['GET'])
def get_components_pending_loan(request):
    # components_loan = LoanComponent.objects.filter(state=0).order_by('state')
    components_loan = LoanComponent.objects.all()
    serializer_component_loan = LoanComponentSerializer(components_loan, many=True)
    return Response(serializer_component_loan.data, status.HTTP_200_OK)


@api_view(['GET'])
def get_components(request):
    # components_loan = LoanComponent.objects.filter(state=0).order_by('state')
    components_loan = Component.objects.all()
    serializer_component = ComponentSerializer(components_loan, many=True)
    return Response(serializer_component.data, status.HTTP_200_OK)
