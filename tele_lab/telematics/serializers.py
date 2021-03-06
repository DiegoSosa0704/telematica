from django.utils import timezone
from rest_framework import serializers

from users import serializers as user_serializers
from utils.general_utils import get_time_by_level
from .models import Loan, Sanction, AcademicProgram, Academic, Component, LoanComponent, Administrator, ComponentStock, \
    Places


class ComponentStockSerializer(serializers.ModelSerializer):
    class Meta:
        model = ComponentStock
        fields = '__all__'

    def to_representation(self, instance):
        available_stock = Component.objects.filter(stock_component_id=instance.id, status="AV")
        available_stock = available_stock.count()
        response_dict = dict(
            id=instance.id,
            name=instance.name,
            image=instance.image.url,
            level=instance.level,
            description=instance.description,
            type_component=instance.type_component.name,
            available=available_stock,
            stock=Component.objects.filter(stock_component_id=instance.id).count(),
        )
        return response_dict


class HeadquartersPlacesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Places
        fields = '__all__'


class WarehousePlacesSerializer(serializers.ModelSerializer):
    place_object = HeadquartersPlacesSerializer(read_only=True, source='place')

    class Meta:
        model = Places
        fields = (
            'id',
            'name',
            'type_place',
            'description',
            'place_object',
        )


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
    place_object = WarehousePlacesSerializer(read_only=True, source='place')
    component_stock_object = ComponentStockSerializer(read_only=True, source='stock_component')

    class Meta:
        model = Component
        fields = (
            'id',
            'serial',
            'uptc_serial',
            'state',
            'status',
            'observation',
            'place_object',
            'computer_equipment',
            'component_stock_object'
        )


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
            loan_id=instance.id,
            state=instance.state,
            date_end=instance.date_end,
            component_id=instance.component.id,
            name=instance.component.stock_component.name,
            serial=instance.component.serial,
            uptc_serial=instance.component.uptc_serial,
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


class LoanBaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Loan
        fields = '__all__'


class LoanSerializer(serializers.ModelSerializer):
    components = serializers.ListField(required=True)

    # state_loan_component = serializers.IntegerField(required=True)

    class Meta:
        model = Loan
        fields = (
            # 'date_start',
            # 'state_loan',
            'administrator',
            'components',
            'academic',
            # 'state_loan_component',
        )

    def create(self, validated_data):
        components_data = validated_data.pop('components')
        academic = validated_data.get('academic')
        administrator = validated_data.get('administrator')
        if components_data:
            loan = Loan.objects.create(
                date_start=timezone.now(),
                state_loan=LoanComponent.STATUS_PENDING,
                academic=academic,
                administrator=administrator,
            )
            for component in components_data:
                LoanComponent.objects.create(
                    date_end=get_time_by_level(ComponentStock.objects.get(component=component).level),
                    state=0,
                    component_id=component,
                    loan=loan
                )
                Component.objects.filter(id=component).update(status=Component.ON_LOAN)
        else:
            loan = None
        return loan

    def update(self, instance, validated_data):
        new_components = validated_data.pop('components')
        instance.academic = validated_data.get('academic')
        objects = LoanComponent.objects.filter(loan_id=instance.id)
        old_components = {loan.component_id for loan in objects}
        new_components = {loan_id for loan_id in new_components}
        remove = old_components - new_components
        add = new_components - old_components
        for remove_id in remove:
            LoanComponent.objects.filter(component_id=remove_id).delete()
        for add_id in add:
            LoanComponent.objects.create(
                state=0,
                component_id=add_id,
                loan=instance
            )
        return instance

    def to_representation(self, instance):
        response_dict = dict(
            id=instance.id,
            date_start=instance.date_start,
            date_end=instance.date_end,
            state_loan=instance.state_loan,
            administrator=instance.administrator.id,
            academic=dict(
                code=instance.academic.code,
                type=instance.academic.type,
                first_name=instance.academic.first_name,
                last_name=instance.academic.last_name,
                user=instance.academic.user_id,
                academic_program=instance.academic.academic_program.name
            )
        )
        return response_dict


class LoanComponentSerializer(serializers.ModelSerializer):
    component_object = ComponentSerializer(read_only=True, source='component')
    loan_object = LoanSerializer(read_only=True, source='loan')

    class Meta:
        model = LoanComponent
        fields = (
            'state',
            'loan_object',
            'component_object',
        )


"""
class LoanComponentSerializer(serializers.ModelSerializer):
    component_object = ComponentSerializer(read_only=True, source='component')
    loan_object = LoanSerializer(read_only=True, source='loan')

    class Meta:
        model = LoanComponent
        fields = ('id', 'date_end', 'state', 'loan_object', 'component_object',)
"""
