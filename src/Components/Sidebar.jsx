import React, { useState , useEffect , useLayoutEffect } from "react"

import GridViewIcon from '@mui/icons-material/GridView';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowCircleLeftRoundedIcon from '@mui/icons-material/ArrowCircleLeftRounded';
import HomeIcon from '@mui/icons-material/Home';
import ChecklistOutlinedIcon from '@mui/icons-material/ChecklistOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import SettingsIcon from '@mui/icons-material/Settings';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AddReactionIcon from '@mui/icons-material/AddReaction';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';

import NotificationsIcon from '@mui/icons-material/Notifications';

import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';

import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';


//import "./sidebar.css"

import "./MessageSender"

import { json, useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
import useInterval from "../hooks/useInterval";

const App = ({notifierUpdate}) => {

    const handleLogout = () => {
        localStorage.clear()
        alert("Çıkış Yapıldı.")
        navigate('/login')
    }


    const [open, setOpen] = useState(false);

    const [notList, setNotList] = useState([]);

    const navigate = useNavigate();

    //*************************************************

    const [timeC, setTimeC] = useState(true)
    useInterval(() => {
        setTimeC(!timeC)
    } , 500)

    
    //*********************************************** 


    async function NotificicationGet (ex) {
        //ex.preventDefault();
    
        const api = `http://localhost:63470/api/notification/receiver/${JSON.parse(localStorage.getItem("items")).id}`
    
        try{const response = await fetch(api ,
                {
                    method : 'GET',
                    headers : {
                        'Content-Type' : 'application/json',
                    }
                })
            
            var responseData = await response.json();
    
            console.log(responseData)

            setNotList(responseData)
    
    
        } catch(error) {
            console.log(error);
        }
        //return responseData;
    
      }

      
      useEffect(() => { 
        NotificicationGet()
    
          {localStorage.getItem("items") &&  
            NotificicationGet()       
                                         
          }
    
           //setUnreadNot(notificationList.filter(e => e.messageStatus === 0).length)
     
           
        } , [notifierUpdate]);

        
        // HEM USE EFFECT İN HEM USE INTERVAL İN İKİSİNİN DE OLMASI MANTIKLI MI? ARAŞTIR.

    useInterval(() => {
        NotificicationGet()
        {localStorage.getItem("items") &&  
            NotificicationGet()       
                                         
          }
    }, 4000)
        

    const unreadCount = notList.filter(e => e.messageStatus === 0).length


    return (
    <div className="flex">
        <div className= {`${open ? 'w-60' : 'w-20'} duration-500 h-screen p-4 pt-8 bg-green-800 relative`}>
        
        <i className={`absolute cursor-pointer rounded-md -right-4 top-7 w-10 bg-green-800 hover:scale-125 duration-500 ${!open && 'rotate-180'}`} onClick={() => setOpen(!open)}><KeyboardDoubleArrowLeftIcon fontSize = "large"/></i>
        
        <div className="flex gap-x-4 items-center text-white">
        {/*<img src={ require("./sil.png")} alt="" className={`items-center justify-center shadow-lg ${open ? 'w-30' : 'w-30'}`} /> */}
        <i className={`cursor-pointer-duration-500 ${open && "rotate-[360deg"}`}><FormatListBulletedIcon fontSize = "large"/></i>
        <h1 className={`text-white origin-left font-medium text-xl duration-300 ${!open && "scale-0"}`}>TODO</h1>

        </div>
        

        <ul className="pt-6">
            <li className="text-gray-100 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-green-900 hover:scale-125 duration-300 rounded-md mt-2" onClick={() => navigate("/home")}>
            <i className={`cursor-pointer-duration-500`}><HomeIcon  fontSize = "large"/></i>
            <span className = {`${!open && 'hidden' && "scale-0"} origin-left duration-200 text-lg`}>Home</span>
            </li>
            
            <li className="text-gray-100 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-green-900 hover:scale-125 duration-300 rounded-md mt-2" onClick={() => navigate("/todo")}>
            <i className={`cursor-pointer-duration-500`}><ChecklistOutlinedIcon  fontSize = "large"/></i>
            <span className = {`${!open && 'hidden' && "scale-0"} origin-left duration-200 text-lg`}>Todos</span>
            </li>
            
            <li className={`text-gray-100 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-green-900 hover:scale-125 duration-300 rounded-md mt-2 relative
             ${unreadCount > 0 && 'bg-yellow-600 hover:bg-yellow-500 hover:scale-125 animate-bounce'}`} onClick={() => navigate("/notifications")}>
            <i className={`cursor-pointer-duration-500`}><NotificationsIcon  fontSize = "large"/></i>
            <span className = {`${!open && 'hidden' && "scale-0"} origin-left duration-200 text-lg`}>{unreadCount > 0 && open ? `Notifications (${unreadCount})`: "Notifications"}</span>
            </li>

            <li className="text-gray-100 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-green-900 hover:scale-125 duration-300 rounded-md mt-2" onClick={() => navigate("/profile")}>
            <i className={`cursor-pointer-duration-500`}><AccountCircleOutlinedIcon  fontSize = "large"/></i>
            
            <span className = {`${!open && 'hidden' && "scale-0"} origin-left duration-200 text-lg`}>{open ? JSON.parse(localStorage.getItem("items")).userName : null}</span>
            </li>

            <li className="text-gray-100 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-green-900 hover:scale-125 duration-300 rounded-md mt-20" onClick={handleLogout}>
            <i className={`cursor-pointer-duration-500`}><ExitToAppIcon  fontSize = "large"/></i>
            <span className = {`${!open && 'hidden' && "scale-0"} origin-left duration-200 text-lg`}>Logout</span>
            </li>

            
        </ul>

        </div>
        

        
        
    </div>

    );
}
export default App;