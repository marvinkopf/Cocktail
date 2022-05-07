from main.models import Beispiel
from api.serializers import BeispielSerializer

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status


class BeispielList(APIView):
    """
    Beispiel für class based view ohne generics.
    """
    def get(self, request):
        beispiele = Beispiel.objects.all()
        serializer = BeispielSerializer(beispiele, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = BeispielSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

