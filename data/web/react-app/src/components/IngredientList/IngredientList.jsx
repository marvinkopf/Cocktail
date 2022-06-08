export default function IngredientList({ ingredients, removeIng }) {
  return (<div className="ingredient-list">
    <table>
      <tbody>
        {ingredients?.map((ingredient, idx) => (
          <tr key={idx}>
            <td>{ingredient.name}</td>
            <td>
              <button onClick={() => removeIng(ingredient.id)} className="ingredient-remove-button">Remove</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
}
