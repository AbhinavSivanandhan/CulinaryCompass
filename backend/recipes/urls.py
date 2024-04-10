from django.urls import path
from recipes import views

urlpatterns = [
    path('recipe_list/', views.RecipeListAPIView.as_view(), name='recipe_list'),
]
