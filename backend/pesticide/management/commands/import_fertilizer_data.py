import csv
from django.core.management.base import BaseCommand
from pesticide.models import Fertilizer

class Command(BaseCommand):
    help = 'Load Fertilizers from fertilizers.csv'

    def handle(self, *args, **kwargs):
        with open('data/fertilizer_data_40crops.csv', newline='', encoding='utf-8') as csvfile:
            reader = csv.DictReader(csvfile)
            for row in reader:
                Fertilizer.objects.create(
                    crop=row['crop'],
                    fertilizer_name=row['fertilizer_name'],
                    fertilizer_type=row['fertilizer_type'],
                    composition=row['composition'],
                    application_method=row['application_method'],
                    application_time=row['application_time']
                )
        self.stdout.write(self.style.SUCCESS('Fertilizers inserted successfully'))
