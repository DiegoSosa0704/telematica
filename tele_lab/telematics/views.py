from rest_framework import status, viewsets
from rest_framework.decorators import api_view, action
from rest_framework.response import Response
from django.db.models import Q
from django.core.paginator import Paginator

from .models import Loan, Sanction, AcademicProgram, Component
from .serializers import LoanSerializer, SanctionSerializer, AcademicProgramSerializer, ComponentSerializer


@api_view(['GET'])
def read_data(request):
    return Response({'detail': 'keyword search completed'}, status.HTTP_200_OK)


class LoanView(viewsets.ModelViewSet):
    queryset = Loan.objects.all()
    serializer_class = LoanSerializer


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
    else:
        components = Component.objects.all().exclude(id__in=newListComponents).count()
        return Response(components, status=status.HTTP_200_OK)
    elif 'q' in request.GET:
        q = request.GET.get('q')
        components = Component.objects.filter(
            Q(id__icontains=q) |
            Q(name__icontains=q) |
            Q(serial__icontains=q) |
            Q(uptc_serial__icontains=q)
        ).exclude(id__in=newListComponents).count()
        return Response(components, status=status.HTTP_200_OK)
    """
