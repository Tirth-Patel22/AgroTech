from django.contrib import admin
from .models import Pesticide,CropDisease,Fertilizer

@admin.register(Pesticide)
class PesticideAdmin(admin.ModelAdmin):
    list_display = ('name', 'type', 'crop', 'application_rate', 'toxicity', 'manufacturer', 'usage_frequency')
    search_fields = ('name', 'crop', 'type')
    list_filter = ('type', 'toxicity', 'crop', 'manufacturer')

@admin.register(CropDisease)
class CropDiseaseAdmin(admin.ModelAdmin):
    list_display = ('crop', 'disease', 'cause')
    search_fields = ('crop', 'disease', 'symptoms')
    list_filter = ('crop',)

@admin.register(Fertilizer)
class FertilizerAdmin(admin.ModelAdmin):
    list_display = ('id', 'crop', 'fertilizer_name', 'fertilizer_type', 'application_time')
    search_fields = ('crop', 'fertilizer_name', 'fertilizer_type')
    list_filter = ('fertilizer_type', 'application_time')