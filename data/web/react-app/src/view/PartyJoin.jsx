import { useNavigate } from "react-router-dom";

export default function PartyJoin() {
  const navigate = useNavigate();
  return (
    <div
      style={{
        width: "50em",
        marginInline: "auto",
      }}
    >
      <h1>Einer Party Beitreten</h1>

      <div>
        <form
          onSubmit={(e) => {
            const id = e.target.elements.id.value;
            navigate(`/party/${id}`);
          }}
        >
          <label>
            Benutze eine PIN <input type="text" name="id" />
          </label>
        </form>
      </div>
    </div>
  );
}
