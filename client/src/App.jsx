import Signin from "./pages/Signin.jsx";
import About from "./pages/About.jsx";
import Home from "./pages/Home.jsx";
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import SignUp from "./pages/SignUp.jsx";
import Profile from "./pages/Profile.jsx";
import Header from "./components/Header.jsx";


function App() {
  return (
    <BrowserRouter>
        <Header />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/signin" element={<Signin />}/>
        <Route path="/sign-up" element={<SignUp />}/>
        <Route path="/about" element={<About />}/>
        <Route path="/profile" element={<Profile />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
