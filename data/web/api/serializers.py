from rest_framework import serializers

from main.models import Rezept, Zutat, Rezept_Zutat


class RezeptSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rezept
        fields = "__all__"


class ZutatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Zutat
        fields = "__all__"


class Rezept_ZutatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rezept_Zutat
        fields = "__all__"
