import React from 'react'

const Select = ({name, label, error,options, ...rest}) => {
  const count=['one','two','three']
  let i=0
  // console.log('rest',rest)
  return (
    <div className='form-group'>
      <label htmlFor={name}>{label}</label>
      <select name={name} id={name} {...rest} className="form-control">
        <option value=''/>
          {options.map(op=><option key={op._id} value={op._id}>{op.name}</option>)}
      </select>
      {error && <div className='alert alert-danger'>{error}</div>}
    </div>
  )
}

export default Select