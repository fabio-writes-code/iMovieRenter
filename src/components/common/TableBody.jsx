import _ from 'lodash'

const TableBody = ({data, columns}) => {

  const renderCell=(item, columns)=>{
    if (columns.content) 
      return columns.content(item)
    if (columns.path==='isGold' || columns.path==='customer.isGold'){
      console.log(item, columns.path,_.get(item,columns.path))
      if (_.get(item,columns.path)) return 'Gold Membership'
      return 'Standard Membership'
    }
    return _.get(item, columns.path)
  }

  const createKey=(item,column)=>{
    return item._id + (column.path || column.key)
  }
  return (
    <tbody>
      {data.map(item=><tr key={item._id}>
        {columns.map(c=><td key={createKey(item,c)}>{renderCell(item, c)}</td>)}
      </tr>)}
    </tbody>
  )
}

export default TableBody