import React, { useEffect, useState } from "react"



import Login from "./Login"
import "./Login.css"

import { json, useNavigate } from "react-router-dom";


const App = () => {

const navigate = useNavigate();

useEffect(() => {
    if(localStorage.getItem("items") != null)
        {
            navigate("/profile")
        }
})
    


const [items, setItems] = useState([]);


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

        
        localStorage.setItem("items" , JSON.stringify({id:responseData.id, userName:responseData.userName, userRole: responseData.userRole}));
        
        navigate("/profile")


    } catch(error) {
        console.log(error);
    }


}








function deneme() {
    navigate("/Home")
};

function ToRegister(){
    navigate("/Register")
};


const matrix_ = () => {

    const canvas = document.getElementById('canv');
    const ctx = canvas.getContext('2d');
    
    const w = canvas.width = document.body.offsetWidth;
    const h = canvas.height = document.body.offsetHeight;
    const cols = Math.floor(w / 20) + 1;
    const ypos = Array(cols).fill(0);
    
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, w, h);
    
    function matrix () {
      ctx.fillStyle = '#0001';
      ctx.fillRect(0, 0, w, h);
      
      ctx.fillStyle = '#0f0';
      ctx.font = '15pt monospace';
      
      ypos.forEach((y, ind) => {
        const text = "404";
        const x = ind * 20;
        ctx.fillText(text, x, y);
        if (y > 100 + Math.random() * 10000) ypos[ind] = 0;
        else ypos[ind] = y + 20;
      });
    }
    
    setInterval(matrix, 100);
    }

return (
    <>
    <canvas id="canv" className="h-76 w-76">
    {setTimeout(() => {
                matrix_()
            },100)}
    <h1>Alper</h1>
    </canvas>
    <div className="auth-form-container">
            
            <form className="login-form" >
            <h2 className="mb-5">Login</h2>
                <label htmlFor="email">email</label>
                <input type="email" placeholder="youremail@gmail.com" id="email" name="email"  className="mt-auto"/>
                <label htmlFor="password">password</label>
                <input type="password" placeholder="********" id="password" name="password" />
                <br/>
                <button className="bg-yellow-200" type="submit" onClick={LoginSubmit}>Log In</button>
            </form>
            <button className="link-btn" onClick={ToRegister}>Don't have an account? Register here.</button>

            
        </div>
        </>
);


}
export default App;