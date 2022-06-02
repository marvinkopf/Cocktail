from rest_framework import serializers

from main.models import Rezept, Zutat, Rezept_Zutat


class RezeptSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rezept
        fields = [
            "id",
            "name",
            "is_alcoholic",
            "instruction_en",
            "instruction_de",
            "img_url",
        ]


class ZutatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Zutat
        fields = "__all__"


class Rezept_ZutatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rezept_Zutat
        fields = "__all__"
