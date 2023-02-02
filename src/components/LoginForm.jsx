import { useRef,useEffect, useState } from "react"
import Joi from 'joi-browser'
import Form from "./common/Form"
import auth from "../services/authService"
import { useNavigate, useLocation, Navigate } from "react-router-dom"


const LoginForm = () => {

  const navigate=useNavigate()
  const location=useLocation()

  const [data, setData]=useState({
    username:'',
    password:''
  })

  const [errors, setErrors]=useState({})

  // const usernameFocus=useRef(null)
  // useEffect(()=>{
  //   usernameFocus.current.focus()
  // })

  const doSubmit= async ()=>{
    try {
      await auth.login(data.username,data.password) //* sets jwt private key in localstorage
      // localStorage.setItem('token',jwt) -> refactored to authService
      window.location=location.state?location.state.from.pathname:'/';
    } catch (ex) {
      if (ex.response){
        const localErr={...errors}
        localErr.username=ex.response.data
        setErrors(localErr)
      }
    }
    console.log('submit')
  }

  const props={
    schema:{
      username:Joi.string().email().required().label('Username'),
      password:Joi.string().required().label('Password')
    },
    onSubmit:doSubmit,
    data,
    setData,
    errors,
    setErrors
  }

  //?Moved to props object
//   const schema={
//     username:Joi.string().required().label('Username'),
//     password:Joi.string().required().label('Password')
// }

  //? Extracted to common/form
  // const validate = ()=>{}

  //? Extracted to common/form
  // const validateProperty=({name,value})=>{}
  
  //? Extracted to common/form
  // const handleChange =(e)=>{

  //   //Validation on change
  //   const input=e.currentTarget
  //   const errProp={...errors}
  //   const errorMessage=validateProperty(input)
  //   if(errorMessage) errProp[input.name]=errorMessage
  //   else delete errProp[input.name]

  //   const acc ={...data}
  //   acc[e.target.name]=e.currentTarget.value
  //   setData(acc)
  //   setErrors(errProp)
  // }

  //?Extracted to common/forms
  // const handleSubmit=(e)=>{
  //   e.preventDefault()

  //   //validation on submit
  //   const errors= validate()
  //   console.log(errors)
  //   setErrors(errors)
  //   if(errors) return
  // }

  const {renderInput, renderButton, handleSubmit}=Form(props)

  //Takes place after standard form validation and PreventDefault
  
  if (auth.getCurrentUser())
    return <Navigate to='/'/>
  return (
    <div className="w-100 vh-100 d-flex justify-content-center align-items-center">
      <form className="w-25" onSubmit={handleSubmit}>
        <h3 className="fw-bold text-center">Login</h3>
        {renderInput({label:'Username', name:'username', focused:true})}
        {renderInput({label:'Password',name:'password',type:"password"})}
        {renderButton('Login')}
      </form>
    </div>
  )
}

export default LoginForm