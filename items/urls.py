from django.urls import path

from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('browse/', views.browse_items, name='browse_items'),
    path('report/', views.report_item, name='report_item'),
    path('items/<int:item_id>/', views.item_detail, name='item_detail'),
]
    