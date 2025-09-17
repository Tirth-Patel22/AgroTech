import os
import pandas as pd
from django.conf import settings
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
import random

# Function to load the market CSV data
def get_market_data():
    # Dynamically build the correct CSV path relative to BASE_DIR
    csv_path = os.path.join(settings.BASE_DIR, 'market', 'market.csv')
    print(f"CSV Path: {csv_path}")  # for debug logging
    return pd.read_csv(csv_path)

# API view to return entire market data (if you want to use this elsewhere)
def market_data_view(request):
    try:
        market_df = get_market_data()
        data = market_df.to_dict(orient='records')
        return JsonResponse(data, safe=False)
    except FileNotFoundError:
        return JsonResponse({'error': 'market.csv file not found.'}, status=404)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)

# API view to return unique crop names for dropdown
def get_crop_names(request):
    csv_path = os.path.join(settings.BASE_DIR, 'market', 'market.csv')
    df = pd.read_csv(csv_path)

    if 'Commodity' not in df.columns:
        return JsonResponse({'error': 'Commodity column not found in CSV.'}, status=400)

    unique_crops = sorted(df['Commodity'].unique())
    return JsonResponse({'crops': unique_crops})

# API view to handle price prediction request
@csrf_exempt
def predict_price(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            crop = data.get('crop')
            date = data.get('date')

            if not crop or not date:
                return JsonResponse({'error': 'Crop and date are required.'}, status=400)

            # Dummy prediction logic — replace with ML model logic later
            predicted_price = round(random.uniform(1000, 5000), 2)

            return JsonResponse({'predicted_price': predicted_price})

        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)

    else:
        return JsonResponse({'error': 'Invalid request method.'}, status=405)
