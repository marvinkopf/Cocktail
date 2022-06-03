from rest_framework import serializers

from main.models import Rezept, Zutat


class RezeptSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rezept
        fields = "__all__"


class ZutatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Zutat
        fields = "__all__"
