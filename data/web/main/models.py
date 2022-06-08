from django.db import models

# Create your models here.


class Zutat(models.Model):
    name = models.CharField(max_length=200)

    def __str__(self):
        return self.name


class Rezept(models.Model):
    name = models.CharField(max_length=200, unique=True)
    is_alcoholic = models.BooleanField(default=False)
    instruction_en = models.CharField(max_length=1500, null=True, blank=True)
    instruction_de = models.CharField(max_length=1500, null=True, blank=True)
    img_url = models.CharField(max_length=200)
    ingredients = models.ManyToManyField(Zutat, through="Rezept_Zutat")

    def __str__(self):
        return self.name


class Rezept_Zutat(models.Model):
    ingredient = models.ForeignKey(
        Zutat, on_delete=models.DO_NOTHING, related_name="zutat_to_rezept")
    measure = models.CharField(max_length=200)
    recipe = models.ForeignKey(
        Rezept, on_delete=models.DO_NOTHING, related_name="rezept_to_zutat")

class Raum(models.Model):
    name = models.CharField(max_length=200, unique=True)
    ingredients = models.ManyToManyField(Zutat)
    recipes = models.ManyToManyField(Rezept)
    recipe = models.ForeignKey(
        Rezept, on_delete=models.DO_NOTHING, related_name="rezept_to_zutat")

