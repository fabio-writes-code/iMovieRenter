import { useEffect, useState } from "react"
import Pagination from "./common/pagination"
import { paginate } from "../utils/paginate"
import ListGroup from "./common/listGroup"

import _ from 'lodash'
import { Link } from "react-router-dom"
import SearchBox from "./SearchBox"

//backend services
import {getCustomers, deleteCustomer} from '../services/customerService'
import 'react-toastify/dist/ReactToastify.css'
import { toast } from "react-toastify"
import CustomersTable from "./CustomersTable"


const Customers = ({user}) => {
  const [customersData, setcustomersData]=useState([])
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
    fetchCustomer()
  },[])
  
  

  const formatCount=()=>{
    return customersData.length===0?'No customers in database':`Showing ${customersData.length} customers in database`
  }

  const getPageddata=()=>{
    let filtered={}
    let isGold=false;
    if (searchString)
      filtered=customersData.filter(c=>c.name.toLowerCase().startsWith(searchString))
    else{
      if (selectedPlan.name==='Gold Membership') isGold=true
      else isGold=false
      filtered=selectedPlan && selectedPlan._id?customersData.filter(c=>c.isGold === isGold):customersData
    }
    const sorted=_.orderBy(filtered,[sortColumn.path],[sortColumn.order])
    const customers=paginate(sorted, currentPage, pageSize)

  
    return {totalCount:filtered.length,data:customers}
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
    console.log(sortColumn)
    setSortColumn(sortColumn)
  }

  //Rendering
  const {totalCount,data:customers}=getPageddata()

  if(customers.length===0)
    return (
      <>
        <p>No customers available in database</p>  
        {user && <Link
          to='new'
          className="btn btn-primary"
          style={{marginBotton:20}}>
            New Customer
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
            New Customer
        </Link>}
        <SearchBox value={searchString} autoFocus={'enabled'} onChange={query=>searchBar(query)}/>
        <p>Showing {totalCount} customers in database</p>
        <CustomersTable
          user={user}
          customers={customers}
          sortColumn={sortColumn}
          onDelete={handleDelete}
          onSort={handleSort}
        />
      </div>
    </div>
  )
}

export default Customers