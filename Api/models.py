from django.db import models
from django.contrib.auth.base_user import BaseUserManager
# Create your models here.

# class AppUserManager(BaseUserManager):
#     def create_user(self,email,password=None):
#         if not email:
#             raise ValueError("Email is required")
#         if not password:
#             raise ValueError("Password is required")
#         else:
#             user = self.model(email=self.normalize_email(email))
#             user.set_password(password)
#             user.save()
#     def create_superuser(self,email,password=None):
#         if not email:
#             raise ValueError("Email is required")
#         if not password:
#             raise ValueError("Password is required")
#         else:
#             user = self.create_user(email=self.normalize_email(email),password=password)
#             user.is_superuser = True
#             user.save()
#             return user
        


class Contacts(models.Model):
    first_name=models.CharField(max_length=100)
    last_name=models.CharField(max_length=100)
    phone_number=models.IntegerField()
    Date_of_birth=models.DateField()
    email=models.EmailField()
    door_no=models.CharField(max_length=100)
    street=models.CharField(max_length=100)
    city=models.CharField(max_length=100)
    state=models.CharField(max_length=100)
    pincode=models.IntegerField()
    image = models.ImageField(upload_to='images/', null=True, blank=True)

    def __str__(self):
        return self.first_name
    