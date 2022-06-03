import "./Searchbar.css";

export default function Searchbar({
  onSubmit,
  placeholder = "Finde deinen Cocktail",
  defaultValue = "",
  buttonLabel = "Suche",
}) {
  return (
    <form className="searchbar" onSubmit={onSubmit}>
      <input
        type="text"
        placeholder={placeholder}
        name="searchtext"
        defaultValue={defaultValue}
      />
      <button>{buttonLabel}</button>
    </form>
  );
}
