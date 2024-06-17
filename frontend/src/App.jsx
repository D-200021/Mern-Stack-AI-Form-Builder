import Intro from "./component/Pages/Intro"
import LoginPage from "./component/Pages/LoginPage/LoginPage"
import SignUp from "./component/Pages/RegistrationPage/SignUp"
import Dashboard from "./component/dashboard/dashboard";
import EditForm from "./component/editForm/EditForm";
import Header from "./component/header/Header"
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Intro />} />
          <Route path='/Signup' element={<SignUp />} />
          <Route path='/Login' element={<LoginPage />} />
          <Route path='/Dashboard' element={<Dashboard />} />
          <Route path='/EditForm/:formId' element={<EditForm />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
