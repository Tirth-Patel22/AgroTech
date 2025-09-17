# from rest_framework.decorators import api_view
# from rest_framework.response import Response
# from django.db.models import Q
# from .models import Crop,GrowthStage
# from .serializers import CropSerializer,GrowthStageSerializer
# from rest_framework.views import APIView
# from rest_framework import status
# from datetime import date, timedelta


# @api_view(['GET'])
# def crop_list(request):
#     search = request.GET.get('search', '')
#     crops = Crop.objects.filter(
#         Q(name__icontains=search) | Q(crop_type__icontains=search)
#     )[:12]
#     serializer = CropSerializer(crops, many=True)
#     return Response(serializer.data)

# @api_view(['GET'])
# def recommended_crops(request):
#     temp = float(request.GET.get('temp', 30))
#     crops = Crop.objects.filter(ideal_temperature_min__lte=temp, ideal_temperature_max__gte=temp)
#     serializer = CropSerializer(crops, many=True)

#     # Manually pick required fields from serialized data
#     filtered_data = [
#         {
#             'name': crop['name'],
#             'crop_type': crop['crop_type'],
#             'duration_days': crop['duration_days'],
#             'ideal_rainfall': crop['ideal_rainfall'],
#             'description': crop['description'],
#             'image': crop['image'],
#         }
#         for crop in serializer.data
#     ]

#     return Response({'recommended_crops': filtered_data})


# class CreateGrowthStageAPIView(APIView):
#     def post(self, request):
#         username = request.data.get('username')
#         crop_name = request.data.get('crop_name')

#         if not username or not crop_name:
#             return Response({'error': 'Username and crop_name are required.'}, status=status.HTTP_400_BAD_REQUEST)

#         try:
#             crop = Crop.objects.get(name=crop_name)
#         except Crop.DoesNotExist:
#             return Response({'error': 'Crop not found.'}, status=status.HTTP_404_NOT_FOUND)

#         # Helper to parse durations
#         def parse_duration(duration_str):
#             if '-' in duration_str:
#                 start, end = map(int, duration_str.split('-'))
#                 return (start + end) // 2
#             else:
#                 return int(duration_str)

#         sowing_date = date.today()

#         germination_days = parse_duration(crop.germination)
#         vegetative_days = parse_duration(crop.vegetative_growth)
#         flowering_days = parse_duration(crop.flowering)
#         maturity_days = parse_duration(crop.maturity)

#         germination_start = sowing_date
#         germination_end = germination_start + timedelta(days=germination_days)
#         vegetative_start = germination_end
#         vegetative_end = vegetative_start + timedelta(days=vegetative_days)
#         flowering_start = vegetative_end
#         flowering_end = flowering_start + timedelta(days=flowering_days)
#         maturity_start = flowering_end

#         growth_stage = GrowthStage.objects.create(
#             username=username,
#             crop_name=crop.name,
#             germination_start=germination_start,
#             germination_end=germination_end,
#             germination_water='2-3 days',
#             vegetative_start=vegetative_start,
#             vegetative_end=vegetative_end,
#             vegetative_water='7-10 days',
#             flowering_start=flowering_start,
#             flowering_end=flowering_end,
#             flowering_water='6-8 days',
#             maturity_start=maturity_start,
#             maturity_end=None,
#             maturity_water='10-15 days'
#         )

#         serializer = GrowthStageSerializer(growth_stage)
#         return Response(serializer.data, status=status.HTTP_201_CREATED)
    
# class CropListAPIView(APIView):
#     def get(self, request):
#         crops = Crop.objects.all().values('name')
#         return Response(list(crops))

from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.db.models import Q
from .models import Crop, GrowthStage
from .serializers import CropSerializer, GrowthStageSerializer
from rest_framework.views import APIView
from rest_framework import status,generics
from datetime import date, timedelta
from .models import Crop, GrowthStage
from datetime import datetime, timedelta


@api_view(['GET'])
def crop_list(request):
    """Get crops list with optional search filter"""
    search = request.GET.get('search', '')
    crops = Crop.objects.filter(
        Q(name__icontains=search) | Q(crop_type__icontains=search)
    )
    serializer = CropSerializer(crops, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def recommended_crops(request):
    """Recommend crops based on current temperature"""
    temp = float(request.GET.get('temp', 30))
    crops = Crop.objects.filter(
        ideal_temperature_min__lte=temp,
        ideal_temperature_max__gte=temp
    )
    serializer = CropSerializer(crops, many=True)

    # Pick required fields only
    filtered_data = [
        {
            'name': crop['name'],
            'crop_type': crop['crop_type'],
            'duration_days': crop['duration_days'],
            'ideal_rainfall': crop['ideal_rainfall'],
            'description': crop['description'],
            'image': crop['image'],
        }
        for crop in serializer.data
    ]

    return Response({'recommended_crops': filtered_data})

# class CreateGrowthStageAPIView(APIView):
#     def post(self, request):
#         username = request.data.get('username')
#         crop_name = request.data.get('crop_name')

#         if not username or not crop_name:
#             return Response({'error': 'Username and crop_name are required.'}, status=status.HTTP_400_BAD_REQUEST)

#         try:
#             crop = Crop.objects.get(name=crop_name)
#         except Crop.DoesNotExist:
#             return Response({'error': 'Crop not found.'}, status=status.HTTP_404_NOT_FOUND)

#         # Helper to parse durations
#         def parse_duration(duration_str):
#             if '-' in duration_str:
#                 start, end = map(int, duration_str.split('-'))
#                 return (start + end) // 2
#             else:
#                 return int(duration_str)

#         sowing_date = date.today()

#         germination_days = parse_duration(crop.germination)
#         vegetative_days = parse_duration(crop.vegetative_growth)
#         flowering_days = parse_duration(crop.flowering)
#         maturity_days = parse_duration(crop.maturity)

#         germination_start = sowing_date
#         germination_end = germination_start + timedelta(days=germination_days)

#         vegetative_start = germination_end
#         vegetative_end = vegetative_start + timedelta(days=vegetative_days)

#         flowering_start = vegetative_end
#         flowering_end = flowering_start + timedelta(days=flowering_days)

#         maturity_start = flowering_end
#         maturity_end = maturity_start + timedelta(days=maturity_days)

#         # Optional: validate total duration matches crop.duration_days
#         total_duration = (maturity_end - sowing_date).days
#         expected_duration = crop.duration_days

#         if total_duration != expected_duration:
#             print(f"⚠️  Warning: Calculated total duration ({total_duration} days) "
#                   f"doesn't match expected ({expected_duration} days) for {crop_name}")

#         growth_stage = GrowthStage.objects.create(
#             username=username,
#             crop_name=crop.name,
#             germination_start=germination_start,
#             germination_end=germination_end,
#             germination_water=crop.germination_water,
#             vegetative_start=vegetative_start,
#             vegetative_end=vegetative_end,
#             vegetative_water=crop.vegetative_water,
#             flowering_start=flowering_start,
#             flowering_end=flowering_end,
#             flowering_water=crop.flowering_water,
#             maturity_start=maturity_start,
#             maturity_end=maturity_end,
#             maturity_water=crop.maturity_water
#         )

#         serializer = GrowthStageSerializer(growth_stage)
#         return Response(serializer.data, status=status.HTTP_201_CREATED)

class CreateGrowthStageAPIView(APIView):
    def post(self, request):
        username = request.data.get('username')
        crop_name = request.data.get('crop_name')
        if not username or not crop_name:
            return Response({'error': 'Username and crop_name are required.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            crop = Crop.objects.get(name=crop_name)
        except Crop.DoesNotExist:
            return Response({'error': 'Crop not found.'}, status=status.HTTP_404_NOT_FOUND)

        sowing_date = date.today()
        current_stage_start = sowing_date

        # Germination (single number)
        germ_duration = int(crop.germination)
        germination_start = current_stage_start
        germination_end = current_stage_start + timedelta(days=germ_duration)
        current_stage_start = germination_end

        # Vegetative Growth (range)
        veget_start, veget_end = map(int, crop.vegetative_growth.split('-'))
        veget_avg = (veget_start + veget_end) // 2
        vegetative_start = current_stage_start
        vegetative_end = vegetative_start + timedelta(days=veget_avg)
        current_stage_start = vegetative_end

        # Flowering (range)
        flower_start, flower_end = map(int, crop.flowering.split('-'))
        flower_avg = (flower_start + flower_end) // 2
        flowering_start = current_stage_start
        flowering_end = flowering_start + timedelta(days=flower_avg)
        current_stage_start = flowering_end

        # Maturity (range)
        maturity_start_days, maturity_end_days = map(int, crop.maturity.split('-'))
        maturity_avg = (maturity_start_days + maturity_end_days) // 2
        maturity_start = current_stage_start
        maturity_end = maturity_start + timedelta(days=maturity_avg)

        # Save to GrowthStage table
        growth_stage = GrowthStage.objects.create(
            username=username,
            crop_name=crop_name,
            germination_start=germination_start,
            germination_end=germination_end,
            germination_water=crop.germination_water,

            vegetative_start=vegetative_start,
            vegetative_end=vegetative_end,
            vegetative_water=crop.vegetative_water,

            flowering_start=flowering_start,
            flowering_end=flowering_end,
            flowering_water=crop.flowering_water,

            maturity_start=maturity_start,
            maturity_end=maturity_end,
            maturity_water=crop.maturity_water,
        )

        # Response data
        data = {
            'crop_name': crop_name,
            'germination_start': germination_start,
            'germination_end': germination_end,
            'germination_water': growth_stage.germination_water,

            'vegetative_start': vegetative_start,
            'vegetative_end': vegetative_end,
            'vegetative_water': growth_stage.vegetative_water,

            'flowering_start': flowering_start,
            'flowering_end': flowering_end,
            'flowering_water': growth_stage.flowering_water,

            'maturity_start': maturity_start,
            'maturity_end': maturity_end,
            'maturity_water': growth_stage.maturity_water,
        }

        return Response(data, status=status.HTTP_201_CREATED)


class CropListAPIView(APIView):
    """Get only crop names (for dropdowns etc)"""

    def get(self, request):
        crops = Crop.objects.all().values('name')
        return Response(list(crops))

# class UserGrowthStagesAPIView(APIView):
#     def get(self, request, username):
#         growth_stages = GrowthStage.objects.filter(username=username)
#         if not growth_stages.exists():
#             return Response({'message': 'No journeys found for this user.'}, status=status.HTTP_404_NOT_FOUND)

#         data = []
#         for stage in growth_stages:
#             try:
#                 crop = Crop.objects.get(name=stage.crop_name)
#                 duration = crop.duration_days
#             except Crop.DoesNotExist:
#                 duration = None

#         for stage in growth_stages:
#             data.append({
#                 'crop_name': stage.crop_name,
#                 'duration':stage.duration,
#                 'germination_start': stage.germination_start,
#                 'germination_end': stage.germination_end,
#                 'germination_water': stage.germination_water,

#                 'vegetative_start': stage.vegetative_start,
#                 'vegetative_end': stage.vegetative_end,
#                 'vegetative_water': stage.vegetative_water,

#                 'flowering_start': stage.flowering_start,
#                 'flowering_end': stage.flowering_end,
#                 'flowering_water': stage.flowering_water,

#                 'maturity_start': stage.maturity_start,
#                 'maturity_end': stage.maturity_end,
#                 'maturity_water': stage.maturity_water,
#             })

#         return Response(data, status=status.HTTP_200_OK)
class UserGrowthStagesAPIView(APIView):
    def get(self, request, username):
        growth_stages = GrowthStage.objects.filter(username=username)
        if not growth_stages.exists():
            return Response({'message': 'No journeys found for this user.'}, status=status.HTTP_404_NOT_FOUND)

        serializer = GrowthStageSerializer(growth_stages, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class GrowthStageListAPIView(APIView):
    def get(self, request, username):
        stages = GrowthStage.objects.filter(username=username).values()
        return Response(list(stages))


# delete

@api_view(['DELETE'])
def delete_growth_stage(request, id):
    try:
        stage = GrowthStage.objects.get(id=id)
        stage.delete()
        return Response({"message": "Journey deleted successfully."}, status=status.HTTP_204_NO_CONTENT)
    except GrowthStage.DoesNotExist:
        return Response({"message": "Journey not found."}, status=status.HTTP_404_NOT_FOUND)
    
# view
@api_view(['GET'])
def get_user_growth_stages(request, username):
    stages = GrowthStage.objects.filter(username=username)
    if not stages.exists():
        return Response({"message": "No journeys found for this user."}, status=404)
    serializer = GrowthStageSerializer(stages, many=True)
    return Response(serializer.data)




# admin crud operation
class CropListCreateView(generics.ListCreateAPIView):
    queryset = Crop.objects.all()
    serializer_class = CropSerializer
    
    def post(self, request, *args, **kwargs):
        print("POST request received at CropListCreateView")
        return self.create(request, *args, **kwargs)

class CropRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Crop.objects.all()
    serializer_class = CropSerializer