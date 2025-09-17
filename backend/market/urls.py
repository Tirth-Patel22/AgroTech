from django.urls import path
from . import views

urlpatterns = [
    path('api/market-crop-names/', views.get_crop_names, name='market-crop-names'),
    path('api/predict-price/', views.predict_price, name='predict-price'),
]
