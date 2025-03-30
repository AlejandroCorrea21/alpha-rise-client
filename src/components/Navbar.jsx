import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

function Navbar() {

    const { authenticateUser, isLoggedIn } = useContext(AuthContext)
    const navigate = useNavigate()

    const handleLogout = async () => {

        try {

            // removemos el token
            localStorage.removeItem("authToken")

            // removemos los estados del contexto
            await authenticateUser() // esto siempre fallará al no existir el token.

            // redireccionamos a alguna página publica
            navigate("/login")

        } catch (error) {
            console.log(error)
        }

    }

    return (
        <nav>
            <Link to="/">Home</Link>
            {isLoggedIn === true
                ?
                <>
                    <Link to="/private-page-example">Página Restringida</Link>
                    <Link onClick={handleLogout}>Cerrar sesión</Link>
                </>
                :
                <>
                    <Link to="/signup">Registro</Link>
                    <Link to="/login">Acceso</Link>
                </>
            }


        </nav>
    );
}

export default Navbar;
