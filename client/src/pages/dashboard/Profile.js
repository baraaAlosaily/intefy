import React,{useState} from 'react';
import { FormRow,Alert } from '../../components';
import { useAppContext } from '../../context/appContext';
import Wrapper from '../../assets/wrappers/DashboardFormPage';


const Profile = () => {
  const {user,showAlert,displayAlert,updateUser,isLoading}=useAppContext();

  const [name, setName] = useState(user?.name);
  const [lastName, setLastName] = useState(user?.lastName);
  const [email, setEmail] = useState(user?.email);
  const [location, setLocation] = useState(user?.location);

  const handleSubmit=(e)=>{
    e.preventDefault();
    if(!name || !email || !lastName || !location){
      displayAlert();
      return;
    }
    updateUser({name,email,lastName,location})
  }

  return <Wrapper>
    <form action="form" onSubmit={handleSubmit}>
      <h3>profile</h3>
      {showAlert&&<Alert/>}
      <div className="form-center">
        <FormRow type="text"
         name="name" 
         value={name}
         labelText="name"
         handleChange={(e)=>setName(e.target.value)}/>
        <FormRow type="text"
         name="lastName" 
         value={lastName}
         labelText="Last Name"
         handleChange={(e)=>setLastName(e.target.value)}/>
        <FormRow type="email"
         name="email" 
         labelText="Email"
         value={email}
         handleChange={(e)=>setEmail(e.target.value)}/>
        <FormRow type="text"
         name="location" 
         value={location}
         labelText="Location"
         handleChange={(e)=>setLocation(e.target.value)}/>
         <button className='btn btn-block' type='submit' disabled={isLoading}>
           {isLoading?'Please Wait...':'Save Changes'}
         </button>
      </div>
    </form>
  </Wrapper>
}

export default Profile