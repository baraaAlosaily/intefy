import React from 'react'
import StatsItem from './StatsItem'
import { useAppContext } from '../context/appContext'
import { FaSuitcaseRolling,FaCalendarCheck,FaBug } from 'react-icons/fa';
import { VscPassFilled } from 'react-icons/vsc';
import Wrapper from '../assets/wrappers/StatsContainer';

const StatsContainer = () => {
   const{stats}=useAppContext();
   const defaultStats = [
    {
      title: 'pending interviews',
      count: stats.pending || 0,
      icon: <FaSuitcaseRolling />,
      color: '#e9b949',
      bcg: '#fcefc7',
    },
    {
      title: 'retake interviews',
      count: stats.retake || 0,
      icon: <FaCalendarCheck />,
      color: '#647acb',
      bcg: '#e0e8f9',
    },
    {
      title: 'failed interviews',
      count: stats.failed || 0,
      icon: <FaBug />,
      color: '#d66a6a',
      bcg: '#ffeeee',
    },
    {
      title: 'pass interviews',
      count: stats.pass || 0,
      icon: <VscPassFilled />,
      color: '#66CC00',
      bcg: '#E5FFCC',
    }
  ]
  return (
    <Wrapper>
       {
           defaultStats.map((item,index)=>{
               return <StatsItem key={index} {...item} />
           })
       }
    </Wrapper>
  )
}

export default StatsContainer