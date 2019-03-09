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


class Inventory(models.Model):
    name = models.CharField(verbose_name='', max_length=25)
    serial = models.CharField(verbose_name='', max_length=25)
    uptc_serial = models.CharField(verbose_name='', max_length=25)
    state = models.CharField(verbose_name='', max_length=2, choices=[], default='')
    type = models.CharField(verbose_name='', max_length=2, choices=[], default='')
    location = models.CharField(verbose_name='', max_length=2, choices=[], default='')
    description = models.CharField(verbose_name='', max_length=50)
    observations = models.CharField(verbose_name='', max_length=50)
    level = models.CharField(verbose_name='', max_length=2, choices=[], default='')


class Loan(models.Model):
    id_administrator = models.ForeignKey(Administrator, models.DO_NOTHING, db_column='id_administrator')
    id_academic = models.ForeignKey(Academic, models.DO_NOTHING, db_column='id_academic')
    id_inventory = models.ForeignKey(Inventory, models.DO_NOTHING, db_column='id_inventory')
    start_date = models.DateField(verbose_name='Fecha de inicio')
    delivery_date = models.DateField(verbose_name='Fecha de inicio')
    state = models.CharField(verbose_name='', max_length=2, choices=[], default='')


class Sanction(models.Model):
    id_loan = models.ForeignKey(Loan, models.DO_NOTHING, db_column='id_loan')
    state = models.DateField(verbose_name='Estado', choices=[], default='')
    observation = models.CharField(verbose_name='', max_length=50)


class ComputerEquipment(models.Model):
    id_inventory = models.ForeignKey(Inventory, models.DO_NOTHING, db_column='id_inventory')
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
    id_inventory = models.ForeignKey(Inventory, models.DO_NOTHING, db_column='id_inventory')
    id_administrator = models.ForeignKey(Administrator, models.DO_NOTHING, db_column='id_administrator')
    date = models.DateField(verbose_name='')
    maintenance_type = models.CharField(verbose_name='', max_length=2, choices=[], default='')
    maintenance = models.CharField(verbose_name='', max_length=50)
    recommendations = models.CharField(verbose_name='', max_length=50)
