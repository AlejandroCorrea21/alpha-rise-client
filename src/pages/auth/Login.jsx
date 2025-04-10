import { useState, useContext } from "react";
import { AuthContext } from "../../context/auth.context"
import { useNavigate } from "react-router-dom"
import service from "../../services/config.services";


function Login() {

  const { authenticateUser } = useContext(AuthContext)
  const navigate = useNavigate()

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ errorMessage, setErrorMessage ] = useState(null)

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleLogin = async (e) => {

    e.preventDefault();

    //Contactar al backend para validar credenciales de usuario

    try {
      
      const response = await service.post(`/auth/login`, {
        email: email,
        password: password
      })

      console.log("usuario logeado", response)

      localStorage.setItem("authToken", response.data.authToken)

      // validar el token y saber quien es el usuario dueño del token. Actualizamos los estados.
      await authenticateUser()

      navigate("/")

    } catch (error) {
      console.log(error)
      if (error.response && error.response.status === 400) {
        console.log(error.response.status)
        console.log(error.response.data.errorMessage)
        setErrorMessage(error.response.data.errorMessage)
      } else {
        // aqui hacemos navigate a /error
      }
    }

  };

  return (
    <div>

      <h1>Formulario de Acceso</h1>

      <form onSubmit={handleLogin}>
        <label>Correo Electronico:</label>
        <input
          type="email"
          name="email"
          required
          value={email}
          onChange={handleEmailChange}
        />

        <br />

        <label>Contraseña:</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
        />

        <br />

        <button type="submit" style={{ margin: "5px", padding: "10px 20px", backgroundColor: "#5768a2", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", fontSize: "16px" }}>Acceder</button>

        {errorMessage !== null ? <p>{errorMessage}</p> : null}

      </form>
      
    </div>
  );
}

export default Login;