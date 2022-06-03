export default function IngredientList({ ingredients }) {
  ingredients = [
    { name: "Vodka" },
    { name: "Gin" },
    { name: "Lime" },
    { name: "Mint" },
    { name: "Dry Vermouth" },
  ];

  return (
    <table className="ingredient-list">
      <tbody>
        {ingredients.map((ingredient, idx) => (
          <tr key={idx}>
            <td>{ingredient.name}</td>
            <td>
              <button>Remove</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
