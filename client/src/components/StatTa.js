import React from 'react'
import Wrapper from '../assets/wrappers/StatTa'
import {FaUserAlt} from 'react-icons/fa'
import {IoCheckmarkDoneCircle} from 'react-icons/io5'

const StatTa = ({_id,count}) => {
  return (
    <Wrapper>
      <header>
        <div className='iconName' ><FaUserAlt/></div>
        <span className='name'>{_id}</span>
      </header>      
      <header>
        <div className='iconCount' ><IoCheckmarkDoneCircle/></div>
        <span className='count'>{count}</span>
      </header>      
    </Wrapper>
  )
}

export default StatTa