import requests
import json
import timeit
from django.core.management.base import BaseCommand
from django.db import IntegrityError
from main.models import Rezept, Zutat, Rezept_Zutat


class Command(BaseCommand):
    help = "Fetch script to populate database with ingredients and cocktails."

    def handle(self, *args, **options) -> None:

        start: float = timeit.default_timer()

        # Clean the database
        self.stdout.write("CLEANING DATABASE FROM ALL ENTRIES..")
        Rezept_Zutat.objects.all().delete()
        Rezept.objects.all().delete()
        Zutat.objects.all().delete()

        url = requests.get(
            "https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list"
        )  # api ingredients

        s: str = url.text
        data = json.loads(s)
        ingrs = data["drinks"]

        self.stdout.write("STARTING POPULATE TABLE ZUTAT\n")

        # iterate over every ingredient in list and transact to db
        for ingr in ingrs:
            if (
                ingr["strIngredient1"] is None
                or Zutat.objects.filter(name=ingr["strIngredient1"]).values()
                is not None
            ):
                pass
            else:
                try:
                    z = Zutat(name=ingr["strIngredient1"])
                    z.save()
                    self.stdout.write(
                        f"INSERTING ENTRY {z.name} INTO TABLE 'ZUTAT'.. SUCCESS!"
                    )
                except IntegrityError:
                    self.stderr.write(f"ENTRY {z.name} ALREADY EXISTS.. SKIPPING")

        self.stdout.write("POPULATING TABLE 'ZUTAT' FINISHED!\n\n")

        # fetch recipes
        for ch in range(97, 123):
            self.populate_recipe(ch)

        stop: float = timeit.default_timer()
        exec: float = stop - start
        self.stdout.write(f"DATABASE TRANSACTIONS COMPLETED IN {round(exec)}s!")

    # helper for REZEPT and REZEPT_ZUTAT, taking an integer as argument that translates to a ascii letter
    def populate_recipe(self, ch: int):
        url = requests.get(
            "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + chr(ch)
        )  # append letter to the url to get all cocktails starting with letter ch

        s: str = url.text
        data = json.loads(s)
        drinks = data["drinks"]

        self.stdout.write("STARTING POPULATE TABLE REZEPT")

        for drink in drinks:
            # these vars will be needed later for REZEPT_ZUTAT. In order for a
            # successful transaction, the recipes need to be inserted into the
            # database before we can insert into REZEPT_ZUTATself.

            try:
                r = Rezept()
                r.name = drink["strDrink"]
                if drink["strAlcoholic"] == "Alcoholic":
                    r.is_alcoholic = True
                r.instruction_en = drink["strInstructions"]
                r.instruction_de = drink["strInstructionsDE"]
                r.img_url = drink["strDrinkThumb"]
                r.save()
                self.stdout.write(
                    f"INSERTING ENTRY {r.name} INTO TABLE REZEPT .. SUCCESS!"
                )
            except IntegrityError:
                self.stderr.write(f"ENTRY {r.name} ALREADY EXISTS.. SKIPPING")

            st_i: str = "strIngredient"
            st_m: str = "strMeasure"

            # next filter all ingredients and the measure to create entry for
            # REZEPT_ZUTAT
            for i in range(1, 16):

                # check if ingredient needs to be added to database
                if drink[st_i + str(i)] is not None:
                    try:
                        z = Zutat(name=drink[st_i + str(i)])
                        z_id = z.id
                        z.save()
                    except IntegrityError:
                        pass

                    # if ingredient exists, set z to the existing one
                    z_id = Zutat.objects.filter(name=drink[st_i + str(i)]).values()

                    # create the rezept_zutat relation
                    try:
                        rz = Rezept_Zutat()
                        rz.ingredient_id = z_id[0]["id"]
                        # some ingredients don't have a measure associated to it
                        if drink[st_m + str(i)] is None:
                            rz.measure = ""
                        else:
                            rz.measure = drink[st_m + str(i)]

                        rz.recipe_id = r.id
                        rz.save()
                        self.stdout.write(
                            f"RELATION BETWEEN {r.name} AND {z.name} ESTABLISHED."
                        )
                    except IntegrityError:
                        self.stderr.write(
                            f"CANNOT ESTABLISH RELATION BETWEEN {r.name} AND {z.name}"
                        )
                else:
                    pass

        self.stdout.write("\n\n")
