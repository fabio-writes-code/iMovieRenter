import Joi, { errors }  from "joi-browser"
import { useState } from "react"
import Form from "./common/Form"
import * as userService from '../services/userService'
import { useNavigate } from "react-router-dom"
import auth from "../services/authService"


const RegisterForm = () => {

  const [data, setData]=useState({
    username:'',
    password:'',
    name:'',
  })

  const [errors, setErrors]=useState({})

  const navigate=useNavigate()

  const doSubmit=async ()=>{
    //register new user, refactored to authService
    try{
      const response=await userService.register(data)
      console.log(response)

      // adding jwt to localstorage and redirecting
      // localStorage.setItem('token',response.headers['x-auth-token']) -> Refactored to authService
      await auth.loginWithJwt(response.headers['x-auth-token'])

      // navigate('/') //* Does not trigger full re-render
       window.location='/'
    }
    //catch possible errors and displaying for user
    catch(ex){
      if(ex.response && ex.response.status===400){
        const localErr={...errors}
        localErr.username=ex.response.data
        setErrors(localErr)
      }
    }
    console.log('new user registered')
  }

  const props={
    schema:{
      username:Joi.string().email().required().label('Email'),
      password:Joi.string().required().min(5).label('Password'),
      name:Joi.string().required().label('Name')
    },
    onSubmit:doSubmit,
    data, setData, errors, setErrors
  }

  const {renderInput, renderButton, handleSubmit}=Form(props)

  // console.log('errors in Register',errors)

  return(
    <div className="w-100 vh-100 d-flex justify-content-center align-items-center">
      <form  className="w-25" onSubmit={handleSubmit}>
        <h3 className="fw-bold text-center">Login</h3>
        {renderInput({label:'Username',name:'username',focused:true})}
        {renderInput({label:'Password',name:'password', type:'password'})}
        {renderInput({label:'Name',name:'name'})}
        {renderButton('Register')}
      </form>
    </div>
  )
}

export default RegisterForm