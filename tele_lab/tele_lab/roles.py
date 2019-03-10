from rolepermissions.roles import AbstractUserRole


class Admin(AbstractUserRole):
    available_permissions = {
        'create_user_admin': True,
    }


class Academic(AbstractUserRole):
    available_permissions = {
        'is_admin': True,
    }
