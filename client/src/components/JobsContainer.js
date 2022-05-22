import React from 'react'
import { useAppContext } from '../context/appContext'
import { useEffect } from 'react'
import Loading from './Loading'
import Job from './Job'
import Wrapper from '../assets/wrappers/JobsContainer'
import PageBtnContainer from './PageBtnContainer'


const JobsContainer = () => {
    const {getInterviews,interviews,isLoading,pages,totalInterviews,search,searchStatus,courseType,locationType,sort,numberOfPages,
        adminInterviews,
        adminTotalInterviews,
        adminNumberOfPages,
        getAdminInterviews,
        user
    }=useAppContext();
    useEffect(() => {
        if(user&&user.isAdmin){
            getAdminInterviews();
        }else{
            getInterviews();
        }
    }, [search,searchStatus,courseType,locationType,sort,pages])

    if(isLoading){
        return <Loading center/>
    }

    if(user&&user.isAdmin?adminInterviews.length===0:interviews.length===0){
        return (
            <Wrapper>
                <h2>No jobs to display...</h2>
            </Wrapper>
        )
    }
    
  return (
      <Wrapper>
         <h5>{(user&&user.isAdmin)?adminTotalInterviews:totalInterviews} interview{((user&&user.isAdmin)?adminInterviews.length:interviews.length)>1 && 's'} found</h5>
         <div className="jobs">
             {user&&user.isAdmin?adminInterviews.map((interview)=>{
                 return <Job key={interview._id}{...interview}/>
             }):interviews.map((interview)=>{
                 return <Job key={interview._id}{...interview}/>
             })}
         </div>
        {(((user&&user.isAdmin)?adminNumberOfPages:numberOfPages)>1)&&<PageBtnContainer/>} 
      </Wrapper>
  )
}

export default JobsContainer