
// Needs columns, sort and sortColumn

const TableHeader = ({columns, onSort, sortColumn}) => {
  const raiseSort=path=>{
    const sortedColumn={...sortColumn}
    if(sortedColumn.path===path)
      sortedColumn.order=(sortedColumn.order==='asc')?'desc':'asc'
    else{
      sortedColumn.path=path
      sortedColumn.order='asc'
    }
    onSort(sortedColumn)
  }

  //Render sort icon
  const renderSortIcon=(column)=>{
    if (column.path!==sortColumn.path) return null
    if (sortColumn.order==='asc') return <i className="fa fa-sort-asc"></i>
    return <i className="fa fa-sort-desc"></i>
  }

  return (
    <thead>
        <tr>
          {columns.map(c=>
            <th className="clickable" key={c.key?c.key:c.path} 
            onClick={()=>raiseSort(c.path)}>{c.label} {renderSortIcon(c)}</th>)}
        </tr>
      </thead>
  )
}

export default TableHeader