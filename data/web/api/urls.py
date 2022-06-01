from django.urls import path
from api import views


urlpatterns = [
    path("beispiel/", views.BeispielList.as_view()),
    path("rezept/", views.RezeptList.as_view()),
    path("zutat/", views.ZutatList.as_view()),
]
