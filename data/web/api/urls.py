from django.urls import path
from api import views


urlpatterns = [
    path('api/beispiel/', views.BeispielList.as_view()),
    path('api/rezept/', views.RezeptList.as_view()),
    path('api/zutat/', views.ZutatList.as_view()),
]
