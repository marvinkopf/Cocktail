from django.urls import path
from api import views


urlpatterns = [
    path("rezept/", views.RezeptList.as_view()),
    path("zutat/", views.ZutatList.as_view()),
    path("rezept_zutat/", views.Rezept_ZutatList.as_view()),
]
