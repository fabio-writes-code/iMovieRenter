import { Link } from "react-router-dom"
import Table from "./common/Table"

const CustomersTable = ({user, customers, sortColumn,onSort, onDelete}) => {
  const columns=[
    {
      path:'name',
      label:'Name',
      content:customer=><Link to={`/customers/${customer._id}`}>{customer.name}</Link>
    },
    {path:'phone',label:'Phone'},
    {path:'isGold',label:'Gold Memebership'    },
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
      data={customers}
      sortColumn={sortColumn}
      onSort={onSort}
    />
  )
}

export default CustomersTable