from django.shortcuts import get_object_or_404
from main.models import Rezept, Zutat
from api.serializers import (
    RezeptSerializer,
    ZutatSerializer,
)
from rest_framework import generics
from rest_framework import viewsets
from rest_framework import filters


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
