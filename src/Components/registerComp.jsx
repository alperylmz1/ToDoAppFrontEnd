import { useEffect, useState } from "react"
import { json, useNavigate } from "react-router-dom";


const RegisterComp = ({setShowLogin}) => {

    const navigate = useNavigate();

    useEffect(() => {
        if(localStorage.getItem("items") != null)
        {
            navigate("/profile")
        }
    })


    const handleRegister = () => {
        if(document.getElementById("userName").value && document.getElementById("email").value && document.getElementById("password").value){
            RegisterSubmit()
            }
            else{
                alert("Bilgiler Boş Bırakılamaz!")
            }
    }

    async function RegisterSubmit (ex) {
        //ex.preventDefault();
        //console.log("Buton")
    
        //console.log(document.getElementById("email").value , document.getElementById("password").value)
    
    
        const api = "http://localhost:63470/api/user"
    
        try{
            const submitData = {
                "userId" : 99,
                "userMail" : document.getElementById("email").value,
                "userName" : document.getElementById("userName").value,
                "userPassword" : document.getElementById("password").value,
                "userRole" : 0,
            }
    
            const response = await fetch(api ,
                {
                    method : 'POST',
                    headers : {
                        'Content-Type' : 'application/json'
                    },
                    body : JSON.stringify(submitData)
                })
            
            var responseData = await response.json();
            
    
            console.log(responseData)
    
            
            //localStorage.setItem("items" , JSON.stringify({id:responseData.id, userName:responseData.userName, userRole: responseData.userRole}));
            
            alert("Kayıt Başarılı!").then(setShowLogin(1))
            
    
            //setShowLogin(1)
    
    
        } catch(error) {
            //alert(error)
            console.log(error);
        }
    
    
    }


    return(
        <>
            <div>
                <div className="flex flex-row justify-center items-center bg-gradient-to-r from-[#15b906] via [#1aaf96] to-[#2611e0] animate-text">
                    <form className="flex flex-col justify-center h-screen ">
                        <div className="border-2 p-20 rounded flex flex-col justify-center">
                        <div>
                            <p className="w-full justify-center items-center flex flex-row pb-10 text-3xl font-semibold text-gray-200">Register</p>
                        </div>
                        
                        <div>
                            <label className="track-wide uppercase
                                text-gray-200 text-s font-semibold mb-2 block"
                                htmlFor="userName">
                                Username
                            </label>
                            <input
                                className="w-full bg-gray-200 text-blue-700
                                border border-gray-200 rounded py-3 px-4
                                mb-5 leading-tight focus:outline
                                focus:bg-green"
                                id="userName"
                                type="text"
                                placeholder="Username"
                                required
                            />
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
                        onClick={handleRegister}
                        >Register</button>
                    
                    </div>
                    <button className="flex flex-row justify-center items-center block text-m font-semibold text-gray-200 pt-2 underline"
                    onClick={() => setShowLogin(true)}
                    >Already have an account? Login here.</button>
                    </form>
                    
                </div>
            </div>
        </>
    )


}
export default RegisterComp