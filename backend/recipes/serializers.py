from rest_framework import serializers


class RecipeListSerialzer(serializers.Serializer):
    # send json output of temp_data from helpers.py to frontend
    id = serializers.IntegerField()
    title = serializers.CharField()
    image = serializers.CharField()

class RecipeSearchHistorySerializer(serializers.Serializer):
    user_id = serializers.CharField()
    search_query = serializers.CharField()
    search_timestamp = serializers.DateTimeField()
    search_data = serializers.JSONField()
    