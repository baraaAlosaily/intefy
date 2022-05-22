import { CLEAR_ALERT,
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
 
    } from "./action"
import { initialState } from "./appContext"

const reducer=(state,action)=>{
    if(action.type===DISPLAY_ALERT){
        return {
            ...state,
            showAlert:true,
            alertText:'Please provid all values !',
            alertType:'danger'
        }
    }
    if(action.type===CLEAR_ALERT){
        return {
            ...state,
            showAlert:false,
            alertText:'',
            alertType:''
        }
    }
    if(action.type===SETUP_USER_BEGIN){
        return {
            ...state,isLoading:true
        }
    }
    if(action.type===SETUP_USER_SUCCESS){
        return {
            ...state,
            isLoading:false,
            token:action.payload.token,
            user:action.payload.user,
            userLocation:action.payload.userLocation,
            jobLocation:action.payload.jobLocation,
            showAlert:true,
            alertType:'success',
            alertText:action.payload.alertText
        }
    }
    
    if(action.type===SETUP_USER_ERROR){
        return {
            ...state,
            isLoading:false,
            showAlert:true,
            alertType:'danger',
            alertText: action.payload.msg
        } 
    }
    if(action.type===TOGGLE_SIDE_BAR){
        return {
            ...state,
            showSideBar:!state.showSideBar
        } 
    }
    if(action.type===LOG_OUT_USER){
        return {
            ...initialState,
            user:null,
            token:null,
            userLocation:null,
            jobLocation:null
        } 
    }
    if(action.type===UPDATE_USER_BEGIN){
        return {
            ...state, isLoading:true
        }
    }
    if(action.type===UPDATE_USER_SUCCESS){
        return {
            ...state,
            isLoading:false,
            token:action.payload.token,
            user:action.payload.user,
            userLocation:action.payload.userLocation,
            jobLocation:action.payload.jobLocation,
            showAlert:true,
            alertType:'success',
            alertText:'User Profile Updated'
        }
    }
    
    if(action.type===UPDATE_USER_ERROR){
        return {
            ...state,
            isLoading:false,
            showAlert:true,
            alertType:'danger',
            alertText: action.payload.msg
        } 
    }

    if(action.type===HANDLE_CHANGE){
        return {
            ...state,
            [action.payload.name]:action.payload.value
        } 
    }
    if(action.type===CLEAR_VALUES){
        const initialState={
            isEditing:false,
            editJobId:'',
            studentFirstName:'',
            studentSecondName:'',
            logicMark:0,
            englishMark:0,
            codingMark:0,
            englishTest:0,
            status:'pending',
            interviewLocation:'Amman',
            courseType:'others',
            note:''
        }
        return {
            ...state,
            ...initialState
            // isEditing:false,
            // editJobId:'',
            // position:'',
            // company:'',
            // jobLocation: userLocation,
            // jobType:'full-time',
            // status:"pending"
        } 
    }

    if(action.type===CREATE_INTERVIEW_BEGIN){
        return {...state,isLoading:true}
    }

    if(action.type===CREATE_INTERVIEW_SUCCESS){
        return {
            ...state,
            isLoading:false,
            showAlert:true,
            alertType:'success',
            alertText: 'New Job Created'
        } 
    }
    if(action.type===CREATE_INTERVIEW_ERROR){
        return {
            ...state,
            isLoading:false,
            showAlert:true,
            alertType:'danger',
            alertText: action.payload.msg
        } 
    }

    if(action.type===GET_INTERVIEWS_BEGIN){
         return {...state,isLoading:true,showAlert:false}
    }

    if(action.type===GET_INTERVIEWS_SUCCESS){
        return {...state,isLoading:false,
            interviews:action.payload.interviews,
            totalInterviews:action.payload.totalInterviews,
            numberOfPages:action.payload.numberOfPages,
        }
    }

    if(action.type===SET_EDIT_JOB){
        const interview =state.interviews.find((interview)=>interview._id===action.payload.id);
        console.log(interview)
        const {_id,studentFirstName,
            studentSecondName,
            createdAt,
            logicMark,
            englishMark,
            codingMark,
            englishTest,
            result,
            status,
            interviewLocation,
            courseType,
            note}=interview;

        return {
            ...state,
            isEditing:true,
            editJobId:_id,
            studentFirstName,
            studentSecondName,
            createdAt,
            logicMark,
            englishMark,
            codingMark,
            englishTest,
            result,
            status,
            interviewLocation,
            courseType,
            note
        }
    }

    if(action.type===DELETE_JOB_BEGIN){
        return{...state,isLoading:true}
    }

    if(action.type===EDIT_JOB_BEGIN){
        return {...state,isLoading:true}
    }

    if(action.type===EDIT_JOB_SUCCESS){
        return {
            ...state,
            isLoading:false,
            showAlert:true,
            alertType:'success',
            alertText: 'Job Updated !'
        } 
    }
    if(action.type===EDIT_JOB_ERROR){
        return {
            ...state,
            isLoading:false,
            showAlert:true,
            alertType:'danger',
            alertText: action.payload.msg
        } 
    }

    if(action.type=== SHOW_STATS_BEGIN){
        return {
            ...state,
            isLoading:true,
            showAlert:false
        }
    }

    if(action.type===SHOW_STATS_SUCCESS){
        return {
            ...state,
            isLoading:false,
            stats:action.payload.stats,
            monthlyApplication:action.payload.monthlyApplication,
            usersStats:action.payload.usersStats,
            defaultCityStats:action.payload.defaultCityStats,
            defaultCourseTypeStats:action.payload.defaultCourseTypeStats
        }
    }
    if(action.type===CLEAR_FILTER){
        return {
            ...state,
            search:"",
            searchStatus:'all',
            searchType:'all',
            sort:'latest',
        }
    }

    if(action.type===CHANGE_PAGE){
        return{
            ...state,
            pages:action.payload.pages
        }
    }

    if(action.type===GET_ADMIN_INTERVIEWS_BEGIN){
        return {...state,isLoading:true,showAlert:false}
   }

   if(action.type===GET_ADMIN_INTERVIEWS_SUCCESS){
       return {...state,isLoading:false,
        adminInterviews:action.payload.adminInterviews,
        adminTotalInterviews:action.payload.adminTotalInterviews,
        adminNumberOfPages:action.payload.adminNumberOfPages,
       }
   }

    throw new Error(`no such action :${action.type}`)
}

export default reducer