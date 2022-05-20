import React from "react";
import { FormRow, Alert,FormRowSelect } from "../../components";
import { useAppContext } from "../../context/appContext";
import Wrapper from "../../assets/wrappers/DashboardFormPage";

const AddJob = () => {
  const {
    showAlert,
    position,
    company,
    jobType,
    jobLocation,
    jobTypeOption,
    statusOptions,
    status,
    isEditing,
    handleChange,
    clearValues,
    isLoading,
    createJob,
    editJob
  } = useAppContext();

  const handleSubmit=e=>{
    e.preventDefault();
    
    // if(!position||!company||!jobLocation){
    //   displayAlert();
    //   return;
    // }

    if(isEditing){
      editJob()
      return;
    }
    console.log("create job")
    createJob();
  }

  const handleJobInput=(e)=>{
    const name=e.target.name;
    const value=e.target.value;
    handleChange({name,value});
  }

  return <Wrapper> 
    <form action="" className="form">
      <h3>{isEditing? 'edit job':'add job'}</h3>
      {
        showAlert && <Alert/>
      }
      <div className="form-center">
        <FormRow type="text" name="position" value={position} handleChange={handleJobInput} />
        <FormRow type="text" name="company" value={company} handleChange={handleJobInput} />
        <FormRow type="text" name="jobLocation" value={jobLocation} handleChange={handleJobInput} />
        <FormRowSelect
        value={jobType}
        handleChange={handleJobInput}
        Options={jobTypeOption}
        labelText="job type"
        name="jobType"
        />
        <FormRowSelect
        value={status}
        handleChange={handleJobInput}
        Options={statusOptions}
        labelText="status"
        name="status"
        />

        <div className="btn-container">
          <button type="submit" className="btn btn-block submit-btn" onClick={handleSubmit} disabled={isLoading}>
            submit
          </button>
          <button className="btn btn-block clear-btn" onClick={
            (e)=>{
              e.preventDefault();
              clearValues()          
            }
          }>
            clear
          </button>
          </div>
      </div>
    </form>
  </Wrapper>;
};

export default AddJob;
