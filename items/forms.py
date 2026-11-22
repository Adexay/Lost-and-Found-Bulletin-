from django import forms

from .models import Item


class ReportItemForm(forms.ModelForm):
    class Meta:
        model = Item
        fields = [
            'title',
            'category',
            'description',
            'location',
            'date_seen',
            'contact_name',
            'phone',
            'email',
        ]
        widgets = {
            'title': forms.TextInput(attrs={'placeholder': 'Laptop, wallet, keys...'}),
            'description': forms.Textarea(attrs={'rows': 5, 'placeholder': 'Describe the item, identifying features, color, brand, and any notes.'}),
            'location': forms.TextInput(attrs={'placeholder': 'Library, cafeteria, classroom 203...'}),
            'date_seen': forms.DateInput(attrs={'type': 'date'}),
            'contact_name': forms.TextInput(attrs={'placeholder': 'Your name'}),
            'phone': forms.TextInput(attrs={'placeholder': '+234 712 345 678'}),
            'email': forms.EmailInput(attrs={'placeholder': 'you@example.com'}),
        }
        labels = {
            'date_seen': 'When did you last see it?',
            'contact_name': 'Contact name',
        }
