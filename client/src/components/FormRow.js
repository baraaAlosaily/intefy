import React from 'react'

const FormRow = ({type,name,value,handleChange,labelText,max,min}) => {
  return (

    <div className="form-raw">
        <label htmlFor={name} className='form-label'>
            {labelText||name}
        </label>
        <input type={type} value={value} name={name}  onChange={handleChange} className="form-input" max={max} min={min}/>
    </div>
  )
}

export default FormRow