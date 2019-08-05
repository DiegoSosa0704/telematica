from datetime import date, timedelta
from django.utils import timezone
from telematics.models import ComponentStock


def get_time_by_level(level):
    if level == ComponentStock.LEVEL_1:
        return timezone.now() + timedelta(days=5)
    elif level == ComponentStock.LEVEL_2:
        return timezone.now() + timedelta(days=10)
    elif level == ComponentStock.LEVEL_3:
        return timezone.now() + timedelta(days=15)
    elif level == ComponentStock.LEVEL_4:
        return timezone.now() + timedelta(days=20)
    else:
        return timezone.now()
