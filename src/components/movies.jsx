import React, { Component } from 'react';
// import {getMovies} from '../services/fakeMovieService'
import Pagination from './common/pagination';
import { paginate } from '../utils/paginate';
import ListGroup from './common/listGroup';
// import { getGenres } from '../services/fakeGenreService';
import MoviesTable from './moviesTable';
import _ from 'lodash'
import { Link } from 'react-router-dom';
import SearchBox from './SearchBox';
import { getGenres} from '../services/genreService'
import {getMovies, deleteMovie} from '../services/movieService'
import 'react-toastify/dist/ReactToastify.css';
import {toast} from 'react-toastify'

class Movies extends Component {
  state = {
    movies:[],
    pageSize:4,
    currentPage:1,
    genres:[],
    sortColumn:{path:'title',order:'asc'},
    searchString:''
  }

  async componentDidMount(){
    //Creating an array of all genres
    const {data}=await getGenres()
    // console.log('here', data)
    const genres=[{_id:'',name:'All Genres'},...data]
    const {data:movies}=await getMovies()
    this.setState({movies, genres:genres})
  }
  
  // format paragraph element
  formatCount(){
    const {movies}=this.state
    return movies.length===0?'No movies in database':`Showing ${movies.length} movies in the database`
  }

  formatLength(){
    return Array.isArray(this.state.movies)? 'true':'false'
  }

  handleDelete=async (movie)=>{

    console.log('Optimistic Delete')
    //Optimistic update to db
    const originalMovies=this.state.movies

    //Update UI
    const movies = originalMovies.filter(m=>m._id!==movie._id)
    this.setState({movies})

    try{
      await deleteMovie(movie._id)
    }
    catch (err){
      if (err.response && err.response.status===400){
        toast.error('Movie is not in database')
        console.log('Movie not in database')
      }
      this.setState({movies:originalMovies})
    }

  }

  handleLike=(movie)=>{
    //Creating a clone of the old database object
    //* Later on here we will call HTTP services to make changes permanent in the database through the back-end
    const movies=[...this.state.movies]
    const index=movies.indexOf(movie)
    movies[index]={...movies[index]}
    movies[index].liked=!movies[index].liked
    this.setState({movies})
  }

  noStock(title){
    const movies=this.state.movies.filter(m=>m.title!==title)
    this.setState({movies})
  }

  handlePageChange=page=>{
    this.setState({currentPage:page})
  }

  handleGenreSelect=genre=>{
    this.setState({selectedGenre:genre, currentPage:1})
    this.setState({searchString:''})
  }
  
  // handleSort receives the path to the target property
  //* Moved to movieTable component
  handleSort=sortColumn=>{
    this.setState({sortColumn})
  }

  getPagedData =()=>{
    const {pageSize, currentPage,selectedGenre, movies:allMovies, sortColumn, searchString}=this.state

    let filtered={}
    if (searchString)
      filtered=allMovies.filter(m=>m.title.toLowerCase().startsWith(searchString))
    else
      filtered=selectedGenre && selectedGenre._id? allMovies.filter(m=>m.genre._id === selectedGenre._id):allMovies
    const sorted= _.orderBy(filtered,[sortColumn.path],[sortColumn.order])
    const movies=paginate(sorted, currentPage, pageSize)

    return {totalCount:filtered.length, data:movies}
  }

  searchBar=(searchString)=>{
    searchString=searchString.toLowerCase()
    this.setState({searchString})
    this.setState({selectedGenre:null, currentPage:1})
  }

  render() {
    const {length:count}=this.state.movies;
    const {pageSize, currentPage, sortColumn}=this.state
    const {user}= this.props

    if(count===0)
      return <p>There are no movies in the database</p>

    const {totalCount, data:movies}=this.getPagedData()

    return (
      <div className='row'>
        <div className="col-3">
          <ListGroup 
            items={this.state.genres}
            selectedItem={this.state.selectedGenre}
            onItemSelect={this.handleGenreSelect}
          />
        </div>
        <div className="col">
          {user && < Link
            to='new'
            className="btn btn-primary"
            style={{marginBottom:20}}>
              New Movie
          </Link>}
          <SearchBox value={this.state.searchString} autoFocus={'enabled'} onChange={(query)=>this.searchBar(query)}/>
          <p>'Showing {totalCount} movies in the database'</p>
          <MoviesTable
            user={user}
            movies={movies}
            sortColumn={sortColumn}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />
          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
      
    );
  }
}
 
export default Movies;