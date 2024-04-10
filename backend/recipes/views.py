

# Create your views here.
#  create apiview for temp_data from helpers.py
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .helpers import temp_data
from .serializers import RecipeListSerialzer
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated

class RecipeListAPIView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    def get(self, request):
        data = temp_data
        serializer = RecipeListSerialzer(data, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)