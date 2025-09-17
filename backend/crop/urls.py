# from django.urls import path
# from . import views

# urlpatterns = [
#     path('crops/', views.crop_list, name='crop-list'),
#     path('recommended-crops/', views.recommended_crops, name='recommended-crops'),
#     path('create-growth-stage/', views.CreateGrowthStageAPIView, name='create_growth_stage'),
#     path('crop-name/', views.CropListAPIView, name='crop_name'),
# ]

from django.urls import path
from . import views

urlpatterns = [
    path('crops/', views.crop_list, name='crop_list'),
    path('recommended-crops/', views.recommended_crops, name='recommended-crops'),
    path('crop-names/', views.CropListAPIView.as_view(), name='crop_name'),
    path('create-growth-stage/', views.CreateGrowthStageAPIView.as_view(), name='create-growth-stage'),
    path('user-growth-stages/<str:username>/', views.get_user_growth_stages),
    path('growth-stages/<str:username>/', views.GrowthStageListAPIView.as_view()),

    # ✅ ADD this delete endpoint
    path('delete-growth-stage/<int:id>/', views.delete_growth_stage, name='delete-growth-stage'),
    path('api/crops/', views.CropListCreateView.as_view(), name='crop-list-create'),
    path('api/crops/<int:pk>/', views.CropRetrieveUpdateDestroyView.as_view(), name='crop-detail'),
]
