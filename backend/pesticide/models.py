# from django.db import models

# class Pesticide(models.Model):
#     name = models.CharField(max_length=100)
#     type = models.CharField(max_length=50)
#     crop = models.CharField(max_length=50)
#     application_rate = models.IntegerField()  # in ml/ha
#     toxicity = models.CharField(max_length=20)
#     manufacturer = models.CharField(max_length=100)
#     usage_frequency = models.CharField(max_length=50)

#     def __str__(self):
#         return self.name
from django.db import models

class Pesticide(models.Model):
    name = models.CharField(max_length=100)
    type = models.CharField(max_length=50)
    crop = models.CharField(max_length=50)
    application_rate = models.IntegerField()  # in ml/ha
    toxicity = models.CharField(max_length=20)
    manufacturer = models.CharField(max_length=100)
    usage_frequency = models.CharField(max_length=50)

    def __str__(self):
        return self.name

class CropDisease(models.Model):
    crop = models.CharField(max_length=100)
    disease = models.CharField(max_length=100)
    symptoms = models.TextField()
    cause = models.CharField(max_length=255)
    control_measures = models.TextField()
    image_path = models.CharField(max_length=255)

    def __str__(self):
        return f"{self.crop} - {self.disease}"

class Fertilizer(models.Model):
    crop = models.CharField(max_length=100)
    fertilizer_name = models.CharField(max_length=100)
    fertilizer_type = models.CharField(max_length=50)
    composition = models.CharField(max_length=100)
    application_method = models.CharField(max_length=100)
    application_time = models.CharField(max_length=100)