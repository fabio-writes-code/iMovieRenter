
import { useEffect, useState } from "react"
import Pagination from "./common/pagination"
import { paginate } from "../utils/paginate"
import ListGroup from "./common/listGroup"

import _ from 'lodash'
import { Link } from "react-router-dom"
import SearchBox from "./SearchBox"

//backend services
import {getCustomers, deleteCustomer} from '../services/customerService'
import {getMovies} from '../services/movieService'
import 'react-toastify/dist/ReactToastify.css'
import { toast } from "react-toastify"
import CustomersTable from "./CustomersTable"
import { getRentals } from "../services/rentalsService"
import RentalsTable from "./RentalsTable"

const Rentals = ({user}) => {
  //data state
  const [customersData, setcustomersData]=useState([])
  const [movieData, setMovieData]=useState([])
  const [rentalsData, setRentalsData]=useState([])
  const [dateOut, setDateOut]=useState()
  const [dayReturned, setDayReturned]=useState()
  const [rentalFee, setRentalFee]=useState(0)

  //table state
  const [sortColumn, setSortColumn]=useState({path:'name',order:'asc'})
  const [searchString, setSearchString]=useState('')
  const [currentPage, setCurrentPage]=useState(1)
  const [selectedPlan, setSelectedPlan]=useState({})
  const pageSize=4;

  const membershipPlans=[
    {
      _id:'',
      name:'All Plans'
    },
    {
      _id:1,
      name:'Gold Membership'
    },
    {
      _id:2,
      name:'Standard Membership'
    }
  ]

  //Get customer Data
  useEffect(()=>{

    async function fetchCustomer(){
      const{data:customers}=await getCustomers()
      setcustomersData(customers)
    }

    async function fetchMovies(){
      const {data:movies} = await getMovies()
      setMovieData(movies)
    }

    async function fetchRentals(){
      const{data:rentals}=await getRentals()
      setRentalsData(rentals)
    }

    fetchCustomer()
    fetchMovies()
    fetchRentals()
  },[])
  

  const formatCount=()=>{
    return rentalsData.length===0?'No customers in database':`Showing ${rentalsData.length} customers in database`
  }

  const getPageddata=()=>{
    let filtered={}
    let isGold=false;
    if (searchString)
      filtered=rentalsData.filter(c=>c.name.toLowerCase().startsWith(searchString))
    else{
      if (selectedPlan.name==='Gold Membership') isGold=true
      else isGold=false
      filtered=selectedPlan && selectedPlan._id?rentalsData.customersData.filter(c=>c.isGold === isGold):rentalsData
    }
    const sorted=_.orderBy(filtered,[sortColumn.path],[sortColumn.order])
    const rentals=paginate(sorted, currentPage, pageSize)

  
    return {totalCount:filtered.length,data:rentals}
  }

  const handlePlanSelect=plan=>{
    setSelectedPlan(plan)
    setSearchString('')
  }

  const searchBar=(searchString)=>{
    searchString=searchString.toLowerCase()
    setSearchString(searchString)
    setCurrentPage(1)
  }

  //Event Handlers
  const handleDelete=()=>{
    console.log('delete')
  }

  const handleSort=sortColumn=>{
    setSortColumn(sortColumn)
  }

  const handlePageChange = page =>{
    setCurrentPage(page)
  }

  //Rendering
  const {totalCount,data:rentals}=getPageddata()

  if(rentals.length===0)
    return (
      <>
        <p>No customers available in database</p>  
        {user && <Link
          to='new'
          className="btn btn-primary"
          style={{marginBotton:20}}>
            Register Rental
        </Link>}
      </>
    )

  return (
    <div className="row">
      <div className="col-3">
        <ListGroup
          items={membershipPlans}
          selectedItem={selectedPlan}
          onItemSelect={handlePlanSelect}
          customerGroup={true}
        />
      </div>
      <div className="col">
        {user && <Link
          to='new'
          className="btn btn-primary"
          style={{marginBotton:20}}>
            Register Rental
        </Link>}
        <SearchBox value={searchString} autoFocus={'enabled'} onChange={query=>searchBar(query)}/>
        <p>Showing {totalCount} rentals in database</p>
        <RentalsTable
          user={user}
          rentals={rentals}
          sortColumn={sortColumn}
          onDelete={handleDelete}
          onSort={handleSort}
        />
        <Pagination
          itemsCount={totalCount}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  )
}

export default Rentals