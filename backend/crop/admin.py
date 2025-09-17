from django.contrib import admin
from .models import Crop,GrowthStage
# Register your models here.
@admin.register(Crop)
class CropAdmin(admin.ModelAdmin):
    list_display = ('name', 'crop_type', 'sowing_season', 'harvest_season', 'duration_days', 'ideal_rainfall', 'soil_type')
    search_fields = ('name', 'crop_type')
    list_filter = ('crop_type', 'soil_type', 'sowing_season')

@admin.register(GrowthStage)
class GrowthStageAdmin(admin.ModelAdmin):
    list_display = ('username', 'crop_name')
    search_fields = ('username', 'crop_name')
    list_filter = ('crop_name', 'username')