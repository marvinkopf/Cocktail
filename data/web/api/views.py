from api import serializers
from main.models import Rezept, Rezept_Zutat, Zutat
from api.serializers import (
    Rezept_ZutatSerializer,
    RezeptSerializer,
    ZutatSerializer,
)

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status


class RezeptList(APIView):
    """
    Liste alle Rezepte und die dazugehörigen Zutaten auf oder erstelle ein neues Rezept.
    """

    def get(self, request):
        rezepte = Rezept.objects.all()
        serializer = RezeptSerializer(rezepte, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = RezeptSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request):
        Rezept.objects.all().delete()
        return Response(status=status.HTTP_200_OK)


class ZutatList(APIView):
    """
    Liste alle Zutaten auf oder füge neue hinzu.
    """

    def get(self, request):
        zutaten = Zutat.objects.all()
        serializer = ZutatSerializer(zutaten, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = ZutatSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request):
        Zutat.objects.all().delete()
        return Response(status=status.HTTP_200_OK)


class Rezept_ZutatList(APIView):
    """
    Liste alle Relationen zwischen einem Rezept und einer Zutat auf oder
    füge eine neue Zutat zu einem Rezept hinzu.
    """

    def get(self, request):
        rezept_zutat = Rezept_Zutat.objects.all()
        serializer = Rezept_ZutatSerializer(rezept_zutat, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = Rezept_ZutatSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request):
        Rezept_Zutat.objects.all().delete()
        return Response(status=status.HTTP_200_OK)
