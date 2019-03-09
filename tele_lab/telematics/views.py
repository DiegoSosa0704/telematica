from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response


@api_view(['GET'])
def read_data(request):
    return Response({'detail': 'keyword search completed'}, status.HTTP_200_OK)
