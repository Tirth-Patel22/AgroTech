from django.db import models

class Crop(models.Model):
    name = models.CharField(max_length=100)
    crop_type = models.CharField(max_length=50)
    sowing_season = models.CharField(max_length=50)
    harvest_season = models.CharField(max_length=50)
    duration_days = models.IntegerField()
    ideal_temperature_min = models.FloatField()
    ideal_temperature_max = models.FloatField()
    ideal_rainfall = models.FloatField()
    soil_type = models.CharField(max_length=100)
    germination = models.CharField(max_length=50)
    vegetative_growth = models.CharField(max_length=50)
    flowering = models.CharField(max_length=50)
    maturity = models.CharField(max_length=50)
    germination_water = models.CharField(max_length=50, null=True, blank=True)
    vegetative_water = models.CharField(max_length=50, null=True, blank=True)
    flowering_water = models.CharField(max_length=50, null=True, blank=True)
    maturity_water = models.CharField(max_length=50, null=True, blank=True)
    image = models.CharField(max_length=255)
    description = models.TextField()

    def __str__(self):
        return self.name


class GrowthStage(models.Model):
    username = models.CharField(max_length=150)
    crop_name = models.CharField(max_length=100)

    germination_start = models.DateField(null=True, blank=True)
    germination_end = models.DateField(null=True, blank=True)
    germination_water = models.CharField(max_length=50, null=True, blank=True)

    vegetative_start = models.DateField(null=True, blank=True)
    vegetative_end = models.DateField(null=True, blank=True)
    vegetative_water = models.CharField(max_length=50, null=True, blank=True)

    flowering_start = models.DateField(null=True, blank=True)
    flowering_end = models.DateField(null=True, blank=True)
    flowering_water = models.CharField(max_length=50, null=True, blank=True)

    maturity_start = models.DateField(null=True, blank=True)
    maturity_end = models.DateField(null=True, blank=True)
    maturity_water = models.CharField(max_length=50, null=True, blank=True)

    def __str__(self):
        return f"{self.crop_name} ({self.username})"
