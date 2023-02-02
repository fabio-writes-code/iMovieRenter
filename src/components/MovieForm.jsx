import  Joi from "joi-browser"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Form from "./common/Form"
import { getGenres } from "../services/genreService"
import { getMovie,saveMovie } from "../services/movieService"

const MovieForm = () => {
  // const genres=[...getGenres()]

  const [data, setData]=useState({
    title:'',
    genreId:'',
    numberInStock:'',
    dailyRentalRate:''
  })

  
  const [errors, setErrors]=useState({})
  const [genres,setGenres]=useState([])

  let {id}=useParams()

  const navigate=useNavigate()

  useEffect(  ()=>{

    async function fetchGenres(){
      //Populate genre select
      const {data:genres}=await getGenres()
      setGenres(genres)
    }

    fetchGenres()
    if(id==='new') return

    async function fetchData(id){
      //Retrieve info if movie already registered
      try{
        const {data:movie}=await getMovie(id)
        //map info to fields. Returns a mapped object and updated the state
        const mapForm=mapToViewModel(movie)
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

  const mapToViewModel=(movieInfo)=>{
    return {
      _id:movieInfo._id,
      title:movieInfo.title,
      genreId:movieInfo.genre._id,
      numberInStock:movieInfo.numberInStock,
      dailyRentalRate:movieInfo.dailyRentalRate,
    }
  }

  const doSubmit= async ()=>{
    // Two types of save, save new and update.
    // If movie._id is present, update
    const movie= saveMovie(data)
    console.log(movie);
    navigate('/movies')
    console.log('New movie registered')
  }

  const props={
    schema:{
      _id:Joi.string(),
      title:Joi.string().required().label('title'),
      genreId:Joi.string().required().label('genre'),
      numberInStock:Joi.number().required().min(1).max(100).label('Number in stock'),
      dailyRentalRate:Joi.number().required().min(0).max(10).label('Rate')
    },
    onSubmit:doSubmit,
    data, setData, errors, setErrors
  }


  
  const handleSave=(path)=>{
    navigate(path)
  }

  
  
  const {renderInput, renderButton,renderSelect, handleSubmit}=Form(props)

  return (
    <div className=" w-100 vh-100 d-flex justify-content-center align-items-center">
      <form className="w-50" onSubmit={handleSubmit}>
        <h1 align="center">Movie Form {id!=='new'?`-${id}`:''}</h1>
        {renderInput({label:'Title',name:'title',focused:true})}
        {renderSelect({label:'Genre', name:'genreId', options:genres})}
        {renderInput({label:'Number in Stock',name:'numberInStock'})}
        {renderInput({label:'Rate',name:'dailyRentalRate'})}
        {renderButton('Save')}
        {/* <button className="btn btn-primary" onClick={()=>handleSave('/movies')}>Save</button> */}

      </form>
    </div>
  )
}

export default MovieForm