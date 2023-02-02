import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import Like from './common/like';
import Table from './common/Table';


const MoviesTable = ({movies, onDelete, onLike, sortColumn, onSort, user}) => {

  const columns=[
    {
      path:'title',
      label:'Title',
      content:movie=><Link to={`/movies/${movie._id}`}>{movie.title}</Link>
    },
    {path:'genre.name',label:'Genre'},
    {path:'numberInStock',label:'Stock'},
    {path:'dailyRentalRate',label:'Rate'},
    {
      key:'like',
      content: movie=> <Like liked={movie.liked} onClick={()=>onLike(movie)}/>
     },
  ]

  //* Add delete button only for admins
  if(user && user.isAdmin){
    columns.push({
      key:'delete',
      content: movie=> <button onClick={()=>onDelete(movie)} className="btn btn-danger btn-sm">Delete</button>
    })
  }


  return (
    <Table 
      columns={columns} 
      data={movies} 
      sortColumn={sortColumn}
      onSort={onSort}
    />
    // Both table header and body were moved to individual components
  );
}
 
export default MoviesTable ;
