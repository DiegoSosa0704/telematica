from django.db import models
from users.models import User
from django.db.models.signals import post_save

class Places(models.Model):
    CITY = 'CI'
    HEADQUARTERS = 'SE'
    WAREHOUSE = 'BO'
    TYPE_PLACE = (
        (CITY, 'Ciudad'),
        (HEADQUARTERS, 'Sede'),
        (WAREHOUSE, 'Bodega'),
    )
    created = models.DateTimeField(auto_now_add=True, verbose_name="Fecha de creación")
    updated = models.DateTimeField(auto_now=True, verbose_name="Fecha de actualización")
    name = models.CharField(verbose_name='Nombre', max_length=25, blank=False, null=False)
    type_place = models.CharField(verbose_name='Tipo lugar', choices=TYPE_PLACE, max_length=2, blank=False,
                                  null=False)
    description = models.TextField(verbose_name='Descripción', blank=True, null=True)
    place = models.ForeignKey('self', on_delete=models.CASCADE, null=True, blank=True, related_name='places')

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = 'Lugares'


class AcademicProgram(models.Model):
    created = models.DateTimeField(auto_now_add=True, verbose_name="Fecha de creación")
    updated = models.DateTimeField(auto_now=True, verbose_name="Fecha de actualización")
    name = models.CharField(verbose_name="Nombre", max_length=255, blank=False, null=False)
    code = models.IntegerField(verbose_name="Código", blank=False, null=False)
    place = models.ForeignKey(Places, models.CASCADE, blank=False, null=False)

    def __str__(self):
        return str(self.code) + " -> " + self.name

    class Meta:
        verbose_name_plural = 'Programas Académicos'


class Academic(models.Model):
    STUDENT = 'ES'
    TEACHER = 'TE'
    TYPE_USER_CHOICES = (
        (STUDENT, 'Estudiante'),
        (TEACHER, 'Docente'),
    )
    created = models.DateTimeField(auto_now_add=True, verbose_name="Fecha de creación")
    updated = models.DateTimeField(auto_now=True, verbose_name="Fecha de actualización")
    code = models.CharField(verbose_name='Código', max_length=25, unique=True, blank=False, null=False,
                            primary_key=True)
    type = models.CharField(verbose_name='Tipo de usuario', choices=TYPE_USER_CHOICES, max_length=2,
                            blank=False, null=False)
    first_name = models.CharField(verbose_name='Nombres', max_length=25, blank=False, null=False)
    last_name = models.CharField(verbose_name='Apellidos', max_length=25, blank=False, null=False)
    user = models.OneToOneField(User, on_delete=models.CASCADE, blank=False, null=False, verbose_name='Usuario')
    academic_program = models.ForeignKey(AcademicProgram, models.CASCADE, blank=False, null=False,
                                         verbose_name='Programa Académico')

    def __str__(self):
        return self.last_name + " " + self.first_name


class Administrator(models.Model):
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE, blank=False, null=False,
        verbose_name='Usuario'
    )
    created = models.DateTimeField(auto_now_add=True, verbose_name="Fecha de creación")
    updated = models.DateTimeField(auto_now=True, verbose_name="Fecha de actualización")
    cc = models.CharField(verbose_name='Cédula de ciudadania', unique=True, max_length=25, blank=False, null=False)
    first_name = models.CharField(verbose_name='Nombres', max_length=25, blank=False, null=False)
    last_name = models.CharField(verbose_name='Apellidos', max_length=25, blank=False, null=False)
    phone = models.CharField(verbose_name='Teléfono', max_length=25, blank=True, null=True)
    address = models.CharField(verbose_name='Dirección', max_length=50, blank=True, null=True)

    def __str__(self):
        return self.last_name + " " + self.first_name


class ComputerEquipment(models.Model):
    created = models.DateTimeField(auto_now_add=True, verbose_name="Fecha de creación")
    updated = models.DateTimeField(auto_now=True, verbose_name="Fecha de actualización")
    brand = models.CharField(verbose_name='Marca', max_length=25, blank=False, null=False)
    model_computer = models.CharField(verbose_name='Modelo', max_length=25, blank=False, null=False)
    room_id = models.IntegerField(verbose_name='ID', blank=False, null=False)
    ram_memory = models.IntegerField(verbose_name='Memoria RAM (GB)', blank=True, null=True)
    hdd = models.IntegerField(verbose_name='Memoria HDD (GB)', blank=True, null=True)
    ssd = models.IntegerField(verbose_name='Memoria SSD (GB)', blank=True, null=True)
    charger = models.BooleanField(verbose_name='Cargador', blank=True)
    battery = models.BooleanField(verbose_name='Batería', blank=True)
    optical_unit = models.BooleanField(verbose_name='Unidad Óptica', blank=True)
    briefcase = models.BooleanField(verbose_name='Maletín', blank=True)

    def __str__(self):
        return self.brand + " " + self.model_computer

    class Meta:
        verbose_name_plural = 'Computadores'


class TypeComponent(models.Model):
    created = models.DateTimeField(auto_now_add=True, verbose_name="Fecha de creación")
    updated = models.DateTimeField(auto_now=True, verbose_name="Fecha de actualización")
    name = models.CharField(verbose_name='Nombre', max_length=25, blank=False, null=False)
    description = models.TextField(verbose_name='Nombre', blank=True, null=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = 'Tipos de componentes'


class ComponentStock(models.Model):
    # level choices
    LEVEL_1 = 'L1'
    LEVEL_2 = 'L2'
    LEVEL_3 = 'L3'
    LEVEL_4 = 'L4'
    LEVEL_CHOICES = (
        (LEVEL_1, 'Nivel 1'),
        (LEVEL_2, 'Nivel 2'),
        (LEVEL_3, 'Nivel 3'),
        (LEVEL_4, 'Nivel 4'),
    )
    created = models.DateTimeField(auto_now_add=True, verbose_name="Fecha de creación")
    updated = models.DateTimeField(auto_now=True, verbose_name="Fecha de actualización")
    name = models.CharField(verbose_name='Nombre', max_length=50, blank=False, null=False)
    level = models.CharField(verbose_name='Nivel', max_length=2, choices=LEVEL_CHOICES, blank=False, null=False)
    image = models.ImageField(upload_to='static/images')
    description = models.TextField(verbose_name='Descripción', blank=True, null=True)
    type_component = models.ForeignKey(TypeComponent, on_delete=models.CASCADE, blank=False, null=False,
                                       verbose_name='Tipo de Componente')

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = 'Stock de componentes'


class Component(models.Model):
    # state choices
    IN_SERVICE = 'IN'
    OUT_SERVICE = 'OU'
    FRAGILE = 'FR'
    STATE_CHOICES = (
        (IN_SERVICE, 'En servicio'),
        (OUT_SERVICE, 'Fuera de servicio'),
        (FRAGILE, 'Fragil'),
    )

    # status choices
    AVAILABLE = 'AV'
    ON_LOAN = 'OL'
    IN_MAINTENANCE = 'IM'
    NOT_AVAILABLE = 'NA'
    STATUS_CHOICES = (
        (AVAILABLE, 'Disponible'),
        (ON_LOAN, 'En Prestamo'),
        (IN_MAINTENANCE, 'En Mantenimiento'),
        (NOT_AVAILABLE, 'No Disponible'),
    )
    created = models.DateTimeField(auto_now_add=True, verbose_name="Fecha de creación")
    updated = models.DateTimeField(auto_now=True, verbose_name="Fecha de actualización")
    stock_component = models.ForeignKey(ComponentStock, on_delete=models.CASCADE, blank=False, null=False,
                                        verbose_name='Componente')
    serial = models.CharField(verbose_name='Serial', max_length=50, blank=True, null=True)
    uptc_serial = models.CharField(verbose_name='UPTC-Serial', max_length=25, blank=True, null=True)
    state = models.CharField(verbose_name='Estado', max_length=2, choices=STATE_CHOICES, blank=False, null=False)
    status = models.CharField(verbose_name='Disponibilidad', max_length=2, choices=STATUS_CHOICES, blank=False,
                              null=False)
    observation = models.TextField(verbose_name='Observaciones', blank=True, null=True)
    place = models.ForeignKey(Places, on_delete=models.CASCADE, blank=False, null=False,
                              verbose_name='Lugar')
    computer_equipment = models.OneToOneField(ComputerEquipment, on_delete=models.CASCADE, unique=True, blank=True,
                                              null=True, verbose_name='Equipo de cómputo')

    def __str__(self):
        return self.serial

    class Meta:
        verbose_name_plural = 'Componentes'


class Loan(models.Model):
    STATUS_PENDING = 0
    STATUS_FINALIZED = 1
    STATUS_CHOICES = (
        (STATUS_PENDING, 'Pendiente'),
        (STATUS_FINALIZED, 'Finalizado'),
    )
    created = models.DateTimeField(auto_now_add=True, verbose_name="Fecha de creación")
    updated = models.DateTimeField(auto_now=True, verbose_name="Fecha de actualización")
    date_start = models.DateTimeField(verbose_name='Fecha de inicio', blank=False, null=False)
    date_end = models.DateTimeField(verbose_name='Fecha final', blank=True, null=True)
    state_loan = models.SmallIntegerField(choices=STATUS_CHOICES, blank=False, null=False)
    administrator = models.ForeignKey(Administrator, models.CASCADE, blank=False, null=False,
                                      verbose_name='Administrador')
    academic = models.ForeignKey(Academic, models.CASCADE, blank=False, null=False, verbose_name='Usuario')

    class Meta:
        verbose_name_plural = 'Prestamos'


class LoanComponent(models.Model):
    STATUS_PENDING = 0
    STATUS_FINALIZED = 1
    STATUS_CHOICES = (
        (STATUS_PENDING, 'Pendiente'),
        (STATUS_FINALIZED, 'Entregado'),
    )
    created = models.DateTimeField(auto_now_add=True, verbose_name="Fecha de creación")
    updated = models.DateTimeField(auto_now=True, verbose_name="Fecha de actualización")
    state = models.SmallIntegerField(choices=STATUS_CHOICES, blank=False, null=False)
    date_end = models.DateField(verbose_name='Fecha de entrega', blank=False, null=False)
    loan = models.ForeignKey(Loan, on_delete=models.CASCADE, verbose_name='Prestamo', blank=False, null=False, )
    component = models.ForeignKey(Component, on_delete=models.CASCADE, verbose_name='Componente', blank=False,
                                  null=False, related_name='test')

    class Meta:
        unique_together = (("loan", "component"),)
        verbose_name_plural = 'Prestamos Componentes'


def create_loan_component(sender, **kwargs):
    if not kwargs['created']:
        loan_component = kwargs['instance']
        print(loan_component)
        Component.objects.filter(id=loan_component.component.id).update(status=Component.AVAILABLE)


post_save.connect(create_loan_component, sender=LoanComponent)


class Sanction(models.Model):
    # type
    EXCEEDED_TIME = 0
    DAMAGE = 1
    LOSS = 2
    TYPE_CHOICES = (
        (EXCEEDED_TIME, 'Exedió tiempo de préstamos'),
        (DAMAGE, 'Daño'),
        (LOSS, 'Pérdida'),
    )

    # state
    STATUS_SANCTIONED = 0
    STATUS_FINALIZED = 1
    STATUS_CHOICES = (
        (STATUS_SANCTIONED, 'sanctioned'),
        (STATUS_FINALIZED, 'finalized'),
    )
    created = models.DateTimeField(auto_now_add=True, verbose_name="Fecha de creación")
    updated = models.DateTimeField(auto_now=True, verbose_name="Fecha de actualización")
    type = models.SmallIntegerField(choices=TYPE_CHOICES, blank=False, null=False)
    state = models.SmallIntegerField(choices=STATUS_CHOICES, blank=False, null=False,
                                     verbose_name='Tipo de sanción')
    description = models.TextField(verbose_name='Descripción', blank=False, null=False)
    loan_component = models.ForeignKey(LoanComponent, models.CASCADE, blank=False, null=False,
                                       verbose_name='Prestamo')

    class Meta:
        verbose_name_plural = 'Sanciones'


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
    created = models.DateTimeField(auto_now_add=True, verbose_name="Fecha de creación")
    updated = models.DateTimeField(auto_now=True, verbose_name="Fecha de actualización")
    date_start = models.DateField(verbose_name='Fecha de inicio', blank=False, null=False)
    date_end = models.DateField(verbose_name='Fecha de finalización', blank=True, null=False)
    maintenance_type = models.SmallIntegerField(verbose_name='Tipo de mantenimiento', choices=MAINTENANCE_TYPE,
                                                blank=False, null=False)
    state = models.SmallIntegerField(verbose_name='Estado', choices=STATUS_CHOICES, blank=False, null=False)
    maintenance = models.TextField(verbose_name='Mantenimiento', blank=False, null=False)
    recommendations = models.TextField(verbose_name='Recomendaciones', blank=True, null=True)
    administrator = models.ForeignKey(Administrator, models.CASCADE, blank=False,
                                      null=False, verbose_name='Administrador')

    class Meta:
        verbose_name_plural = 'Mantenimientos'


class MaintenanceComponent(models.Model):
    created = models.DateTimeField(auto_now_add=True, verbose_name="Fecha de creación")
    updated = models.DateTimeField(auto_now=True, verbose_name="Fecha de actualización")
    maintenance = models.ForeignKey(Maintenance, on_delete=models.CASCADE, blank=False, null=False,
                                    verbose_name='Mantenimiento')
    component = models.ForeignKey(Component, on_delete=models.CASCADE, blank=False, null=False,
                                  verbose_name='Componente')

    class Meta:
        verbose_name_plural = 'Mantenimientos Componentes'
