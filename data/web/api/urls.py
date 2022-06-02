from api.views import RezeptList, ZutatList, Rezept_ZutatList
from rest_framework.routers import DefaultRouter

from main.models import Rezept_Zutat

router = DefaultRouter()
router.register("rezept", RezeptList, basename="rezept")
router.register("zutat", ZutatList, basename="zutat")
router.register("rezept_zutat", Rezept_ZutatList, basename="rezept-zutat")
urlpatterns = router.urls

# urlpatterns = [
#     path("rezept/", views.RezeptList.as_view()),
#     path("zutat/", views.ZutatList.as_view()),
#     path("rezept_zutat/", views.Rezept_ZutatList.as_view()),
# ]
