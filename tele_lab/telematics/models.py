from django.db import models
from users.models import User


class Academic(models.Model):
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE
    )
    type = models.CharField(verbose_name='Tipo de usuario', choices=[], default='NA', max_length=2)
    code = models.CharField(verbose_name='Código', max_length=25)
    first_name = models.CharField(verbose_name='Nombres', max_length=25)
    last_name = models.CharField(verbose_name='Apellidos', max_length=25)
    academic_program = models.CharField(verbose_name='Programa académico', choices=[], default='NA', max_length=2)


class Administrator(models.Model):
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE
    )
    cc = models.CharField(verbose_name='Cédula de ciudadania', max_length=25)
    first_name = models.CharField(verbose_name='Nombres', max_length=25)
    last_name = models.CharField(verbose_name='Apellidos', max_length=25)
    phone = models.CharField(verbose_name='Teléfono', max_length=25)
    address = models.CharField(verbose_name='Dirección', max_length=25)


class Component(models.Model):
    name = models.CharField(verbose_name='Nombre', max_length=25)
    serial = models.CharField(verbose_name='Serial', max_length=25)
    uptc_serial = models.CharField(verbose_name='UPTC-Serial', max_length=25)
    state = models.CharField(verbose_name='Estado', max_length=2, choices=[], default='')
    type = models.CharField(verbose_name='Tipo', max_length=2, choices=[], default='')
    location = models.CharField(verbose_name='Locación', max_length=2, choices=[], default='')
    description = models.CharField(verbose_name='Descripción', max_length=50)
    observations = models.CharField(verbose_name='Observaciones', max_length=50)
    level = models.CharField(verbose_name='Nivel', max_length=2, choices=[], default='')


class Loan(models.Model):
    STATUS_PENDING = 0
    STATUS_FINALIZED = 1
    STATUS_CHOICES = (
        (STATUS_PENDING, 'pending'),
        (STATUS_FINALIZED, 'finalized'),
    )
    id_administrator = models.ForeignKey(Administrator, models.CASCADE, db_column='id_administrator')
    id_academic = models.ForeignKey(Academic, models.CASCADE, db_column='id_academic')
    id_component = models.ForeignKey(Component, models.CASCADE, db_column='id_inventory')
    date_start = models.DateField(verbose_name='Fecha de inicio', blank=False)
    date_end = models.DateField(verbose_name='Fecha de finalización', blank=True)
    state = models.SmallIntegerField(choices=STATUS_CHOICES, default=STATUS_PENDING, blank=False)


class Sanction(models.Model):
    STATUS_SANCTIONED = 0
    STATUS_FINALIZED = 1
    STATUS_CHOICES = (
        (STATUS_SANCTIONED, 'sanctioned'),
        (STATUS_FINALIZED, 'finalized'),
    )
    id_loan = models.ForeignKey(Loan, models.CASCADE, db_column='id_loan')
    state = models.SmallIntegerField(choices=STATUS_CHOICES, default=STATUS_SANCTIONED, blank=False)
    observation = models.CharField(verbose_name='', max_length=50)


class ComputerEquipment(models.Model):
    brand = models.CharField(verbose_name='', max_length=25)
    model = models.CharField(verbose_name='', max_length=25)
    room_id = models.IntegerField()
    ram_memory = models.CharField(max_length=25)
    hdd = models.CharField(max_length=25)
    charger = models.BooleanField(default=True)
    battery = models.BooleanField(default=True)
    optical_unit = models.BooleanField(default=True)
    briefcase = models.BooleanField(default=True)
    os = models.CharField(max_length=25)
    os_type = models.CharField(max_length=2, choices=[], default='')


class Maintenance(models.Model):
    STATUS_IN_MAINTENANCE = 0
    STATUS_FINALIZED = 1
    STATUS_CHOICES = (
        (STATUS_IN_MAINTENANCE, 'in maintenance'),
        (STATUS_FINALIZED, 'finalized'),
    )
    MAINTENANCE_PREVENTIVE = 0
    MAINTENANCE_CORRECTIVE = 1
    MAINTENANCE_TYPE = (
        (MAINTENANCE_PREVENTIVE, 'preventive'),
        (MAINTENANCE_CORRECTIVE, 'corrective')
    )
    id_administrator = models.ForeignKey(Administrator, models.CASCADE, db_column='id_administrator')
    date_start = models.DateField(verbose_name='Fecha de inicio', blank=False)
    date_end = models.DateField(verbose_name='Fecha de finalización', blank=True)
    maintenance_type = models.SmallIntegerField(choices=MAINTENANCE_TYPE, default=MAINTENANCE_CORRECTIVE, blank=False)
    state = models.SmallIntegerField(choices=STATUS_CHOICES, default=STATUS_IN_MAINTENANCE, blank=False)
    maintenance = models.CharField(verbose_name='Mantenimiento', max_length=50, blank=False)
    recommendations = models.CharField(verbose_name='', max_length=50, blank=True)
