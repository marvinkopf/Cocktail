from rest_framework import serializers

from main.models import Rezept, Zutat, Rezept_Zutat


class RezeptZutatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rezept_Zutat
        fields = ["ingredient", "measure"]


class RezeptSerializer(serializers.ModelSerializer):
    ingredients = RezeptZutatSerializer(source="rezept_to_zutat", read_only=True,
                                        many=True)

    class Meta:
        model = Rezept
        fields = "__all__"


class ZutatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Zutat
        fields = "__all__"
