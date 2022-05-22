import React from 'react'
import Wrapper from '../assets/wrappers/StatsContainer'
import StatsItem from './StatsItem'
import { useAppContext } from '../context/appContext'
import {IoLogoJavascript} from 'react-icons/io'
import {FaPython,FaJava,FaDatabase,FaMobileAlt} from 'react-icons/fa'
import {SiDotnet} from 'react-icons/si'
import {MdOutlineSecurity} from 'react-icons/md'
import {HiCollection} from 'react-icons/hi'

const StatusCourseType = () => {
  const {defaultCourseTypeStats} =useAppContext();
  const defaultStats = [
    {
      title: 'javascript',
      count:defaultCourseTypeStats&& defaultCourseTypeStats.javascript || 0,
      icon: <IoLogoJavascript />,
      color: '#8C2F5E',
      bcg: '#F3DDE8',
    },
    {
      title: 'python',
      count:defaultCourseTypeStats&& defaultCourseTypeStats.python || 0,
      icon: <FaPython />,
      color: '#8C2F5E',
      bcg: '#F3DDE8',
    },
    {
      title: 'dotnet',
      count:defaultCourseTypeStats&& defaultCourseTypeStats.dotnet || 0,
      icon: <SiDotnet />,
      color: '#8C2F5E',
      bcg: '#F3DDE8',
    },
    {
      title: 'java',
      count:defaultCourseTypeStats&& defaultCourseTypeStats.java || 0,
      icon: <FaJava />,
      color: '#8C2F5E',
      bcg: '#F3DDE8',
    },
    {
      title: 'cybersecurity',
      count:defaultCourseTypeStats&& defaultCourseTypeStats.cybersecurity || 0,
      icon: <MdOutlineSecurity />,
      color: '#8C2F5E',
      bcg: '#F3DDE8',
    },
    {
      title: 'datavisualization',
      count:defaultCourseTypeStats&& defaultCourseTypeStats.datavisualization || 0,
      icon: <FaDatabase />,
      color: '#8C2F5E',
      bcg: '#F3DDE8',
    },
    {
      title: 'mobiledevelopment',
      count:defaultCourseTypeStats&& defaultCourseTypeStats.mobiledevelopment || 0,
      icon: <FaMobileAlt />,
      color: '#8C2F5E',
      bcg: '#F3DDE8',
    },
    {
      title: 'others',
      count:defaultCourseTypeStats&& defaultCourseTypeStats.others || 0,
      icon: <HiCollection />,
      color: '#8C2F5E',
      bcg: '#F3DDE8',
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

export default StatusCourseType