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
    <nav>
      <Link to="/">Home</Link>
      <Link to="/About">About</Link>
      {isLoggedIn === true 
      ?
        <div>
          <Link to="/private-page">Ejemplo Privado</Link>
          {userRole === "admin" && <Link to="/admin">Panel de control</Link>}
          <Link onClick={handleLogout}>Cerrar sesión</Link>
        </div>
      : 
        <div>
          <Link to="/signup">Registro</Link>
          <Link to="/login">Acceso</Link>
        </div>
      }
      

    </nav>
  );
}

export default Navbar;