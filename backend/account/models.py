# from django.db import models

# from django.db import models

# class Account(models.Model):
#     username = models.CharField(max_length=150)
#     email = models.EmailField(unique=True)
#     password = models.CharField(max_length=128)

#     def __str__(self):
#         return self.username

from django.db import models
from django.contrib.auth.hashers import make_password, check_password
from django.utils import timezone


class Account(models.Model):
    username = models.CharField(max_length=150)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128)

    def set_password(self, raw_password):
        self.password = make_password(raw_password)
        self.save()

    def check_password(self, raw_password):
        return check_password(raw_password, self.password)
    
    def change_password(self, old_password, new_password):
        if not self.check_password(old_password):
            return False
        self.set_password(new_password)
        return True

    def __str__(self):
        return self.username


class ContactMessage(models.Model):
    user = models.ForeignKey('Account', null=True, blank=True, on_delete=models.SET_NULL)
    name = models.CharField(max_length=100)
    email = models.EmailField()
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return f"{self.name} - {self.email}"


# admin details
class AdminDetails(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    phone_number = models.CharField(max_length=15)
    password = models.CharField(max_length=255)  # ideally hashed manually or through a method
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name