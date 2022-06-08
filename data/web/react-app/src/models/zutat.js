export function getZutat(id) {
  return fetch(`http://localhost:8000/api/zutaten/${id}`).then((res) =>
    res.json()
  );
}

export async function getZutatenFromIdArray(array) {
  let zutaten = await Promise.all(array.map((obj) => getZutat(obj.ingredient)));

  return array
    .map((obj, idx) => {
      return { ...zutaten[idx], measure: obj["measure"] };
    })
    .filter((zutat) => Boolean(zutat.name));
}

export function getZutatList() {
  return fetch(`http://localhost:8000/api/zutaten`).then((res) => res.json());
}
