import {BrowserRouter,Routes,Route} from "react-router-dom"
import { useAppContext } from "./context/appContext";
import { Landing,Register,Error } from "./pages";
import {
  AddInterview,
  AllJobs,
  Profile,
  SharedLayout,
  Stats,
  ProtectedLayout,
  AdminInterviews
} from "./pages/dashboard"

const App=()=> {
  const {user}=useAppContext();
  return (
  <BrowserRouter>
  <Routes>
      {
        (user&&user.isAdmin)?(
          <>
              <Route path="/" element={
              <ProtectedLayout>
              <SharedLayout/>
              </ProtectedLayout>
              }>
              <Route index element={<Stats/>}/>
              <Route path="profile" element={<Profile/>}/>
              <Route path="admin" element={<AdminInterviews/>}/>
              </Route>
          </>
        ):(
          <>
              <Route path="/" element={
              <ProtectedLayout>
              <SharedLayout/>
              </ProtectedLayout>
              }>
              <Route index element={<Stats/>}/>
              <Route path="profile" element={<Profile/>}/>
              <Route path="all-interviews" element={<AllJobs/>}/>
              <Route path="add-interview" element={<AddInterview/>}/>
              </Route>
          </>
        )
      }
    <Route path="/register" element={<Register/>} />
    <Route path="/landing" element={<Landing/>}/>
    <Route path="*" element={<Error/>} />
  </Routes>
  </BrowserRouter>
  );
}

export default App;
