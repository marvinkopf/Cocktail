from django.shortcuts import get_object_or_404
from main.models import Rezept, Rezept_Zutat, Zutat
from api.serializers import (
    Rezept_ZutatSerializer,
    RezeptSerializer,
    ZutatSerializer,
)
from rest_framework.views import APIView
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import action


class RezeptList(viewsets.ModelViewSet):
    serializer_class = RezeptSerializer

    def get_queryset(self):
        return Rezept.objects.all()


class ZutatList(viewsets.ModelViewSet):
    serializer_class = ZutatSerializer

    def get_queryset(self):
        return Zutat.objects.all()


class Rezept_ZutatList(viewsets.ModelViewSet):
    serializer_class = Rezept_ZutatSerializer

    def get_queryset(self):
        return Rezept_Zutat.objects.all()

    def retrieve(self, request, *args, **kwargs):
        item = kwargs["pk"]
        rz = Rezept_Zutat.objects.filter(recipe=item)
        serializer = Rezept_ZutatSerializer(rz, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


# class RezeptList(viewsets.ViewSet):
#     queryset = Rezept.objects.all()

#     def list(self, request):
#         serializer = RezeptSerializer(self.queryset, many=True)
#         return Response(serializer.data)

#     def create(self, request):
#         serializer = RezeptSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#     def retrieve(self, request, pk=None):
#         recipe = get_object_or_404(self.queryset, pk=pk)
#         serializer = RezeptSerializer(recipe)
#         return Response(serializer.data)

#     def delete(self, request, pk=None):
#         recipe = get_object_or_404(self.queryset, pk=pk)

#         # before we can delete a ingredient, we have to delete all matching
#         # entries in intermediary table rezept_zutat
#         Rezept_Zutat.objects.filter(ingredient=zutat.id).delete()

#         recipe.delete()


# class ZutatList(viewsets.ViewSet):
#     queryset = Zutat.objects.all()

#     def list(self, request):
#         serializer = ZutatSerializer(self.queryset, many=True)
#         return Response(serializer.data)

#     def create(self, request):
#         serializer = ZutatSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#     def retrieve(self, request, pk=None):
#         ingr = get_object_or_404(self.queryset, pk=pk)
#         serializer = ZutatSerializer(ingr)
#         return Response(serializer.data)

#     def delete(self, request, pk=None):
#         ingr = get_object_or_404(self.queryset, pk=pk)

#         # before we can delete a ingredient, we have to delete all matching
#         # entries in intermediary table rezept_zutat
#         Rezept_Zutat.objects.filter(ingredient=ingr.id).delete()
#         ingr.delete()


# class Rezept_ZutatList(viewsets.ViewSet):
#     queryset = Rezept_Zutat.objects.all()

#     def list(self, request):
#         serializer = Rezept_ZutatSerializer(self.queryset, many=True)
#         return Response(serializer.data)

#     def create(self, request):
#         serializer = Rezept_ZutatSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#     def retrieve()


# class RezeptList(APIView):
#     """
#     Liste alle Rezepte und die dazugehörigen Zutaten auf oder erstelle ein neues Rezept.
#     """

#     def get(self, request):
#         rezepte = Rezept.objects.all()
#         serializer = RezeptSerializer(rezepte, many=True)
#         return Response(serializer.data)

#     def post(self, request):
#         serializer = RezeptSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#     def delete(self, request):
#         Rezept.objects.all().delete()
#         return Response(status=status.HTTP_200_OK)


# class ZutatList(APIView):
#     """
#     Liste alle Zutaten auf oder füge neue hinzu.
#     """

#     def get(self, request):
#         zutaten = Zutat.objects.all()
#         serializer = ZutatSerializer(zutaten, many=True)
#         return Response(serializer.data)

#     def post(self, request):
#         serializer = ZutatSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#     def delete(self, request):
#         Zutat.objects.all().delete()
#         return Response(status=status.HTTP_200_OK)


# class Rezept_ZutatList(APIView):
#     """
#     Liste alle Relationen zwischen einem Rezept und einer Zutat auf oder
#     füge eine neue Zutat zu einem Rezept hinzu.
#     """

#     def get(self, request):
#         rezept_zutat = Rezept_Zutat.objects.all()
#         serializer = Rezept_ZutatSerializer(rezept_zutat, many=True)
#         return Response(serializer.data)

#     def post(self, request):
#         serializer = Rezept_ZutatSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#     def delete(self, request):
#         Rezept_Zutat.objects.all().delete()
#         return Response(status=status.HTTP_200_OK)
