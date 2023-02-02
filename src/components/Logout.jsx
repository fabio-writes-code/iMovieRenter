import { useEffect } from "react"
import auth from "../services/authService"


const Logout = () => {
  useEffect(()=>{
    auth.logout()
    // localStorage.removeItem('token')
    window.location='/'
  })
  return null
}

export default Logout