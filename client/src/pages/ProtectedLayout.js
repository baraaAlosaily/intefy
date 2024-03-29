import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAppContext } from '../context/appContext'

const ProtectedLayout = ({children}) => {
    const {user} =useAppContext();
    if(!user){
      console.log("first")
        return <Navigate to="/landing" />
    }
  return children
}

export default ProtectedLayout