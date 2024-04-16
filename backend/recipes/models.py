from django.db import models

# Create your models here.
# User search history model
class UserSearchHistory(models.Model):
    user_id = models.CharField(max_length=100)
    search_query = models.CharField(max_length=100)
    search_timestamp = models.DateTimeField(auto_now_add=True)
    search_data = models.JSONField()

    def __str__(self):
        return self.user_id