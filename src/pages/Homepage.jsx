import { Link } from "react-router-dom";

function Homepage() {
  return (
    <div>
      <h1>Bienvenido a AlphaRise</h1>
      <Link to="/ResourcePage">
      <button style={{ fontSize: '18px', padding: '10px 20px', marginTop: '20px', textAlign: 'center', marginLeft: '30px', marginRight: '30px', backgroundColor: '#7aae3d' }}>Ver Recursos</button>
      </Link>
    </div>
  );
}

export default Homepage;
