import { useState , useEffect} from "react";
import LoginComp from "./Components/loginComp";
import RegisterComp from "./Components/registerComp";


import { json, useNavigate } from "react-router-dom";

const LoginPage = () => {

    const [showLogin, setShowLogin] = useState(true)

    const navigate = useNavigate();
    useEffect(() => {
        if(localStorage.getItem("items") != null)
            {
                navigate("/profile")
            }
    })
        

    return(
        <>
            {showLogin ?
            <LoginComp setShowLogin = {setShowLogin}/>
            :
            <RegisterComp setShowLogin={setShowLogin}/>
            }
           
        </>
    )


}
export default LoginPage