import csv
from django.core.management.base import BaseCommand
from pesticide.models import Pesticide, Fertilizer, CropDisease
from pathlib import Path

class Command(BaseCommand):
    help = "Load actual pesticide, fertilizer, and disease data from CSVs"

    def handle(self, *args, **kwargs):
        base_path = Path("data")

        # Pesticides
        with open(base_path / "pesticides_actual.csv", encoding="utf-8") as f:
            reader = csv.DictReader(f)
            Pesticide.objects.bulk_create([
                Pesticide(
                    name=row["name"],
                    type=row["type"],
                    crop=row["crop"],
                    application_rate=int(row["application_rate"]),
                    toxicity=row["toxicity"],
                    manufacturer=row["manufacturer"],
                    usage_frequency=row["usage_frequency"]
                ) for row in reader
            ])

        # Fertilizers
        with open(base_path / "fertilizers_actual.csv", encoding="utf-8") as f:
            reader = csv.DictReader(f)
            Fertilizer.objects.bulk_create([
                Fertilizer(
                    crop=row["crop"],
                    fertilizer_name=row["fertilizer_name"],
                    fertilizer_type=row["fertilizer_type"],
                    composition=row["composition"],
                    application_method=row["application_method"],
                    application_time=row["application_time"]
                ) for row in reader
            ])

        # Crop Diseases
        with open(base_path / "diseases_actual.csv", encoding="utf-8") as f:
            reader = csv.DictReader(f)
            CropDisease.objects.bulk_create([
                CropDisease(
                    crop=row["crop"],
                    disease=row["disease"],
                    symptoms=row["symptoms"],
                    cause=row["cause"],
                    control_measures=row["control_measures"],
                    image_path=row["image_path"]
                ) for row in reader
            ])

        self.stdout.write(self.style.SUCCESS("✅ Successfully loaded actual crop data."))
