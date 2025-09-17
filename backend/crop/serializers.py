from rest_framework import serializers
from .models import Crop,GrowthStage

class CropSerializer(serializers.ModelSerializer):
    class Meta:
        model = Crop
        fields = '__all__'

class GrowthStageSerializer(serializers.ModelSerializer):
    duration = serializers.SerializerMethodField()

    class Meta:
        model = GrowthStage
        # include 'duration' explicitly or use '__all__' plus duration
        fields = '__all__'  # or list all fields + ['duration']

    def get_duration(self, obj):
        try:
            crop = Crop.objects.get(name=obj.crop_name)
            return crop.duration_days
        except Crop.DoesNotExist:
            return None