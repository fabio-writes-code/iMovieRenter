import TableBody from './TableBody';
import TableHeader from './TableHeader';

const Table = ({columns, sortColumn, onSort, data}) => {
  return (
    <table className="table">
      <TableHeader 
        columns={columns}
        sortColumn={sortColumn}
        onSort={onSort}/>
      <TableBody 
        data={data} 
        columns={columns}
      />
    </table>
  )
}

export default Table