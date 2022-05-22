import React from 'react'
import Wrapper from '../assets/wrappers/StateContainerMeduim'
import { useAppContext } from '../context/appContext'
import { FaCity } from 'react-icons/fa';
import { GiVillage } from 'react-icons/gi';
import StatsItem from './StatsItem';

const StatsCityContainer = () => {
const {defaultCityStats} =useAppContext();
const defaultStats = [
  {
    title: 'amman',
    count:defaultCityStats&& defaultCityStats.Amman || 0,
    icon: <FaCity />,
    color: '#647acb',
    bcg: '#e0e8f9',
  },
  {
    title: 'irbid',
    count:defaultCityStats&& defaultCityStats.Irbid || 0,
    icon: <GiVillage />,
    color: '#d66a6a',
    bcg: '#ffeeee',
  },
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

export default StatsCityContainer