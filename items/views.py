from rest_framework.parsers import MultiPartParser, FormParser
from django.shortcuts import render
from rest_framework import generics
from .models import Item, Claim
from .serializers import ItemSerializer, ClaimSerializer
from rest_framework.permissions import AllowAny


class ItemListCreateView(generics.ListCreateAPIView):
    queryset = Item.objects.filter(is_archived=False)
    serializer_class = ItemSerializer
    parser_classes = [MultiPartParser, FormParser]


class ItemDetailView(generics.RetrieveAPIView):
    queryset = Item.objects.filter(is_archived=False)
    serializer_class = ItemSerializer
class ClaimCreateView(generics.CreateAPIView):
    queryset = Claim.objects.all()
    serializer_class = ClaimSerializer
    permission_classes = [AllowAny]