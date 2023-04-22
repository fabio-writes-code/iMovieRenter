import React from 'react'
import Table from './common/Table'
import { Link } from 'react-router-dom'

const RentalsTable = ({user, rentals, sortColumn,onSort, onDelete}) => {
  const columns=[
    {
      path:'dateOut',
      label:'Rental Date'
    },
    {
      path:'movie.title',
      label:'Movie Title',
      content:rentals=><Link to={`/movies/${rentals.movie._id}`}>{rentals.movie.title}</Link>
    },
    {
      path:'customer.name',
      label:'Customer Name',
      content:rentals => <Link to={`/customer/${rentals.customer._id}`}>{rentals.customer.name}</Link>
    },
    {path:'customer.isGold',label:'Gold Memebership'    },
  ]

  if(user && user.isAdmin){
    columns.push({
      key:'delete',
      content: customer=> <button onClick={()=>onDelete(customer)} className="btn btn-danger btn-sm">Delete</button>
    })
  }

  return (
    <Table
      columns={columns}
      data={rentals}
      sortColumn={sortColumn}
      onSort={onSort}
    />
  )
}

export default RentalsTable