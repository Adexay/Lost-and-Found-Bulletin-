from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('items', '0004_claim'),
    ]

    operations = [
        migrations.AddField(
            model_name='claim',
            name='is_archived',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='claim',
            name='returned_at',
            field=models.DateTimeField(blank=True, null=True),
        ),
    ]