from django import forms
from django.core.exceptions import ValidationError
from django.utils import timezone
from django.contrib import admin
from .models import Item, Claim

# Register your models here.
from .models import Item
class ItemAdminForm(forms.ModelForm):

    class Meta:
        model = Item
        fields = '__all__'

    def clean_status(self):
        status = self.cleaned_data.get('status')

        if (
            status == 'available'
            and self.instance.pk
            and self.instance.claims.filter(status='approved').exists()
        ):
            raise ValidationError(
                'This item has an approved claim and cannot be marked available.'
            )

        return status
@admin.register(Item)
class ItemAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'status', 'is_archived', 'returned_at')
    list_filter = ('status', 'is_archived')
    form = ItemAdminForm
    actions = ['restore_items']

    @admin.action(description='Restore selected archived items')
    def restore_items(self, request, queryset):
        count = queryset.filter(is_archived=True).update(is_archived=False)

        self.message_user(request, f'{count} item(s) restored.')
from .models import Item, Claim
@admin.register(Claim)
class ClaimAdmin(admin.ModelAdmin):
    list_display = (
        'id', 'claimant_name', 'claimant_phone',
        'item', 'status', 'date_submitted'
    )
    list_filter = ('status', 'date_submitted')

    search_fields = ('claimant_name', 'claimant_phone')

    actions = [
        'approve_claims',
        'reject_claims',
        'mark_item_returned',
    ]

    @admin.action(description='Approve selected claims')
    def approve_claims(self, request, queryset):
        processed_items = set()
        approved_count = 0
        skipped_count = 0

        for claim in queryset.select_related('item').order_by('id'):

            if claim.item_id in processed_items:
                skipped_count += 1
                continue

            already_approved = Claim.objects.filter(
                item_id=claim.item_id,
                status='approved'
            ).exclude(id=claim.id).exists()

            if (
                already_approved
                or claim.status != 'pending'
                or claim.item.status != 'available'
            ):
                skipped_count += 1
                continue

            processed_items.add(claim.item_id)

            Claim.objects.filter(
                item_id=claim.item_id,
                status='pending'
            ).exclude(id=claim.id).update(status='rejected')

            claim.status = 'approved'
            claim.save(update_fields=['status'])
            approved_count += 1

        self.message_user(
            request,
            f'{approved_count} claim(s) approved. {skipped_count} skipped.'
        )

    @admin.action(description='Reject selected claims')
    def reject_claims(self, request, queryset):
        updated = queryset.filter(status='pending').update(
            status='rejected'
        )
        self.message_user(
            request,
            f'{updated} pending claim(s) rejected.'
        )

    @admin.action(description='Confirm handover and mark item returned')
    def mark_item_returned(self, request, queryset):
        returned_count = 0
        skipped_count = 0

        for claim in queryset.filter(
            status='approved'
        ).select_related('item'):

            if claim.item.status != 'claimed':
                skipped_count += 1
                continue

            claim.item.status = 'returned'
            claim.item.returned_at = timezone.now()
            claim.item.save(
                update_fields=['status', 'returned_at']
            )
            returned_count += 1

        self.message_user(
            request,
            f'{returned_count} item(s) returned. '
            f'{skipped_count} skipped.'
        )