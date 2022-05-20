import React from 'react'

const FormRowTextArea = ({type,name,value,handleChange,labelText}) => {
  return (
    <div className="form-raw">
    <label htmlFor={name} className='form-label'>
        {labelText||name}
    </label>
    <textarea type={type} value={value} name={name}  onChange={handleChange} className="form-input"/>
   </div>
  )
}

export default FormRowTextArea