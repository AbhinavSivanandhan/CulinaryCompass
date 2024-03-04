from django.urls import path
from users import views

urlpatterns = [
    path('register/', views.register),
    path('login/', views.UserLoginAPIView.as_view(), name='login'),
    path('profile/', views.UserProfileAPIView.as_view(), name='user_profile'),
]
