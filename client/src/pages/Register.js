import { React, useState, useEffect } from "react";
import Wrapper from "../assets/wrappers/RegisterPage";
import { FormRow,Logo,Alert, FormRowSelect } from "../components";
import { useAppContext } from "../context/appContext";
import { useNavigate } from "react-router-dom";


const initailState = {
  name: "",
  email: "",
  password: "",
  lastName:"",
  location:"Amman",
  isMember: true,
};

const Register = () => {
  const [values, setValues] = useState(initailState);
  // global state and usenavigation
  const navigate=useNavigate();

  const {user,isLoading,showAlert,displayAlert,setupUser,locationOption}= useAppContext();

  const toggeleMember=()=>{
      setValues({...values,isMember:!values.isMember})
  }

  const handleChange = (e) => {
    setValues({...values,[e.target.name]:e.target.value})
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const{name,password,email,location,lastName,isMember}=values;
    if(!email||!password||(!isMember&&!name&&!location&&!lastName)){
      displayAlert();
      return
    }
    const currentUser={name,password,email,location,lastName}

    let setUpUserObj;

    if(isMember){
      setUpUserObj={
        currentUser:currentUser,
        endPoint:"login",
        alertText:'Login Successfully! Redirecting...'
      }
      setupUser(setUpUserObj);
    }else{
      setUpUserObj={
        currentUser:currentUser,
        endPoint:"register",
        alertText:'User Create! Redirecting...'
      }
      setupUser(setUpUserObj)
    }
  };

  useEffect(() => {
    if(user){
      setTimeout(() => {
        navigate('/')
      }, 3000);
    }
  }, [user,navigate])
  
  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={onSubmit}>
        <Logo />
        <h3>{values.isMember?"Login":"Register"}</h3>
        {
            showAlert && <Alert/>
        }
        {/* name input */}
        {
            !values.isMember &&
            <FormRow type="text" name="name" 
            value={values.name}
            handleChange={handleChange}/>
        }
        {
            !values.isMember &&
            <FormRow type="text" name="lastName" 
            value={values.lastName}
            handleChange={handleChange}/>
        }

        {
            !values.isMember &&
            <FormRowSelect
               value={values.location}
               handleChange={handleChange}
               Options={locationOption}
               labelText="location"
               name="location"
        />
        }

 

        {/* email input*/}
        <FormRow type="email" name="email" 
        value={values.email}
        handleChange={handleChange}/>

        {/* password input */}
        <FormRow type="password" name="password" 
        value={values.password}
        handleChange={handleChange}/>

        <button type='submit' className='btn btn-block'
         disabled={isLoading}>
            submit
        </button>
        <p>
            {
                values.isMember?'Not a member yet ?':'Already a member ?'
            }
            <button type="button" onClick={toggeleMember} className="member-btn">{
                values.isMember?'Register':'Login'
            }</button>
        </p>
      </form>
    </Wrapper>
  );
};

export default Register;
