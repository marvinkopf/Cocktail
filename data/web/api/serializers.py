from rest_framework import serializers

from main.models import Rezept, Zutat, Raum, Rezept_Zutat


class RezeptZutatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rezept_Zutat
        fields = ["ingredient", "measure"]



class ZutatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Zutat
        fields = "__all__"
        

class RezeptSerializer(serializers.ModelSerializer):
    ingredients = RezeptZutatSerializer(source="rezept_to_zutat", read_only=True,
                                        many=True)

    class Meta:
        model = Rezept
        fields = "__all__"
        
class RaumSerializer(serializers.ModelSerializer):
    ingredients = ZutatSerializer(read_only=True, many=True)
    recipes = RezeptSerializer(read_only=True, many=True)
    class Meta:
        model = Raum
        fields = "__all__"
