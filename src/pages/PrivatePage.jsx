import { useEffect, useState } from 'react'
import service from '../services/config.services'
import { AuthContext } from "../context/auth.context"
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

function PrivatePage() {

  const [dataOnlyForLoggedUsers, setData] = useState(null)
  const { userRole } = useContext(AuthContext)
  const navigate = useNavigate()

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    try {
      
      // llamamos la ruta
      const response = await service.post("/auth/private-page")
      console.log(response)

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <h3>Te has logeado correctamente</h3>
      <p>Vuelve a la página principal</p>

      <button onClick={() => navigate("/")}>Home</button>

    </div>
  )
}

export default PrivatePage