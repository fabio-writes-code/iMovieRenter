//Thrid party libraries
import { Navigate, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify'

// Components
import Customers from './components/Customers';
import Movies from './components/movies';
import NavBar from './components/NavBar';
import NotFound from './components/NotFound';
import Rentals from './components/Rentals';
import MovieForm from './components/MovieForm';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm'
import auth from './services/authService';
import PrivateRoutes from './components/common/PrivateRoutes';
// import 'react-toastify/dist/react-toastify/css'

// Css 
import './App.scss';
import Logout from './components/Logout';
import CustomerForm from './components/CustomerForm';
import RentalsForm from './components/RentalsForm';


function App() {

  const [user, setUser] = useState()


  useEffect(() => {


    //* Try catch/block moved to authService
    // try {
    //   // retrieves the token
    //   const token = localStorage.getItem('token')

    //   //Decode token
    //   const user = jwtDecode(token)
    //   console.log(user)

    //get the user from authService and update the state
    const user = auth.getCurrentUser()

    // console.log(user)

    setUser(user)
    // } catch (ex) { }
  }, [])

  return (
    <main className='container'>
      <ToastContainer />
      <NavBar user={user} />
      <div className="content">
        <Routes>
          <Route path='/*' element={<Navigate replace to='/not-found' />} />
          <Route path='login' element={<LoginForm />} />
          <Route path='logout' element={<Logout />} />
          <Route path='register' element={<RegisterForm />} />
          <Route element={<PrivateRoutes />}>
            <Route path='customers/:id' element={<CustomerForm />} />
            <Route path='rentals/:id' element={<RentalsForm />} />
            <Route path='movies/:id' element={<MovieForm />} exact />
            <Route path='customers' element={<Customers user={user} />} exact />
          </Route>
          {/* <Route path='movies/:id' element={<MovieForm />} /> */}
          <Route path='/movies' element={<Movies user={user} />} />
          <Route path='/rentals' element={<Rentals user={user} />} />
          <Route path='/' element={<Navigate to="/movies" />} />
          <Route path='not-found' element={<NotFound />} />
        </Routes>
      </div>
    </main>
  );
}

export default App;
