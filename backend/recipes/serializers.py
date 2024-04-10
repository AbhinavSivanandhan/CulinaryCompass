from rest_framework import serializers


class RecipeListSerialzer(serializers.Serializer):
    # send json output of temp_data from helpers.py to frontend
    id = serializers.IntegerField()
    title = serializers.CharField()
    image = serializers.CharField()