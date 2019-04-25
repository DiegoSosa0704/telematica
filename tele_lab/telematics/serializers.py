from rest_framework import serializers
from .models import Loan, Sanction, AcademicProgram, Academic, Component, LoanComponent
from users import serializers as user_serializers


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
    academic_program = AcademicProgramSerializer(read_only=True)

    class Meta:
        model = Academic
        fields = '__all__'

    def to_representation(self, instance):
        response_dict = dict(
            email=instance.user.email,
            academic_program=instance.academic_program.name,
            title=instance.last_name + " " + instance.first_name,
            description="Estudiante" if instance.type == "ES" else "Docente",
            code=instance.code
        )
        return response_dict


class LoanComponentSerializer(serializers.Serializer):
    # Loan
    date_start = serializers.DateTimeField(required=True)
    state_loan = serializers.IntegerField(required=True)
    academic = serializers.IntegerField(required=True)
    administrator = serializers.IntegerField(required=True)
    # Loan Component
    date_end = serializers.DateTimeField(required=True)
    state_loan_component = serializers.IntegerField(required=True)
    loan = serializers.IntegerField(required=True)
    component = serializers.IntegerField(required=True)

    def create(self, validated_data):
        loan = Loan.objects.create(
            date_start=validated_data.get('date_start'),
            state=validated_data.get('state_loan'),
            academic=validated_data.get('academic'),
            administrator=validated_data.get('administrator'),
        ).save()
        LoanComponent.objects.create(
            date_end=validated_data.get('date_end'),
            state=validated_data.get('state_loan_component'),
            loan=loan,
            component=validated_data.get('component_id'),
        ).save()


class ComponentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Component
        fields = '__all__'


class LoanComponentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = LoanComponent
        fields = '__all__'


class AcademicsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Academic
        fields = '__all__'


class LoanSerializer(serializers.ModelSerializer):
    academic_object = AcademicsSerializer(read_only=True, source='academic')
    components = serializers.ListField(required=True)
    date_end = serializers.DateField(required=True)
    state_loan_component = serializers.IntegerField(required=True)

    class Meta:
        model = Loan
        fields = (
            'date_start',
            'state_loan',
            'administrator',
            'state_loan_component',
            'components',
            'date_end',
            'academic_object',
        )

    def create(self, validated_data):
        components_data = validated_data.pop('components')
        loan = Loan.objects.create(
            date_start=validated_data.get('date_start'),
            state_loan=validated_data.get('state_loan'),
            academic=validated_data.get('academic'),
            administrator=validated_data.get('administrator'),
        )
        for component in components_data:
            LoanComponent.objects.create(
                date_end=validated_data.get('date_end'),
                state=validated_data.get('state_loan_component'),
                component_id=component,
                loan=loan,
            )
        return loan

    def to_representation(self, instance):
        response_dict = dict(
            date_start=instance.date_start,
            state_loan=instance.state_loan,
            administrator=instance.administrator.id,
            academic=instance.academic.id,
            academic_object=instance.academic_object
        )
        return response_dict


"""
class LoanComponentSerializer(serializers.ModelSerializer):
    component_object = ComponentSerializer(read_only=True, source='component')
    loan_object = LoanSerializer(read_only=True, source='loan')

    class Meta:
        model = LoanComponent
        fields = ('id', 'date_end', 'state', 'loan_object', 'component_object',)
"""
