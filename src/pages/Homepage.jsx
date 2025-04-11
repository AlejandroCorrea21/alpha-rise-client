import { Link } from "react-router-dom";

function Homepage() {
  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h1>Bienvenido a AlphaRise</h1>

      <div style={{ marginTop: '20px' }}>
        <img src="https://res.cloudinary.com/dtobkctj9/image/upload/v1744380122/305764477_165131682835779_7444225890165805066_n_ggw2yj.png" alt="Logo AlphaRise" style={{ maxWidth: "300px", width: "80%", height: "auto", borderRadius: "12px" }}
        />
      </div>

      <div style={{ marginTop: '30px' }}>
        <Link to="/ResourcePage">
          <button style={{ fontSize: '18px', padding: '10px 20px', backgroundColor: '#7aae3d', border: 'none', borderRadius: '8px', color: '#fff', cursor: 'pointer' }}>
            Ver Recursos</button>
        </Link>
      </div>
    </div>
  );
}

export default Homepage;
