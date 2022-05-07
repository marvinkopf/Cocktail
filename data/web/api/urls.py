from django.urls import path
from api import views


urlpatterns = [
    path('api/beispiel/', views.BeispielList.as_view())
]
