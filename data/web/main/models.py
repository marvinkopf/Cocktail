from django.db import models

# Create your models here.

class Beispiel(models.Model):
    name = models.CharField(max_length=200)


class Rezept(models.Model):
    name = models.CharField(max_length=200)
    imgUrl = models.CharField(max_length=200)
    instruction = models.CharField(max_length=1000)


class Zutat(models.Model):
    name = models.CharField(max_length=200)
    unit = models.CharField(max_length=200)
    recipes = models.ManyToManyField(Rezept)



