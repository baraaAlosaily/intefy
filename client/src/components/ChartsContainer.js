import React, { useState } from 'react'


import BarChartComponent from './BarChartComponent'
import AreaChartComponent from './AreaChartComponent'
import { useAppContext } from '../context/appContext'
import Wrapper from '../assets/wrappers/ChartsContainer'

const ChartsContainer = () => {
  const {monthlyApplication : data}=useAppContext();
  const [barChart, setBarChart] = useState(true)
  const handleChange=(barChart)=>{
    if(barChart===true){
      setBarChart(false);
    }else{
      setBarChart(true);
    }
  }
  return (
    <Wrapper>
      <h4>Monthly Applications</h4>
      <button type='button' onClick={()=>handleChange(barChart)}>{
       !barChart?'Area chart' : 'Bar chart'
       }
      </button>
      {
        barChart?
        <BarChartComponent data={data}/>:
        <AreaChartComponent data={data}/>
      }
    </Wrapper>
  )
}

export default ChartsContainer