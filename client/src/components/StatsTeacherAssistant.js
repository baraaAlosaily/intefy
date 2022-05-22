import React from 'react'
import Wrapper from '../assets/wrappers/StateConteinerSmall'
import { useAppContext } from '../context/appContext'
import StatTa from './StatTa'
const StatsTeacherAssistant = () => {
  const {usersStats} =useAppContext();
  console.log(usersStats)
  return (
    <Wrapper>
       {
         usersStats&&usersStats.map((item,index)=>(
           <StatTa key={index} {...item}/>
         ))
       }
    </Wrapper>
  )
}

export default StatsTeacherAssistant