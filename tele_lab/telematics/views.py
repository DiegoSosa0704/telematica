from rest_framework import status, viewsets
from rest_framework.decorators import api_view, action
from rest_framework.response import Response

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


@api_view(['GET'])
def view_components_table(request):
    print(request.GET.get('table'))
    return Response({"data": "data"}, status.HTTP_200_OK)


class ComponentsView(viewsets.ModelViewSet):
    queryset = Component.objects.all()
    serializer_class = ComponentSerializer

    @action(methods=['get'], detail=False)
    def get_data_component(self, request):
        print(request.GET.get('table'))
        return Response({"data": "data"}, status.HTTP_200_OK)
