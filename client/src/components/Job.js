import React from 'react'
import moment from 'moment'
import {FaLocationArrow,FaBriefcase,FaCalendarAlt,FaLanguage,FaBrain,FaCode} from 'react-icons/fa'
import {GrLanguage} from 'react-icons/gr'
import {FcBookmark} from 'react-icons/fc'
import { Link } from 'react-router-dom'
import { useAppContext } from '../context/appContext'
import Wrapper from '../assets/wrappers/Job'
import JobInfo from './JobInfo'

const Job = ({_id,studentFirstName,
  studentSecondName,
  createdAt,
  logicMark,
  englishMark,
  codingMark,
  englishTest,
  result,
  status,
  interviewLocation,
  courseType,
  note}) => {
    const {setEditJob,deleteJob} =useAppContext();
    let date=moment(createdAt);
    date=date.format('MMM Do,YYYY')
  return (
   <Wrapper>
     <header>
     <div className='main-icon'>{courseType.charAt(0)+courseType.charAt(1)}</div>
     <div className="info">
       <h5>{studentFirstName+" "+studentSecondName}</h5>
       <p>{courseType}</p>
     </div>
     </header>
     <div className='content'>
       <div className='content-center'>
         <JobInfo icon={<FaLocationArrow/>} text={interviewLocation} />
         <JobInfo icon={<FaCalendarAlt/>} text={date} />
         <JobInfo icon={<FaLanguage/>} text={englishTest} />
         <JobInfo icon={<FaBriefcase/>} text={result} />
       </div>
        <div className='content-margin'>
           <h5>TA Evaluation</h5>
           <div className='content-center'>
           <JobInfo icon={<GrLanguage/>} text={englishMark} />
           <JobInfo icon={<FaBrain/>} text={logicMark} />
           <JobInfo icon={<FaCode/>} text={codingMark} />
           <JobInfo icon={<FcBookmark/>} text={result} />
           </div>  
           <div className={`status ${status} content-margin`}>{status}</div>
        </div>
     <footer>
       <div className='actions'>
       <Link to="/add-interview"
        className='btn edit-btn'
        onClick={()=>setEditJob(_id)}
        >
         Edit
       </Link>
       <button type='button' className='btn delete-btn' onClick={()=>deleteJob(_id)}>
         Delete
       </button>
       </div>
     </footer>
     </div>
   </Wrapper>

  )
}

export default Job