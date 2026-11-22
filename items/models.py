from django.db import models, transaction
from django.core.exceptions import ValidationError

# Create your models here.
class Item(models.Model):
  category_choices = [
    ('electronics', 'Electronics'),
    ('bags', 'Bags'),
    ('documents', 'Documents'),
    ('clothing', 'Clothing'),
    ('keys', 'Keys'),
    ('other', 'Other'),
    ('accessories', 'Accessories'),
    ('personal_belongings', 'Personal Belongings'),
    ('academics', 'Academics'),
]
  Status_choices=[
    ('available','Available'),
    ('claimed','Claimed'),
    ('returned','Returned'),
  ]
  is_archived = models.BooleanField(default=False)
  returned_at = models.DateTimeField(null=True, blank=True)
  title=models.CharField(max_length=100)
  category=models.CharField(max_length=30, choices=category_choices)
  description=models.TextField()
  location=models.CharField(max_length=100)
  date_found=models.DateField()
  image=models.ImageField(upload_to='item_images/',blank=True, null=True)
  contact_name=models.CharField(max_length=100)
  contact_email = models.EmailField(blank=True)
  contact_phone=models.CharField(max_length=15)
  date_uploaded=models.DateTimeField(auto_now_add=True)
  last_updated=models.DateTimeField(auto_now=True)
  status=models.CharField(max_length=20, choices=Status_choices, default='available')
class Claim(models.Model):
  item = models.ForeignKey(
    Item,
    on_delete=models.CASCADE,
    related_name='claims'
)
  claimant_name = models.CharField(max_length=100)
  claimant_phone = models.CharField(max_length=15)
  ownership_details = models.TextField()
  status_choices = [
    ('pending', 'Pending'),
    ('approved', 'Approved'),
    ('rejected', 'Rejected'),
]

  status = models.CharField(
    max_length=20,
    choices=status_choices,
    default='pending',
  )
  date_submitted = models.DateTimeField(auto_now_add=True)
  def save(self, *args, **kwargs):
    if self.status == 'approved':
        with transaction.atomic():
            already_approved = Claim.objects.filter(
                item=self.item,
                status='approved'
            ).exclude(pk=self.pk).exists()

            if already_approved:
                raise ValidationError(
                    'This item already has an approved claim.'
                )

            super().save(*args, **kwargs)
            self.item.status = 'claimed'
            self.item.save(update_fields=['status'])
            Claim.objects.filter(
                item=self.item,
                status='pending'
            ).exclude(pk=self.pk).update(status='rejected')

    else:
        super().save(*args, **kwargs)
