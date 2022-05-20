import React from "react";
import { FormRow, FormRowSelect } from ".";
import { useAppContext } from "../context/appContext";
import Wrapper from "../assets/wrappers/SearchContainer";

const SearchContainer = () => {
  const {
    search,
    searchStatus,
    searchType,
    sort,
    sortOptions,
    isLoading,
    jobTypeOption,
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
         labelText='job status'
         name='searchStatus'
         value={searchStatus}
         handleChange={handleSearch}
         Options={['all',...statusOptions]}
         />
         <FormRowSelect
         labelText='job type'
         name='searchType'
         value={searchType}
         handleChange={handleSearch}
         Options={['all',...jobTypeOption]}
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
