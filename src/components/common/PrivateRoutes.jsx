import { Outlet, Navigate ,useLocation} from "react-router-dom";
import authService from "../../services/authService";



const PrivateRoutes = () => {
  const user=authService.getCurrentUser()
  const location=useLocation()
  return user?<Outlet />:<Navigate to='/login' state={{ from: location }} replace />

}

export default PrivateRoutes