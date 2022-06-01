from api import serializers
from django.views.decorators.csrf import csrf_exempt
from main.models import Beispiel, Rezept, Zutat
from api.serializers import BeispielSerializer, RezeptSerializer, ZutatSerializer

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

import qrcode

class BeispielList(APIView):
    """
    Beispiel für class based view ohne generics.
    """
    @csrf_exempt
    def get(self, request):
        beispiele = Beispiel.objects.all()
        serializer = BeispielSerializer(beispiele, many=True)
        return Response(serializer.data)

    @csrf_exempt
    def post(self, request):
        serializer = BeispielSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class RezeptList(APIView):
    """
    Liste alle Rezepte und die dazugehörigen Zutaten auf oder erstelle ein neues Rezept.
    """
    @csrf_exempt
    def get(self, request):
        rezepte = Rezept.objects.all()
        serializer = RezeptSerializer(rezepte, many=True)
        return Response(serializer.data)

    @csrf_exempt
    def post(self, request):
        serializer = RezeptSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()

            img = qrcode.make('localhost:8000/api/rezept/'+str(serializer.data['id']))
            type(img)  # qrcode.image.pil.PilImage
            img.save("react-app/static/recipe_"+str(serializer.data['id'])+".png")

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ZutatList(APIView):
    """
    Liste alle Zutaten auf oder füge neue hinzu.
    """
    @csrf_exempt
    def get(self, request):
        zutaten = Zutat.objects.all()
        serializer = ZutatSerializer(zutaten, many=True)
        return Response(serializer.data)

    @csrf_exempt
    def post(self, request):
        serializer = ZutatSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
