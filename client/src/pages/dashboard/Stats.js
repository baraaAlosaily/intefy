import React,{useEffect} from 'react'
import { useAppContext } from '../../context/appContext'
import { StatsContainer ,ChartsContainer } from '../../components'
import Loading from '../../components/Loading'
import StatsCityContainer from '../../components/StatsCityContainer'
import StatsTeacherAssistant from '../../components/StatsTeacherAssistant'
import StatusCourseType from '../../components/StatusCourseType'

const Stats = () => {
  const {isLoading,monthlyApplication,showStats}=useAppContext();

  useEffect(() => {
    showStats();
  }, []);

  if(isLoading){
    return <Loading center/>
  }
  return (
    <>
    <div style={{textAlign:"center"}}>
       <h4 >Teacher Assistant stats</h4>
    </div>
    <StatsTeacherAssistant/>
    <div style={{textAlign:"center",marginTop:"2rem"}}>
       <h4 >courses stats</h4>
    </div>
    <StatusCourseType/>
    <div style={{textAlign:"center",marginTop:"2rem"}}>
       <h4>cities stats</h4>
    </div>
    <StatsCityContainer/>
    <div style={{textAlign:"center",marginTop:"2rem"}}>
       <h4>interview stats</h4>
    </div>
    <StatsContainer/>
    {monthlyApplication.length>0 && <ChartsContainer/>}
    </>
  )
}

export default Stats