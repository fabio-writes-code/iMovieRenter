import { useState } from "react"

// input: user click
// output: filter, change list color

const ListGroup = (props) => {
  const {items:genres,textProperty, valueProperty,selectedItem, onItemSelect, customerGroup}=props
  
  const [currentGenre, setCurrentGenre]=useState(genres[0].name)

  // const handleClick=(genre)=>{
  //   if(genre==='allGenre'){
  //     setCurrentGenre(genre)
  //     return
  //   }
  //   setCurrentGenre(genre.name)
  // }

  const groupSelection = (group) =>{
    if(customerGroup){
      for (const k of genres) {
        if(group[textProperty]==selectedItem[textProperty]) return true
      }
    }
    else{
      for (const genre of genres) {
        if(group===selectedItem) return true
      }
    }
  }

  return (
    <div>
      <ul className="list-group" style={{cursor:"pointer"}}>
        {/* <li 
          className={`list-group-item ${currentGenre==='allGenre'?'active':''}`}
          onClick={()=>handleClick('allGenre')}>All Genres
        </li> */}
        {genres.map(g=><li 
          onClick={()=>onItemSelect(g)}
          // className={g===selectedItem?'list-group-item active':'list-group-item'}
          className={groupSelection(g)?'list-group-item active':'list-group-item'} 
          key={g[valueProperty]}>{g[textProperty]}
        </li>)}
      </ul>
    </div>
  )
}

ListGroup.defaultProps={
  //Adds props and default values
  textProperty:"name",
  valueProperty:'_id'
}

export default ListGroup