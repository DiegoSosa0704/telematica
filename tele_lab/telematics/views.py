import serial
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response


@api_view(['GET'])
def read_data(request):
    arduino = serial.Serial('COM0', baudrate=9600, timeout=5.0)
    line = arduino.readline()
    print(line)
    return Response({'detail': 'keyword search completed'}, status.HTTP_200_OK)