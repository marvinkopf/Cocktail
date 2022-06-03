import "./Card.css";
import { Link } from "react-router-dom";

export default function Card({ details }) {
  return (
    <div className="card">
      <Link to={`/cocktails/${details.id}`}>
        <img src={details.picture} alt={details.name} />
        <div className="card-info">
          <h2>{details.name}</h2>
          <div className="card-info-ingredients">
            {details.ingredients.map((ingredient, idx) => (
              <div className="pill" key={idx}>
                {ingredient}
              </div>
            ))}
          </div>
        </div>
      </Link>
    </div>
  );
}
