import { useContext } from "react"
import { AuthContext } from "../context/auth.context"


// este componente se encarga de proteger las páginas que solo son accesibles para los usuarios que están logeados.

function OnlyPrivate(props) {

    const { isLoggedIn } = useContext(AuthContext)

    if (isLoggedIn === true) {
        return props.children // si está logeado, muestre la página
    } else {
        // en la base del componente no podemos usar el navigate de useNavigate.
        return <Navigate to="/login" /> // si el usuario no está logeado, lo envia hacer el login.
    }

}

export default OnlyPrivate