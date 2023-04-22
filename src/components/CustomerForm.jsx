import React from 'react'
import  Joi from "joi-browser"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Form from "./common/Form"
import { getGenres } from "../services/genreService"
import { getMovie,saveMovie } from "../services/movieService"
import { getCustomer, getCustomers, saveCustomer } from '../services/customerService'

const CustomerForm = () => {
  const [data, setData]=useState({
    isGold:'',
    name:'',
    phone:'',
  })
  
  const [errors, setErrors]=useState({})

  let {id}=useParams()

  const navigate=useNavigate()

  useEffect(  ()=>{

    if(id==='new') return

    async function fetchData(id){
      //Retrieve info if movie already registered
      try{
        const {data:customer}=await getCustomer(id)
        //map info to fields. Returns a mapped object and updated the state
        const mapForm=mapToViewModel(customer)
        setData(mapForm)
      }
      catch (err){
        if(err.response){
          navigate('/not-found')
          return
        }
      }
    }
    fetchData(id)
  },[])

  const mapToViewModel=(customerInfo)=>{
    return {
      _id:customerInfo._id,
      name:customerInfo.name,
      phone:customerInfo.phone,
    }
  }

  const doSubmit= async ()=>{
    // Two types of save, save new and update.
    // If movie._id is present, update
    const customer= saveCustomer(data)
    console.log(customer);
    navigate('/customers')
    console.log('New movie registered')
  }

  const props={
    schema:{
      _id:Joi.string(),
      name:Joi.string().required().min(5).max(50).label('name'),
      phone:Joi.string().required().min(9).max(10).label('phone'),
      isGold:Joi.required().label('Gold Member')
    },
    onSubmit:doSubmit,
    data, setData, errors, setErrors
  }


  
  const handleSave=(path)=>{
    navigate(path)
  }

  
  
  const {renderInput, renderButton,renderSelect, handleSubmit}=Form(props)

  const goldOptions=[
    {
      _id:true,
      name:'Gold Member'
    },
    {
      _id:false,
      name:'Standard Member'
    }
  ]

  return (
    <div className=" w-100 vh-100 d-flex justify-content-center align-items-center">
      <form className="w-50" onSubmit={handleSubmit}>
        <h1 align="center">Customer Form {id!=='new'?`-${id}`:''}</h1>
        {renderInput({label:'Name',name:'name',focused:true})}
        {renderSelect({label:'Gold Member', name:'isGold', options:goldOptions})}
        {renderInput({label:'Phone',name:'phone'})}
        {renderButton('Save')}
        {/* <button className="btn btn-primary" onClick={()=>handleSave('/movies')}>Save</button> */}

      </form>
    </div>
  )
}

export default CustomerForm