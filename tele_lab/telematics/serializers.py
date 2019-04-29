from rest_framework import serializers

from users import serializers as user_serializers
from .models import Loan, Sanction, AcademicProgram, Academic, Component, LoanComponent, Administrator


class SanctionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sanction
        fields = '__all__'


class AcademicProgramSerializer(serializers.ModelSerializer):
    class Meta:
        model = AcademicProgram
        fields = '__all__'


class AcademicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Academic
        fields = '__all__'


class SearchAcademicSerializer(serializers.ModelSerializer):
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


class ComponentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Component
        fields = '__all__'


class AcademicLoanSerializer(serializers.ModelSerializer):
    class Meta:
        model = Academic
        fields = '__all__'


class AdministratorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Administrator
        fields = '__all__'


class ComponentLoanSerializer(serializers.ModelSerializer):
    class Meta:
        model = LoanComponent
        fields = '__all__'

    def to_representation(self, instance):
        response_dict = dict(
            id=instance.component.id,
            name=instance.component.name,
            serial=instance.component.serial,
            uptc_serial=instance.component.uptc_serial,
            state=instance.component.state,
        )
        return response_dict


class LoanHistorySerializer(serializers.ModelSerializer):
    academic_object = AcademicSerializer(read_only=True, source='academic')
    administrator_object = AdministratorSerializer(read_only=True, source='administrator')

    class Meta:
        model = Loan
        fields = (
            'date_start',
            'date_end',
            'state_loan',
            'academic_object',
            'administrator_object',
        )


class LoanComponentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Loan
        fields = '__all__'

    def to_representation(self, instance):
        response_dict = dict(
            loan=instance.loan.id,
            date_start=instance.loan.date_start,
            date_end=instance.loan.date_end,
            state_loan=instance.loan.state_loan,
            academic=dict(
                type=instance.loan.academic.type,
                code=instance.loan.academic.code,
                first_name=instance.loan.academic.first_name,
                last_name=instance.loan.academic.last_name,
                academic_program=instance.loan.academic.academic_program.name,
            ),
            administrator=dict(
                first_name=instance.loan.administrator.first_name,
                last_name=instance.loan.administrator.last_name
            )
        )
        return response_dict


class ChangeLoanSerializer(serializers.ModelSerializer):
    class Meta:
        model = LoanComponent
        fields = '__all__'


class LoanBaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Loan
        fields = '__all__'


class LoanSerializer(serializers.ModelSerializer):
    components = serializers.ListField(required=True)
    state_loan_component = serializers.IntegerField(required=True)

    class Meta:
        model = Loan
        fields = (
            'date_start',
            'state_loan',
            'administrator',
            'components',
            'academic',
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
                # date_end=validated_data.get('date_end'),
                state=0,
                component_id=component,
                loan=loan
            )
        return loan

    def update(self, instance, validated_data):
        new_components = validated_data.pop('components')
        instance.academic = validated_data.get('academic')
        LoanComponent.objects.filter(loan_id=instance.id).delete()
        for component in new_components:
            LoanComponent.objects.create(
                # date_end=validated_data.get('date_end'),
                state=0,
                component_id=component,
                loan=instance
            )

    def to_representation(self, instance):
        response_dict = dict(
            date_start=instance.date_start,
            date_end=instance.date_end,
            state_loan=instance.state_loan,
            administrator=instance.administrator.id,
            academic=dict(
                id=instance.academic.id,
                type=instance.academic.type,
                code=instance.academic.code,
                first_name=instance.academic.first_name,
                last_name=instance.academic.last_name,
                user=instance.academic.user_id,
                academic_program=instance.academic.academic_program_id
            )
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
