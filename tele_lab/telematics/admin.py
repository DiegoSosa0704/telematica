from django.contrib import admin
from . import models

admin.site.register(models.Component)
admin.site.register(models.Academic)
admin.site.register(models.Administrator)
admin.site.register(models.Places)
admin.site.register(models.AcademicProgram)
admin.site.register(models.LoanComponent)
admin.site.register(models.Loan)
admin.site.register(models.ComputerEquipment)
admin.site.register(models.TypeComponent)
admin.site.register(models.Sanction)
admin.site.register(models.Maintenance)
admin.site.register(models.MaintenanceComponent)
admin.site.register(models.ComponentStock)