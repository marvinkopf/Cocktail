from django.shortcuts import get_object_or_404
from main.models import Rezept, Zutat, Raum
from api.serializers import (
    RezeptSerializer,
    ZutatSerializer,
    RaumSerializer
)
from rest_framework import generics
from rest_framework import viewsets
from rest_framework import filters
from rest_framework.response import Response 
from rest_framework import status
from rest_framework.views import APIView 

class RezeptList(generics.ListAPIView):
    """
    Create a list based on search or sort pattern.
    """

    serializer_class = RezeptSerializer
    # queryset = Rezept.objects.all()
    filter_backends = [filters.SearchFilter]
    search_fields = ["$name"]

    def get_queryset(self):
        search = self.request.query_params.get("search")
        sort = self.request.query_params.get("sort")
        limit = self.request.query_params.get("limit")

        if sort:
            return Rezept.objects.order_by("?")[: int(limit)]
        else:
            return Rezept.objects.filter(name=search)

    # '^' Starts-with search.
    # '=' Exact matches.
    # '@' Full-text search. (Currently only supported Django's PostgreSQL backend.)
    # '$' Regex search.


class RezeptDetail(viewsets.ModelViewSet):
    """
    Create detailed list of recipes.
    """

    serializer_class = RezeptSerializer

    def get_object(self, queryset=None, **kwargs):
        item = self.kwargs.get("pk")
        return get_object_or_404(Rezept, id=item)

    def get_queryset(self):
        return Rezept.objects.all()


class ZutatList(viewsets.ModelViewSet):
    """
    Create a list of recipes.
    """

    serializer_class = ZutatSerializer

    def get_queryset(self):
        return Zutat.objects.all()

class RaumList(viewsets.ModelViewSet):
    serializer_class = RaumSerializer
    
    def get_queryset(self):
        return Raum.objects.all()
        
class RaumIng(APIView):
    def delete(self, request, raum_id):
        raum_instance = Raum.objects.get(id=raum_id)
        ingredient_instance = Zutat.objects.filter(id=request.data["id"])
        if not raum_instance:
            return Response( {"res": "Object with room id does not exists"}, status=status.HTTP_400_BAD_REQUEST )
        
        raum_instance.ingredients.remove(request.data["id"])
        for rezept in Rezept.objects.filter(ingredients=request.data["id"]):
            raum_instance.recipes.remove(rezept.id)

        return Response( {"res": "Object deleted!"}, status=status.HTTP_200_OK )
        
    def post(self, request, raum_id):
        # Load the ingredient object
        ingredient_instance = Zutat.objects.filter(name=request.data["name"])[0]
        
        # Load the room object
        raum_instance = Raum.objects.get(id=raum_id)
        
        # Add the ingredient to the room
        raum_instance.ingredients.add(ingredient_instance)
        
        # For each ingredient, get all the possible recipes.
        possible_recipes = []
        room_ings = raum_instance.ingredients.all()
        for ing in room_ings:
            rezepte = Rezept.objects.filter(ingredients=ing.id)
            possible_recipes = possible_recipes + list(rezepte)
            
        # Delete all recipes from room
        raum_instance.recipes.clear()
        
        for recipe in possible_recipes:
            # For each ingredient in recipe, check if recipe is in room_ings
            # All checks if all ingredients fullfill the condition
            if all([x in room_ings for x in recipe.ingredients.all()]):
                raum_instance.recipes.add(recipe)
            
        
        return Response( {"res": "Ingredient added"}, status=status.HTTP_200_OK )        