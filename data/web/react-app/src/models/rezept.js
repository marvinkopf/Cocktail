import { getZutatenFromIdArray } from "./zutat";

export async function getRezept(id) {
  const rezept = await fetch(`http://localhost:8000/api/rezept/${id}`).then(
    (res) => res.json()
  );

  rezept.ingredients = await getZutatenFromIdArray(rezept.ingredients);

  return rezept;
}

export async function getRandomRezept(num) {
  const rezepte = await fetch(
    `http://localhost:8000/api/rezepte/?sort=random&limit=${num}`
  ).then((res) => res.json());

  for (const rezept of rezepte) {
    rezept.ingredients = await getZutatenFromIdArray(rezept.ingredients);
  }

  return rezepte;
}

export async function getRezeptList(searchStr = "") {
  const rezepte = await fetch(
    `http://localhost:8000/api/rezepte/?search=${searchStr}`
  ).then((res) => res.json());

  for (const rezept of rezepte) {
    rezept.ingredients = await getZutatenFromIdArray(rezept.ingredients);
  }

  return rezepte;
}
