# # pesticide/serializers.py
# from rest_framework import serializers
# from .models import Pesticide,CropDisease

# class PesticideSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Pesticide
#         fields = '__all__'

# pesticide/serializers.py
from rest_framework import serializers
from .models import Pesticide, CropDisease ,Fertilizer

class PesticideSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pesticide
        fields = '__all__'

class CropDiseaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = CropDisease
        fields = '__all__'

class FertilizerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Fertilizer
        fields = '__all__'