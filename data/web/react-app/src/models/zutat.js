export function getZutat(id) {
  return fetch(`http://localhost:8000/api/zutaten/${id}`).then((res) =>
    res.json()
  );
}

export async function getZutatenFromIdArray(array) {
  const zutaten = await Promise.all(
    array.map((obj) => getZutat(obj.ingredient))
  );

  return array.map((obj, idx) => {
    return { ...zutaten[idx], measure: obj["measure"] };
  });
}

export function getZutatList() {
  return fetch(`http://localhost:8000/api/zutaten`).then((res) => res.json());
}
