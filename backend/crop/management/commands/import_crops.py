import csv
from django.core.management.base import BaseCommand
from crop.models import Crop  # replace 'your_app' with your actual app name

class Command(BaseCommand):
    help = 'Import crops from a CSV file'

    def handle(self, *args, **kwargs):
        with open('data/crop.csv', newline='', encoding='utf-8') as csvfile:
            reader = csv.DictReader(csvfile)
            for row in reader:
                Crop.objects.create(
                    name=row['name'],
                    crop_type=row['crop_type'],
                    sowing_season=row['sowing_season'],
                    harvest_season=row['harvest_season'],
                    duration_days=int(row['duration_days']),
                    ideal_temperature_min=float(row['ideal_temperature_min']),
                    ideal_temperature_max=float(row['ideal_temperature_max']),
                    ideal_rainfall=float(row['ideal_rainfall']),
                    soil_type=row['soil_type'],
                    germination=row['germination'],
                    vegetative_growth=row['vegetative_growth'],
                    flowering=row['flowering'],
                    maturity=row['maturity'],
                    image=row['image'],
                    description=row['description'],
                    germination_water=row['germination_water'],
                    vegetative_water=row['vegetative_water'],
                    flowering_water=row['flowering_water'],
                    maturity_water=row['maturity_water'],
                )
                self.stdout.write(self.style.SUCCESS(f"Inserted: {row['name']}"))
