import { getZutatenFromIdArray } from "./zutat";

export function getRezept(id) {
  return fetch(`http://localhost:8000/api/rezept/${id}`);
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
