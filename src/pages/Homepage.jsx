import { Link } from "react-router-dom";

function Homepage() {
  return (
    <div>
      <h1>Bienvenido a AlphaRise</h1>
      <Link to="/ResourcePage">
        <button>Ver Recursos</button>
      </Link>
    </div>
  );
}

export default Homepage;
