import React from "react";
import { FormRow, FormRowSelect } from ".";
import { useAppContext } from "../context/appContext";
import Wrapper from "../assets/wrappers/SearchContainer";

const SearchContainer = () => {
  const {
    search,
    searchStatus,
    courseType,
    courseTypeOptions,
    locationType,
    locationOption,
    sort,
    sortOptions,
    isLoading,
    statusOptions,
    handleChange,
    clearFilter,
  } = useAppContext(); 

  const handleSearch=(e)=>{
    if(isLoading) return;
    const name=e.target.name;
    const value=e.target.value;
    handleChange({name,value});
  }

  const handleSubmit=(e)=>{
    e.preventDefault();
    clearFilter();     
  }
  return <Wrapper>
    <form className="form">
       <h4>search form</h4> 
       <div className="form-center">
         {/*Search position*/}
         <FormRow 
         type='text'
         name="search"
         handleChange={handleSearch}
         value={search}
         />
         {/*Rest of values*/}
         <FormRowSelect
         labelText='interview status'
         name='searchStatus'
         value={searchStatus}
         handleChange={handleSearch}
         Options={['all',...statusOptions]}
         />
         <FormRowSelect
         labelText='course type'
         name='courseType'
         value={courseType}
         handleChange={handleSearch}
         Options={['all',...courseTypeOptions]}
         />
         <FormRowSelect
         labelText='location'
         name='locationType'
         value={locationType}
         handleChange={handleSearch}
         Options={['all',...locationOption]}
         />
         <FormRowSelect
         labelText='sort by'
         name='sort'
         value={sort}
         handleChange={handleSearch}
         Options={sortOptions}
         />
         <button className="btn btn-block btn-danger" disabled={isLoading} onClick={handleSubmit}>
           clear
         </button>

       </div>
    </form>
  </Wrapper>
};

export default SearchContainer;
