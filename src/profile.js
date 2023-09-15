import { useEffect, useState, useRef } from "react"
import MessageSender from "./Components/MessageSender"
import UserDefinerById from "./Components/UserDefinerById"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ChangeUserName from "./Components/ChangeUserName";
import ChangePassword from "./Components/ChangePassword";

import Sidebar from "./Components/Sidebar"
import useInterval from "./hooks/useInterval";
import AnketModal from "./Components/AnketModal";

const Profile = () => {


    const [todoList, setTodoList] = useState([]);

    const [userName2Show , setUserName2Show] = useState(JSON.parse(localStorage.getItem("items")).userName);
    
    const [deneme, setDeneme] = useState()

    const [image, setImage] = useState();

    const inputRef = useRef(null)

    const handleClick = () => {
        inputRef.current.click();
    }

    const handleImageChange = (event) => {
        
        const file = event.target.files[0];
        //console.log(file)
        setImage(file);
        localStorage.setItem("pp" , {file})
    }

    return(
    
        <>
        <div className="flex flex-row h-screen overflow-hidden ">
        <Sidebar/>
        <div className="w-full overflow-y-scroll">
            <div className="bg-gradient-to-r from-green-600 to-blue-500 animate-text pb-10 border-b-8 border-green-800">

                <div className="flex flex-row justify justify-center  duration-800">
                    <div className="flex flex-row mt-20  justify justify-center rounded-full">
                        {/*<h1 className="justify-center  pb-5" ><AccountCircleIcon fontSize="large"/></h1>*/}
                        {image ? <img src={URL.createObjectURL(image)}  className="border-4 border-green-900 rounded-full w-content h-40 w-40 items-center justify-center shadow-lg" /> : <img src={ require("./undfPp.JPG")} alt="" className="border-4 border-green-900 rounded-full w-content h-40 w-40 items-center justify-center shadow-lg" />}

                    </div>
                </div>

                <div className="flex flex-row justify justify-center pt-5">
                    <div className="text-3xl font-semibold flex flex-row">
                        <h1 className="uppercase">{userName2Show}</h1>
                    </div>
                </div>

            </div>


            <div>
                <div className="flex flex-col items-center">
                    <h1 className="text-2xl font-semibold mt-10 mb-5">{userName2Show}</h1>
                    <h1 className="text-xl font-semibold mb-5">{JSON.parse(localStorage.getItem("items")).userMail}</h1>
                    <h1 className="text-xl font-semibold">Rolünüz: {JSON.parse(localStorage.getItem("items")).userRole ? "Yönetici" : "Kullanıcı"}</h1>
                    
                </div>
            </div>


            <div className="flex flex-row mt-20 border-t-4 pt-10 pb-20 max-h-screen">
                <div className="flex flex-col items-center w-1/3 mt-8">
                   <ChangeUserName setUserName2Show={setUserName2Show}/>
                </div>
                <div className="flex flex-col items-center w-1/3 mt-8">
                    <ChangePassword/>
                </div>
                <div className="flex flex-col items-center w-1/3 mt-8">
                    <input type="file" ref={inputRef} onChange={handleImageChange} className="hidden"/>
                    <button className="text-lg font-semibold bg-gray-200 px-3 py-2" onClick={handleClick}>Profil Fotoğrafınızı Değiştirin</button>
                </div>
                
            </div>
            

        </div>
        </div>
        </>
    ) 
}
export default Profile