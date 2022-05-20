import {BrowserRouter,Routes,Route} from "react-router-dom"
import { Landing,Register,Error } from "./pages";
import {
  AddInterview,
  AllJobs,
  Profile,
  SharedLayout,
  Stats,
  ProtectedLayout
} from "./pages/dashboard"

const App=()=> {
  return (
  <BrowserRouter>
  <Routes>
    <Route path="/" element={
    <ProtectedLayout>
      <SharedLayout/>
    </ProtectedLayout>
    }>
      <Route index element={<Stats/>}/>
      <Route path="all-jobs" element={<AllJobs/>}/>
      <Route path="add-interview" element={<AddInterview/>}/>
      <Route path="profile" element={<Profile/>}/>
    </Route>
    <Route path="/register" element={<Register/>} />
    <Route path="/landing" element={<Landing/>}/>
    <Route path="*" element={<Error/>} />
  </Routes>
  </BrowserRouter>
  );
}

export default App;
