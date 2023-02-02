import React from 'react'

const SearchBox = ({value, onChange, autoFocus}) => {
  return (
    <input 
      type="text"
      autoFocus={autoFocus}
      className="form-control my-3" 
      name="query" 
      placeholder="Search..." 
      value={value} 
      onChange={e=>onChange(e.currentTarget.value)}
    />
  )
}

export default SearchBox