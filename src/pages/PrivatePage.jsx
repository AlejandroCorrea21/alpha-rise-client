import { useEffect, useState } from 'react'
import service from '../services/config.services'
import { AuthContext } from "../context/auth.context"
import { useContext } from 'react'
function PrivatePage() {

  const [dataOnlyForLoggedUsers, setData] = useState(null)
  const { userRole } = useContext(AuthContext)

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

  const handleDelete = async () => {

    try {
      
      const response = await service.delete("/auth/delete-resource")
      console.log(response)

    } catch (error) {
      console.log(error)
    }

  }

  // loading handler here

  return (
    <div>
      <h3>Página privada</h3>
      <p>Solo usuarios que hayan validado credenciales pueden acceder aquí.</p>

      {userRole === "admin" && (
        <button onClick={handleDelete}>Borrar (ADMIN)</button>
      )}
    </div>
  )
}

export default PrivatePage