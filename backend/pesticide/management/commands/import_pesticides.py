import csv
from django.core.management.base import BaseCommand
from pesticide.models import Pesticide

class Command(BaseCommand):
    help = 'Load Pesticides from CSV'

    def handle(self, *args, **kwargs):
        with open('data/pesticide_data_40crops.csv', newline='', encoding='utf-8') as csvfile:
            reader = csv.DictReader(csvfile)
            for row in reader:
                Pesticide.objects.create(
                    name=row['name'],
                    type=row['type'],
                    crop=row['crop'],
                    application_rate=row['application_rate'],
                    toxicity=row['toxicity'],
                    manufacturer=row['manufacturer'],
                    usage_frequency=row['usage_frequency']
                )
        self.stdout.write(self.style.SUCCESS('Data inserted successfully'))
