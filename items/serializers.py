from rest_framework import serializers
from .models import Item,Claim
class ItemSerializer(serializers.ModelSerializer):
    contact_name = serializers.CharField(write_only=True)
    contact_phone = serializers.CharField(write_only=True)
    contact_email = serializers.EmailField(
    write_only=True,
    required=False,
    allow_blank=True
)
    class Meta:
        model = Item
        fields = '__all__'
        read_only_fields = [
        'id',
        'status',
        'is_archived',
        'returned_at',
        'date_uploaded',
        'last_updated',
        ]
class ClaimSerializer(serializers.ModelSerializer):
    claimant_name = serializers.CharField(write_only=True)
    claimant_phone = serializers.CharField(write_only=True)
    ownership_details = serializers.CharField(write_only=True)
    class Meta:
        model = Claim
        fields = '__all__'
        read_only_fields = ['id', 'status', 'date_submitted']
    def validate_item(self, value):
        if value.status != 'available':
            raise serializers.ValidationError(
            'This item is no longer available for claiming.'
        )

        return value