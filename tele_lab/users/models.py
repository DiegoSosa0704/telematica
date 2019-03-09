from django.contrib.auth.models import (
    BaseUserManager, AbstractBaseUser, PermissionsMixin
)
from django.db import models


class UserManager(BaseUserManager):
    """
    Clase que extiende BaseUserManager para modificar funciones de creación
    de usuarios predeterminado de django.
    """

    def create_user(self, email, password=None):
        """
        Crea y guarda un usuario.
        """
        if not email:
            raise ValueError('Users must have an email address')

        user = self.model(
            email=email,
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password):
        """
        Crea y guarda un superusuario.
        """
        user = self.create_user(
            email,
            password=password,
        )
        user.is_admin = True
        user.is_active = True
        user.save(using=self._db)
        return user


class User(AbstractBaseUser, PermissionsMixin):
    """
    Clase que hereda de AbstractBaseUser para modificar atributos del usuario
    predeterminado de django.

    username = models.CharField(
        verbose_name='Nombre usuario',
        max_length=255,
        unique=True,
    )
    """
    email = models.EmailField(
        verbose_name='Correo electrónico',
        max_length=255,
        unique=True
    )
    # first_name = models.CharField(verbose_name='first name', max_length=30, blank=True)
    # last_name = models.CharField(verbose_name='last name', max_length=30, blank=True)
    # date_joined = models.DateTimeField(verbose_name='date joined', auto_now_add=True)
    password = models.CharField(verbose_name='password', max_length=128)

    is_active = models.BooleanField(default=False)
    is_admin = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    """
    def get_full_name(self):
        return self.first_name

    def get_short_name(self):
        return self.first_name
    """

    def __str__(self):
        return self.email

    def has_perm(self, perm, obj=None):
        "Does the user have a specific permission?"
        return True

    def has_module_perms(self, app_label):
        "Does the user have permissions to view the app `app_label`?"
        return True

    @property
    def is_staff(self):
        "Is the user a member of staff?"
        return self.is_admin


class PasswordRestore(models.Model):
    password_1 = models.CharField(max_length=65)
    password_2 = models.CharField(max_length=65)
    token = models.CharField(max_length=65)
