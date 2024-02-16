import React, { useReducer, useContext,useEffect } from "react";
import axios from "axios";
import reducer from "./reducer";
import {
  CLEAR_ALERT,
  DISPLAY_ALERT,
  SETUP_USER_BEGIN,
  SETUP_USER_SUCCESS,
  SETUP_USER_ERROR,
  TOGGLE_SIDE_BAR,
  LOG_OUT_USER,
  UPDATE_USER_BEGIN,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  HANDLE_CHANGE,
  CLEAR_VALUES,
  CREATE_INTERVIEW_BEGIN,
  CREATE_INTERVIEW_SUCCESS,
  CREATE_INTERVIEW_ERROR,
  GET_INTERVIEWS_BEGIN,
  GET_INTERVIEWS_SUCCESS,
  SET_EDIT_JOB,
  DELETE_JOB_BEGIN,
  EDIT_JOB_BEGIN,
  EDIT_JOB_SUCCESS,
  EDIT_JOB_ERROR,
  SHOW_STATS_BEGIN,
  SHOW_STATS_SUCCESS,
  CLEAR_FILTER,
  CHANGE_PAGE,
  GET_ADMIN_INTERVIEWS_BEGIN,
  GET_ADMIN_INTERVIEWS_SUCCESS
} from "./action";

const addUserToLocalStorage = ({ user, token, location }) => {
  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("token", token);
  localStorage.setItem("location", location);
};

const removeUserFromLocalStorage = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  localStorage.removeItem("location");
};

const token = localStorage.getItem("token");
const user = localStorage.getItem("user");
const userLocation = localStorage.getItem("location");
const URL=process.env.REACT_APP_BASE_URL

const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: "",
  alertType: "",
  user: user ? JSON.parse(user) : null,
  token: token || null,
  userLocation: userLocation || "",
  showSideBar:false,
  isEditing:false,
  editJobId:'',
  studentFirstName:'',
  studentSecondName:'',

  logicMark:0,
  englishMark:0,
  codingMark:0,
  englishTest:0,
  result:0,

  statusOptions:['pass','failed','retake','pending'],
  status:"pending",

  interviewLocation: userLocation || "",
  locationOption:['Amman','Irbid'],

  courseTypeOptions:['javascript','python','dotnet','java','cybersecurity','datavisualization','mobiledevelopment','others'],
  courseType:'others',

  note:"",
  //Get all jobs
  interviews:[],
  totalInterviews:0,
  numberOfPages:1,
  adminInterviews:[],
  adminTotalInterviews:0,
  adminNumberOfPages:1,
  pages:1,
  stats:{},
  monthlyApplication:[],
  search:"",
  searchStatus:'all',
  courseType:'all',
  locationType:'all',
  sort:'latest',
  sortOptions:['latest','oldest','a-z','z-a'],
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const authFetch= axios.create({
    baseURL:`${URL}/api/v1`
  })

  //request 
  
  authFetch.interceptors.request.use((config)=>{
    config.headers.common['Authorization'] = `Bearer ${state.token}`
    return config;
  },(error)=>{
    return Promise.reject(error); 
  })

  //response 

  authFetch.interceptors.response.use((response)=>{
    return response;
  },(error)=>{
    console.log(error.response);
    if(error.response.status===401){
      logoutUser();
      console.log('AUTH ERROR');
    }
    return Promise.reject(error);
  })

  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT });
    clearAlert();
  };

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT });
    }, 3000);
  };

  const setupUser = async ({currentUser,endPoint,alertText}) => {
    dispatch({ type: SETUP_USER_BEGIN });
    try {
      const { data } = await axios.post(`${URL}/api/v1/auth/${endPoint}`, currentUser);
      const { user, token, location } = data;
      dispatch({
        type: SETUP_USER_SUCCESS,
        payload: { user, token, location,alertText },
      });
      //local storage later
      addUserToLocalStorage({
        user,
        token,
        location,
      });
    } catch (error) {
      console.log(error.response);
      dispatch({
        type: SETUP_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const toggleSideBar=()=>{
    dispatch({type:TOGGLE_SIDE_BAR})
  }
  const logoutUser=()=>{
    dispatch({type:LOG_OUT_USER})
    removeUserFromLocalStorage();
  }

  const updateUser=async(currentUser)=>{
    dispatch({
      type:UPDATE_USER_BEGIN
    })
    try {
      const {data}=await authFetch.patch('/auth/updateUser',currentUser);

      const {user,location,token} =data;

      dispatch({
        type:UPDATE_USER_SUCCESS,payload:{user,location,token}
      });
      addUserToLocalStorage({user,location,token})
    } catch (error) {
      if(error.response.status!==401 ){
        dispatch({type:UPDATE_USER_ERROR,payload:{msg:error.response.data.msg}}) 
      }
    }
    clearAlert(); 
  }

  const handleChange=({name,value})=>{
    dispatch({type:HANDLE_CHANGE,payload:{name,value}});
  }

  const clearValues=()=>{
    dispatch({type:CLEAR_VALUES});
  }

  const createInterview=async()=>{
    dispatch({type:CREATE_INTERVIEW_BEGIN});
    try {
      const{studentFirstName,
        studentSecondName,
        logicMark,
        englishMark,
        codingMark,
        englishTest,
        result,
        status,
        interviewLocation,
        courseType,
        note}=state;
      await authFetch.post('/interviews',{
        studentFirstName,
        studentSecondName,
        logicMark,
        englishMark,
        codingMark,
        englishTest,
        result,
        status,
        interviewLocation,
        courseType,
        note
      })
      dispatch({type:CREATE_INTERVIEW_SUCCESS});
      dispatch({type:CLEAR_VALUES})
    } catch (error) {
      if(error.response.status===401) return;
      dispatch({type:CREATE_INTERVIEW_ERROR,payload:{msg:error.response.data.msg}})
    }
    clearAlert(); 
  }

  const getInterviews=async()=>{
    const {search,
      searchStatus,
      courseType,
      locationType,
      sort,
      pages}=state;

    let url=`/interviews?status=${searchStatus}&interviewLocation=${locationType}&courseType=${courseType}&sort=${sort}&page=${pages}`;

    if(search){
      url+=`&search=${search}`
    }
    dispatch({type:GET_INTERVIEWS_BEGIN})
    try {
      const {data}=await authFetch(url);
      const{interviews,totalInterviews,numberOfPages}=data
      dispatch({type:GET_INTERVIEWS_SUCCESS,payload:{
        interviews,
        totalInterviews,
        numberOfPages
      }})

    } catch (error) {
      console.log(error.response);
    }
    clearAlert();
  }

  const getAdminInterviews=async()=>{
    const {search,
      searchStatus,
      courseType,
      locationType,
      sort,
      pages}=state;

    let url=`/interviews/all?status=${searchStatus}&interviewLocation=${locationType}&courseType=${courseType}&sort=${sort}&page=${pages}`;

    if(search){
      url+=`&search=${search}`
    }
    dispatch({type:GET_ADMIN_INTERVIEWS_BEGIN})
    try {
      const {data}=await authFetch(url);
      const{interviews,totalInterviews,numberOfPages}=data
      dispatch({type:GET_ADMIN_INTERVIEWS_SUCCESS,payload:{
        adminInterviews:interviews,
        adminTotalInterviews:totalInterviews,
        adminNumberOfPages:numberOfPages
      }})

    } catch (error) {
      console.log(error.response);
    }
    clearAlert();
  }
  
  const setEditJob=(id)=>{
    dispatch({type:SET_EDIT_JOB,payload:{id}})
  }
  const deleteJob=async(id)=>{
    dispatch({type:DELETE_JOB_BEGIN});

    try {
      await authFetch.delete(`/interviews/${id}`);
      getInterviews();
    } catch (error) {
      // logoutUser();
    }
  }
  const editJob=async()=>{
    dispatch({type:EDIT_JOB_BEGIN,payload:{isLoading:true}})
    try {
      const {studentFirstName,
        studentSecondName,
        logicMark,
        englishMark,
        codingMark,
        englishTest,
        result,
        status,
        interviewLocation,
        courseType,
        note}=state;
      await authFetch.patch(`/interviews/${state.editJobId}`,{
        studentFirstName,
        studentSecondName,
        logicMark,
        englishMark,
        codingMark,
        englishTest,
        result,
        status,
        interviewLocation,
        courseType,
        note
      });

      dispatch({
        type:EDIT_JOB_SUCCESS
      })
      dispatch({type:CLEAR_VALUES})

    } catch (error) {
      if(error.response.status===401) return;

      dispatch({
        type:EDIT_JOB_ERROR,
        payload:{msg:error.response.data.msg}
      })
    }

    clearAlert();
  }

  const showStats=async()=>{
    dispatch({type:SHOW_STATS_BEGIN});
    try {
      const {data}= await authFetch('/interviews/stats');
      dispatch({type:SHOW_STATS_SUCCESS,payload:{
        stats:data.defaultStats,
        monthlyApplication:data.monthlyApplication,
        usersStats:data.usersStats,
        defaultCityStats:data.defaultCityStats,
        defaultCourseTypeStats:data.defaultCourseTypeStats
       }})
    } catch (error) {
      // logoutUser();
    }
    clearAlert();
  }

const clearFilter = ()=>{
  dispatch({type:CLEAR_FILTER});
}

const changePage=(pages)=>{
  dispatch({type:CHANGE_PAGE,payload:{pages}})
}
  
  return (
    <AppContext.Provider
      value={{ ...state, 
        displayAlert,
        setupUser,
        toggleSideBar,
        logoutUser,
        updateUser,
        handleChange,
        clearValues,
        createInterview,
        getInterviews,
        setEditJob,
        deleteJob,
        editJob,
        showStats,
        clearFilter,
        changePage,
        getAdminInterviews
       }}
    >
      {children}
    </AppContext.Provider>
  );
};


const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, initialState, useAppContext };
