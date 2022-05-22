import React from 'react'
import { NavLink } from 'react-router-dom'
import { useAppContext } from '../context/appContext'

import {links} from '../utils/links'
import { linksAdmin } from '../utils/links'
const NavLinks = ({toggleSideBar}) => {
  const {user}=useAppContext();
  return (
    <div className='nav-links'>
    {
      user&&user.isAdmin?linksAdmin.map((item)=>{
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
      }):
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