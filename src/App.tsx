import './App.css'
import Guest from "./components/Guest";
import Profile from "./components/Profile";
import {Route, Routes, useNavigate} from "react-router";
import {useEffect} from "react";

function App() {
    const navigate = useNavigate();

    // todo: implement token retrieval from global state
    const token = '123';

    useEffect(() => {
        if (!token) {
            navigate("/")
            return
        }

        navigate("/profile")
    }, [])

  return (
    <>
      <Routes>
          <Route path={"/"} element={<Guest/>}/>
          <Route path={"/profile"} element={<Profile/>}/>
      </Routes>
    </>
  )
}

export default App
