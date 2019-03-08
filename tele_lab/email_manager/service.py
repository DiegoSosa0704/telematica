from django.core.mail import EmailMessage
from tele_lab.settings import EMAIL_HOST_USER


class EmailSender(object):
    def __init__(self, *args, **kwargs):
        self.page = 'http://127.0.0.1:8000'

    def send_html_email(self, subject_param, to_param, html_content):
        subject, from_email, to = subject_param, EMAIL_HOST_USER, to_param
        msg = EmailMessage(subject, html_content, from_email, [to])
        msg.content_subtype = "html"  # Main content is now text/html
        msg.send()

    def verify_email_body(self, token):
        body = "<h3>Hola</h3>"
        body += "<p>Para verificar tu email, porfavor ingresa al siguiente link</p>"
        body += "<a href='{}/verify-email/{}'>Verificar</a>".format(self.page, token)
        return body

    def restore_password_body(self, token):
        body = "<h3>Hola</h3>"
        body += "<p>Para cambiar tu password, porfavor ingresa al siguiente link</p>"
        body += "<a href='{}/restore_password/{}'>Cambiar password</a>".format(self.page, token)
        return body
