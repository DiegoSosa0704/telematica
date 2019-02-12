import serial

arduino = serial.Serial('COM0', baudrate=9600, timeout=5.0)
line = arduino.readline()
print(line)


