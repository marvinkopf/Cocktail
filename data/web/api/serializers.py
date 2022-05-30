from rest_framework import serializers

from main.models import Beispiel, Rezept, Zutat


class BeispielSerializer(serializers.ModelSerializer):
    class Meta:
        model = Beispiel
        fields = ['name']


class RezeptSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rezept
        fields = ['id', 'name', 'imgUrl', 'instruction']

class ZutatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Zutat
        fields = ['name', 'unit', 'recipes']


    

