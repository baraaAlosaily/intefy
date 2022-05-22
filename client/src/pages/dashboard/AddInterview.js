import React from "react";
import { FormRow, Alert,FormRowSelect,FormRowTextArea } from "../../components";
import { useAppContext } from "../../context/appContext";
import Wrapper from "../../assets/wrappers/DashboardFormPage";

const AddInterview = () => {
  const {
    showAlert,
    isEditing,
    handleChange,
    clearValues,
    isLoading,
    createInterview,
    editJob,
    studentFirstName,
    studentSecondName,
    logicMark,
    englishMark,
    codingMark,
    englishTest,
    status,
    interviewLocation,
    courseType,
    note,
    statusOptions,
    courseTypeOptions,
    locationOption
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
    console.log("create interview")
    createInterview();
  }

  const handleJobInput=(e)=>{
    const name=e.target.name;
    const value=e.target.value;
    handleChange({name,value});
  }

  return <Wrapper> 
    <form action="" className="form">
      <h3>{isEditing? 'edit interview':'new interview'}</h3>
      {
        showAlert && <Alert/>
      }
      <div className="form-center">
        <FormRow type="text" labelText="student first name" name="studentFirstName" value={studentFirstName} handleChange={handleJobInput} />
        <FormRow type="text" labelText="student last name" name="studentSecondName" value={studentSecondName} handleChange={handleJobInput} />
        <FormRow type="number" labelText="logic mark" name="logicMark" value={logicMark} handleChange={handleJobInput} max="10" min="0" />
        <FormRow type="number" labelText="english mark" name="englishMark" value={englishMark} handleChange={handleJobInput} max="10" min="0" />
        <FormRow type="number" labelText="coding mark" name="codingMark" value={codingMark} handleChange={handleJobInput} max="10" min="0" />
        <FormRow type="number" labelText="english test" name="englishTest" value={englishTest} handleChange={handleJobInput} max="50" min="0" />
        <FormRowSelect
        value={interviewLocation}
        handleChange={handleJobInput}
        Options={locationOption}
        labelText="Status"
        name="interviewLocation"
        />
        <FormRowSelect
        value={status}
        handleChange={handleJobInput}
        Options={statusOptions}
        labelText="Status"
        name="status"
        />
        <FormRowSelect
        value={courseType}
        handleChange={handleJobInput}
        Options={courseTypeOptions}
        labelText="Courses Type"
        name="courseType"
        />
        <FormRowTextArea type="textarea" name="note" value={note} handleChange={handleJobInput} />

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

export default AddInterview;
