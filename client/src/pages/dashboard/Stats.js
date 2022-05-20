import React,{useEffect} from 'react'
import { useAppContext } from '../../context/appContext'
import { StatsContainer ,ChartsContainer } from '../../components'
import Loading from '../../components/Loading'

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
    <StatsContainer/>
    {monthlyApplication.length>0 && <ChartsContainer/>}
    </>
  )
}

export default Stats