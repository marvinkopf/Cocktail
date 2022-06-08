from api.views import RezeptList, ZutatList, RezeptDetail, RaumList, RaumIng
from django.urls import path, include
from rest_framework.routers import DefaultRouter


router = DefaultRouter()
router.register(r"rezept", RezeptDetail, basename="rezept-detailcreate")
router.register(r"zutaten", ZutatList, basename="zutat-listcreate")
router.register(r"raeume",RaumList, basename="raum-listcreate")

urlpatterns = [
    path("", include(router.urls)),
    path("rezepte/", RezeptList.as_view(), name="rezept-listcreate"),
    path("raeume/<int:raum_id>/ingredients/remove", RaumIng.as_view()),
    path("raeume/<int:raum_id>/ingredients/add", RaumIng.as_view())
]
