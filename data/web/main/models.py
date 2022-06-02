from django.db import models

# Create your models here.


class Zutat(models.Model):
    name = models.CharField(max_length=200, unique=True)

    def __str__(self):
        return self.name


class Rezept(models.Model):
    id = models.BigIntegerField(primary_key=True)
    name = models.CharField(max_length=200)
    is_alcoholic = models.BooleanField(default=False)
    instruction_en = models.CharField(max_length=1500, null=True, blank=True)
    instruction_de = models.CharField(max_length=1500, null=True, blank=True)
    img_url = models.CharField(max_length=200)

    def __str__(self):
        return self.name


class Rezept_Zutat(models.Model):
    ingredient = models.ForeignKey(Zutat, on_delete=models.CASCADE)
    measure = models.CharField(max_length=200)
    recipe = models.ForeignKey(Rezept, on_delete=models.CASCADE)
