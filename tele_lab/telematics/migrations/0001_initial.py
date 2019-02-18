# Generated by Django 2.1.5 on 2019-02-17 14:16

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('email', models.EmailField(max_length=255, unique=True, verbose_name='email address')),
                ('is_active', models.BooleanField(default=True)),
                ('is_admin', models.BooleanField(default=False)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Academic',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('type', models.CharField(default='NA', max_length=2, verbose_name='Tipo de estudiante')),
                ('code', models.CharField(max_length=25, verbose_name='Código')),
                ('first_name', models.CharField(max_length=25, verbose_name='Nombres')),
                ('last_name', models.CharField(max_length=25, verbose_name='Apellidos')),
                ('academic_program', models.CharField(default='NA', max_length=2, verbose_name='Programa académico')),
            ],
        ),
        migrations.CreateModel(
            name='Administrator',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('cc', models.CharField(max_length=25, verbose_name='Cédula de ciudadania')),
                ('first_name', models.CharField(max_length=25, verbose_name='Nombres')),
                ('last_name', models.CharField(max_length=25, verbose_name='Apellidos')),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='ComputerEquipment',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('brand', models.CharField(max_length=25, verbose_name='')),
                ('model', models.CharField(max_length=25, verbose_name='')),
                ('room_id', models.IntegerField()),
                ('ram_memory', models.CharField(max_length=25)),
                ('hdd', models.CharField(max_length=25)),
                ('charger', models.BooleanField(default=True)),
                ('battery', models.BooleanField(default=True)),
                ('optical_unit', models.BooleanField(default=True)),
                ('briefcase', models.BooleanField(default=True)),
                ('os', models.CharField(max_length=25)),
                ('os_type', models.CharField(default='', max_length=2)),
            ],
        ),
        migrations.CreateModel(
            name='Inventory',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=25, verbose_name='')),
                ('serial', models.CharField(max_length=25, verbose_name='')),
                ('uptc_serial', models.CharField(max_length=25, verbose_name='')),
                ('state', models.CharField(default='', max_length=2, verbose_name='')),
                ('type', models.CharField(default='', max_length=2, verbose_name='')),
                ('location', models.CharField(default='', max_length=2, verbose_name='')),
                ('description', models.CharField(max_length=50, verbose_name='')),
                ('observations', models.CharField(max_length=50, verbose_name='')),
                ('level', models.CharField(default='', max_length=2, verbose_name='')),
            ],
        ),
        migrations.CreateModel(
            name='Loan',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('start_date', models.DateField(verbose_name='Fecha de inicio')),
                ('delivery_date', models.DateField(verbose_name='Fecha de inicio')),
                ('state', models.CharField(default='', max_length=2, verbose_name='')),
                ('id_academic', models.ForeignKey(db_column='id_academic', on_delete=django.db.models.deletion.DO_NOTHING, to='telematics.Academic')),
                ('id_administrator', models.ForeignKey(db_column='id_administrator', on_delete=django.db.models.deletion.DO_NOTHING, to='telematics.Administrator')),
                ('id_inventory', models.ForeignKey(db_column='id_inventory', on_delete=django.db.models.deletion.DO_NOTHING, to='telematics.Inventory')),
            ],
        ),
        migrations.CreateModel(
            name='Maintenance',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField(verbose_name='')),
                ('maintenance_type', models.CharField(default='', max_length=2, verbose_name='')),
                ('maintenance', models.CharField(max_length=50, verbose_name='')),
                ('recommendations', models.CharField(max_length=50, verbose_name='')),
                ('id_administrator', models.ForeignKey(db_column='id_administrator', on_delete=django.db.models.deletion.DO_NOTHING, to='telematics.Administrator')),
                ('id_inventory', models.ForeignKey(db_column='id_inventory', on_delete=django.db.models.deletion.DO_NOTHING, to='telematics.Inventory')),
            ],
        ),
        migrations.CreateModel(
            name='Sanction',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('state', models.DateField(default='', verbose_name='Estado')),
                ('observation', models.CharField(max_length=50, verbose_name='')),
                ('id_loan', models.ForeignKey(db_column='id_loan', on_delete=django.db.models.deletion.DO_NOTHING, to='telematics.Loan')),
            ],
        ),
        migrations.AddField(
            model_name='computerequipment',
            name='id_inventory',
            field=models.ForeignKey(db_column='id_inventory', on_delete=django.db.models.deletion.DO_NOTHING, to='telematics.Inventory'),
        ),
    ]
