from django.urls import path
from . import views

urlpatterns = [
    path("", views.index,{'resource': ''}, name="index"),
    path('<path:resource>', views.index)
]