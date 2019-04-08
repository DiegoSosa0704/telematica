from rest_framework import serializers
from .models import Loan, Sanction, AcademicProgram, Academic
from users import serializers as user_serializers


class LoanSerializer(serializers.ModelSerializer):
    class Meta:
        model = Loan
        fields = '__all__'


class SanctionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sanction
        fields = '__all__'


class AcademicProgramSerializer(serializers.ModelSerializer):
    class Meta:
        model = AcademicProgram
        fields = '__all__'


class AcademicSerializer(serializers.ModelSerializer):
    """
     {
        "user": {
            "email": "lihimotosu@red-mail.top"
        },
        "id_academic_program": {
            "id": 4,
            "name": "Ingeniería de Sistemas y Computación",
            "code": 78,
            "id_headquarters": 2
        }
    },
    """
    user = user_serializers.UserDataSerializer(read_only=True)
    id_academic_program = AcademicProgramSerializer(read_only=True)

    class Meta:
        model = Academic
        fields = '__all__'

    def to_representation(self, instance):
        response_dict = dict(
            email=instance.user.email,
            academic_program=instance.id_academic_program.name,
            title=instance.last_name + " " + instance.first_name,
            description="Estudiante" if instance.type == "ES" else "Docente",
            code=instance.code
        )
        return response_dict
