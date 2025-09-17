from django.contrib import admin
from .models import Account,ContactMessage,AdminDetails

admin.site.register(Account)

@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ('name', 'email')
    search_fields = ('name', 'email', 'message')

@admin.register(AdminDetails)
class AdminDetailsAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'phone_number', 'created_at')
    search_fields = ('name', 'email', 'phone_number')