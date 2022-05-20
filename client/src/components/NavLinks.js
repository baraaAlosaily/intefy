import React from 'react'
import { NavLink } from 'react-router-dom'

import links from '../utils/links'
const NavLinks = ({toggleSideBar}) => {
  return (
    <div className='nav-links'>
    {
      links.map((item)=>{
         const {text,path,id,icon}=item;
         return <NavLink
         className={({isActive})=>isActive?'nav-link active':'nav-link'}
         to={path}
         key={id}
         onClick={toggleSideBar}
         >
         <span className='icon'>{icon}</span>
         {text}
         </NavLink>
      })
    }
  </div>
  )
}

export default NavLinks