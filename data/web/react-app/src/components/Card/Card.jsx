import "./Card.css";
import { Link } from "react-router-dom";

export default function Card({ details }) {
  return (
    <div className="card">
      <Link to={`/cocktails/${details.id}`}>
        <img src={details.img_url} alt={details.name} />
        <div className="card-info">
          <h2>{details.name}</h2>
          <div className="card-info-ingredients">
            {details.ingredients.map((ingredient) => (
              <div className="pill" key={ingredient.id}>
                {ingredient.name}
              </div>
            ))}
          </div>
        </div>
      </Link>
    </div>
  );
}
