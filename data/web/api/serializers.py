from rest_framework import serializers

from main.models import Beispiel


class BeispielSerializer(serializers.ModelSerializer):
    class Meta:
        model = Beispiel
        fields = ['name']

