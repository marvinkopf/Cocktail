from api.views import RezeptList, ZutatList, RezeptDetail
from django.urls import path, include
from rest_framework.routers import DefaultRouter


router = DefaultRouter()
router.register(r"rezept", RezeptDetail, basename="rezept-detailcreate")
router.register(r"zutaten", ZutatList, basename="zutat-listcreate")

urlpatterns = [
    path("", include(router.urls)),
    path("rezepte/", RezeptList.as_view(), name="rezept-listcreate"),
]
