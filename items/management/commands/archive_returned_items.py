from datetime import timedelta
from django.core.management.base import BaseCommand
from django.utils import timezone
from items.models import Item


class Command(BaseCommand):
    help = 'Archive items returned more than 30 days ago'

    def handle(self, *args, **kwargs):
        cutoff_date = timezone.now() - timedelta(days=30)

        archived = Item.objects.filter(
            status='returned',
            is_archived=False,
            returned_at__lte=cutoff_date
        ).update(is_archived=True)

        self.stdout.write(
            self.style.SUCCESS(
                f'{archived} item(s) archived successfully.'
            )
        )