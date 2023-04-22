import React from 'react'
import  Joi from "joi-browser"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Form from "./common/Form"
import { getGenres } from "../services/genreService"
import { getMovie,saveMovie } from "../services/movieService"
import { getCustomer, getCustomers, saveCustomer } from '../services/customerService'
import { getMovies } from '../services/movieService'
import { getRental, saveRental } from '../services/rentalsService'

const RentalsForm = () => {
  const [data, setData]=useState({
    customerId:'',
    movieId:'',
    // dateOut:'',
    // rentalFee:'',
  })

  const [customersData, setcustomersData]=useState([])
  const [movieData, setMovieData]=useState([])
  
  const [errors, setErrors]=useState({})

  let {id}=useParams()

  const navigate=useNavigate()

  //Retrieve movies and customers
  useEffect(()=>{
    async function fetchCustomer(){
      const{data:customers}=await getCustomers()
      setcustomersData(customers)
    }

    async function fetchMovies(){
      const {data:movies} = await getMovies()
      setMovieData(movies)
    }

    fetchCustomer()
    fetchMovies()
  },[])

  // Retrieve rental if Id present
  useEffect(  ()=>{
    if(id==='new') return

    async function fetchData(id){
      //Retrieve info if movie already registered
      try{
        const {data:rental}=await getRental(id)
        //map info to fields. Returns a mapped object and updated the state
        const mapForm=mapToViewModel(rental)
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

  const mapToViewModel=(rentalInfo)=>{
    return {
      _id:rentalInfo._id,
      customerName:rentalInfo.customerName,
      movieTitle:rentalInfo.movieTitle,
    }
  }

  const doSubmit= async ()=>{
    const rental= saveRental(data)
    console.log(rental);
    navigate('/rentals')
  }

  const props={
    schema:{
      _id:Joi.string(),
      customerId:Joi.string().required().label('Customer Name'),
      movieId: Joi.string().required().label('Movie Title'),
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
        <h1 align="center">Register New Rental {id!=='new'?`-${id}`:''}</h1>
        {/* {renderInput({label:'Date ',name:'dateOut',focused:true, type:'datetime-local'})} */}
        {renderSelect({label:'Customer', name:'customerId', options:customersData})}
        {renderSelect({label:'Movie', name:'movieId', options:movieData})}
        {/* {renderInput({label:'Fee',name:'rentalFee', type:'number', step:'any'})} */}
        {renderButton('Save')}
        {/* <button className="btn btn-primary" onClick={()=>handleSave('/movies')}>Save</button> */}

      </form>
    </div>
  )
}

export default RentalsForm