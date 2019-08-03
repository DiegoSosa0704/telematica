from datetime import date, timedelta

from telematics.models import ComponentStock


def get_time_by_level(level):
    # TODO: Verificar las fechas reales por nivel.
    if level is 'L1':
        return date.today() + timedelta(days=5)
    elif level is ComponentStock.LEVEL_2:
        return date.today() + timedelta(days=10)
    elif level is ComponentStock.LEVEL_3:
        return date.today() + timedelta(days=15)
    elif level is ComponentStock.LEVEL_4:
        return date.today() + timedelta(days=20)
    else:
        return date.today()
