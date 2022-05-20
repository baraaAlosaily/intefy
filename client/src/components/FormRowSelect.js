import React from 'react'

const FormRowSelect = ({value,handleChange,Options,labelText,name}) => {
  return (
    <div className="form-row">
    <label htmlFor={name} className="form-label">
      {labelText}
    </label>
    <select
    name={name}
    value={value}
    onChange={handleChange}
    className='form-select'
    >
      {
        Options.map((itemValue,index)=>{
          return(
            <option value={itemValue} key={index}>
              {itemValue}
            </option>
          )
        })
      }

    </select>
   </div>
  )
}

export default FormRowSelect