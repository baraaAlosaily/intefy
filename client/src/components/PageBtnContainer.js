import React from 'react'
import { useAppContext } from '../context/appContext'
import {HiChevronDoubleLeft,HiChevronDoubleRight} from 'react-icons/hi'
import Wrapper from '../assets/wrappers/PageBtnContainer'

const PageBtnContainer = () => {
    const{numberOfPages,pages,changePage}=useAppContext(); 

    const page=Array.from({length:numberOfPages},(_,index)=>{
        return index+1
    });

    const nextPage=()=>{
        let newPage=pages+1
        if(newPage>numberOfPages){
          newPage=1;
        }
        changePage(newPage);
    }
    const prevPage=()=>{
      let newPage=pages-1
      if(newPage<1){
        newPage=numberOfPages;
      }
      changePage(newPage);
    }
  return (
    <Wrapper>
         <button className='prev-btn' onClick={prevPage}>
             <HiChevronDoubleLeft/>
             prev
         </button>
         <div className='btn-container'>
             {
                 page.map((pageNumber)=>{
                     return <button type='button' 
                     className={pageNumber===pages?'pageBtn active':'pageBtn'}
                     key={pageNumber}
                     onClick={()=>changePage(pageNumber)}
                     >
                         {pageNumber}
                     </button>
                 })
             }
         </div>
         <button className='next-btn' onClick={nextPage}>
             <HiChevronDoubleRight/>
             next
         </button>
    </Wrapper>
  )
}

export default PageBtnContainer