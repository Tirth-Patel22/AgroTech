# pesticide/views.py
from rest_framework.decorators import api_view
from rest_framework import generics
from rest_framework.response import Response
from .models import Pesticide,CropDisease,Fertilizer
from django.db.models import Q
from .serializers import PesticideSerializer,CropDiseaseSerializer,FertilizerSerializer

@api_view(['GET'])
def pesticide_list(request):
    search = request.GET.get('search', '')
    pesticides = Pesticide.objects.filter(
        Q(name__icontains=search) | Q(crop__icontains=search)
    )[:12]
    serializer = PesticideSerializer(pesticides, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def crop_disease_list(request):
    search = request.GET.get('search', '')
    diseases = CropDisease.objects.filter(
        Q(crop__icontains=search) | Q(disease__icontains=search)
    )[:12]
    serializer = CropDiseaseSerializer(diseases, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def fertilizer_list(request):
    search = request.GET.get('search', '')
    fertilizers = Fertilizer.objects.filter(
        Q(crop__icontains=search) | Q(fertilizer_name__icontains=search)
    )[:12]
    serializer = FertilizerSerializer(fertilizers, many=True)
    return Response(serializer.data)

# admin CURD
# Pesticide Views
class PesticideListCreateView(generics.ListCreateAPIView):
    queryset = Pesticide.objects.all()
    serializer_class = PesticideSerializer

class PesticideRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Pesticide.objects.all()
    serializer_class = PesticideSerializer

# CropDisease Views
class CropDiseaseListCreateView(generics.ListCreateAPIView):
    queryset = CropDisease.objects.all()
    serializer_class = CropDiseaseSerializer

class CropDiseaseRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = CropDisease.objects.all()
    serializer_class = CropDiseaseSerializer

# Fertilizer Views
class FertilizerListCreateView(generics.ListCreateAPIView):
    queryset = Fertilizer.objects.all()
    serializer_class = FertilizerSerializer

class FertilizerRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Fertilizer.objects.all()
    serializer_class = FertilizerSerializer