import { useEffect, useState } from "react"
import { json, useNavigate } from "react-router-dom";

const LoginComp = ({setShowLogin}) => {


    const [deneme , setDeneme] = useState(false)


    const navigate = useNavigate();


useEffect(() => {
    if(localStorage.getItem("items") != null)
        {
            navigate("/profile")
        }
} , [])
    


const [items, setItems] = useState([]);

const handleLogin=()=>{
    LoginSubmit();
}


async function LoginSubmit (ex) {
    ex.preventDefault();
    console.log("Buton")

    console.log(document.getElementById("email").value , document.getElementById("password").value)


    const api = "http://localhost:63470/api/user/login"

    try{
        const submitData = {
            "userMail" : document.getElementById("email").value,
            "userPassword" : document.getElementById("password").value
        }

        console.log(submitData)

        const response = await fetch(api ,
            {
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify(submitData)
            })
        
        var responseData = await response.json();

        console.log(response)

        
        localStorage.setItem("items" , JSON.stringify({id:responseData.id, userName:responseData.userName, userRole: responseData.userRole, userMail: responseData.userMail}));
        

        navigate("/profile")
        window.location.reload()

    } catch(error) {
        console.log(error);
        alert("Kullanıcı Adı veya Şifre Yanlış!")
    }


}


    return(
        <>
            <div>
                <div className="flex flex-row justify-center items-center bg-gradient-to-r from-[#15b906] via [#1aaf96] to-[#2611e0] animate-text">
                    <form className="flex flex-col justify-center h-screen ">
                        <div className="border-2 p-20 rounded flex flex-col justify-center">
                        <div>
                            <p className="w-full justify-center items-center flex flex-row pb-10 text-3xl font-semibold text-gray-200">Login</p>
                        </div>
                        
                        <div>
                            <label className="track-wide uppercase
                                text-gray-200 text-s font-semibold mb-2 block"
                                htmlFor="email">
                                Email
                            </label>
                            <input
                                className="w-full bg-gray-200 text-blue-700
                                border border-gray-200 rounded py-3 px-4
                                mb-5 leading-tight focus:outline
                                focus:bg-green"
                                id="email"
                                type="text"
                                placeholder="mail@mail"
                                required
                            />
                        </div>

                        <div>
                            <label className="track-wide uppercase
                                text-gray-200 text-s font-semibold mb-2 block"
                                htmlFor="password">
                                Password
                            </label>
                            <input
                                className="w-full bg-gray-200 text-blue-700
                                border border-gray-200 rounded py-3 px-4
                                mb-5 leading-tight focus:outline
                                focus:bg-green"
                                id="password"
                                type="password"
                                placeholder="password"
                                required
                            />
                        </div>

                        <button className="bg-yellow-200 mt-5 px-3 py-2 font-semibold"
                        onClick={LoginSubmit}
                        >Login</button>
                    
                    </div>
                    <button className="flex flex-row justify-center items-center block text-m font-semibold text-gray-200 pt-2 underline"
                    onClick={() => setShowLogin(false)}
                    >Don't have an account? Register here.</button>
                    </form>
                    
                </div>
            </div>
        </>
    )
    
}
export default LoginComp