# pesticide/urls.py
from django.urls import path
from .views import pesticide_list,crop_disease_list,fertilizer_list,PesticideListCreateView,PesticideRetrieveUpdateDestroyView,CropDiseaseListCreateView,CropDiseaseRetrieveUpdateDestroyView,FertilizerListCreateView,FertilizerRetrieveUpdateDestroyView

urlpatterns = [
    path('api/pesticides/', pesticide_list),
    path('api/crop-diseases/', crop_disease_list),
    path('api/fertilizers/', fertilizer_list, name='fertilizer-list'),


    # 
    path('api/api/pesticides/',PesticideListCreateView.as_view(), name='pesticide-list-create'),

    path('api/api/pesticides/<int:pk>/',PesticideRetrieveUpdateDestroyView.as_view(), name='pesticide-detail'),

    # CropDisease endpoints
    path('api/api/diseases/',CropDiseaseListCreateView.as_view(), name='disease-list-create'),
    path('api/api/diseases/<int:pk>/',CropDiseaseRetrieveUpdateDestroyView.as_view(), name='disease-detail'),

    # Fertilizer endpoints
    path('api/api/fertilizers/',FertilizerListCreateView.as_view(), name='fertilizer-list-create'),
    path('api/api/fertilizers/<int:pk>/',FertilizerRetrieveUpdateDestroyView.as_view(), name='fertilizer-detail'),
]
