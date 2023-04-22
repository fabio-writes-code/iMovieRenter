import Joi from 'joi-browser'
import Input from "./Input"
import Select from './Select'


const Form = (props) => {

  const {schema, onSubmit, data, setData, errors, setErrors}=props
  
  const validate = ()=>{

    //*Bruteforce basic solution not scalable
    // const errors={}
    // if (data.username.trim()==='')
    //   errors.username='Username is required'
    // if (data.password.trim()==='')
    //   errors.password='Password required'
    // return Object.keys(errors).length===0? {}:errors

    //*Validate with Joi

    const options={abortEarly:false}
    const result=Joi.validate(data, schema, options)
    if (!result.error) return null
    const errors={}
    // Map implementation, a for loop could've also work
    result.error.details.map(error=>errors[error.path[0]]=error.message)
    return errors
  }

  const validateProperty=({name,value})=>{

    //* Bruteforce basic function
    // if (name==='username'){
    //   if (value.trim()==='') return 'Username is required.'
    // }
    // if (name==='password'){
    //   if (value.trim()==='') return 'Password is required.'
    // }

    //*Joi validation
    const obj = {[name]:value} //new object to be validated
    const subschema={[name]:schema[name]} //subschema to validate against
    const {error}=Joi.validate(obj,subschema )
    if (!error) return null
    return error.details[0].message
  }

  const handleChange =(e)=>{

    //Validation on change
    const input=e.currentTarget
    const errProp={...errors}
    const errorMessage=validateProperty(input)
    if(errorMessage) errProp[input.name]=errorMessage
    else delete errProp[input.name]

    const acc ={...data}
    acc[e.target.name]=e.currentTarget.value
    setData(acc)
    setErrors(errProp)
  }
    
  const handleSubmit=(e)=>{
    e.preventDefault()
    //validation on submit
    const errors= (validate() || {})
    setErrors(errors)
    if(Object.keys(errors).length) return
    // console.log(errors)
    onSubmit()
  }

  const renderButton=(label)=>{
    // console.log('errors in button', validate())
    return (
      <button disabled={validate()===null?false:true} className="btn btn-primary mt-4 w-100" type="submit">
        {label}
      </button>
    )
  }


  const renderInput=({label,name,type="text",focused=false})=>{
    return(
      <Input 
        name={name} 
        label={label}
        type={type} 
        autoFocus={focused} 
        value={data[name]} 
        error={errors[name]} 
        onChange={handleChange}
      />
    )
  }

  const renderSelect=({label, name, options,focused=false})=>{
    return(
      <Select
        name={name}
        label={label}
        autoFocus={focused}
        value={data[name]}
        error={errors[name]}
        options={options}
        onChange={handleChange}
      />
    )
  }

  return {
    handleSubmit,
    renderButton,
    renderInput,
    renderSelect
  }
}

export default Form