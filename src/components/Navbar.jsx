import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

function Navbar() {

  const { authenticateUser, isLoggedIn, userRole } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogout = async () => {

    try {
      
      // removemos el token
      localStorage.removeItem("authToken")

      // removemos los estados del contexto
      await authenticateUser() // esto siempre va a fallar porque el token no existe y automaticamente cambia los estados

      // redireccionamos a alguna página publica
      navigate("/login")

    } catch (error) {
      console.log(error)
    }

  }

  return (
    <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px", backgroundColor: "#222", color: "#fff", gap: "20px" }}>
      <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>

          <Link to="/" style={{ color: "white", textDecoration: "none" }}>Home</Link>
          <Link to="/About" style={{ color: "white", textDecoration: "none" }}>About</Link>
          <button onClick={() => navigate(-1)} style={{ fontSize: "16px", padding: "8px 16px", backgroundColor: "#f2a90d", border: "none", color: "white", cursor: "pointer", borderRadius: "4px" }}>
            Atrás</button>

      </div>

      {isLoggedIn && (
        <Link to="/profile">Mi Perfil</Link>)}

      {isLoggedIn ? (
        <div style={{ display: "flex", gap: "20px" }}>
          {userRole === "admin" && (
            <Link to="/admin" style={{ color: "white", textDecoration: "none" }}>Panel de control</Link>
          )}
          <Link onClick={handleLogout} style={{ color: "white", textDecoration: "none", cursor: "pointer" }}>Cerrar sesión</Link>
        </div>
      ) : (
        <div style={{ display: "flex", gap: "20px" }}>
          <Link to="/signup" style={{ color: "white", textDecoration: "none" }}>Registro</Link>
          <Link to="/login" style={{ color: "white", textDecoration: "none" }}>Acceso</Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;