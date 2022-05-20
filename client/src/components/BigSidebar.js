import React from 'react'
import Wrapper from '../assets/wrappers/BigSidebar'
import Logo from './Logo'
import { useAppContext } from '../context/appContext'
import NavLinks from './NavLinks'

const BigSidebar = () => {
    const {showSideBar}=useAppContext();
  return (
    <Wrapper>
        <div className={
            showSideBar? 'sidebar-container':'sidebar-container show-sidebar'
        }>
            <div className='content'>
                <header>
                    <Logo/>
                </header>
                <NavLinks />
            </div>
        </div>
    </Wrapper>
  )
}

export default BigSidebar