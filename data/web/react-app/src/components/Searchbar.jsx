export default function Searchbar({ handleSubmit, defaultValue = "" }) {
  return (
    <form className="searchbar" onSubmit={handleSearch}>
      <input
        type="text"
        placeholder="Finde deinen Cocktail"
        name="searchtext"
        defaultValue={defaultValue}
      />
      <button>Suche</button>
    </form>
  );
}
