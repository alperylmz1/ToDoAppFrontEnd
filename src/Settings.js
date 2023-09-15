import Sidebar from "./Components/Sidebar"
import ChangeUserName from "./Components/ChangeUserName"
import ChangePassword from "./Components/ChangePassword"
import { useState } from "react"

const Settings = () => {

    const [settingN, setSettingN] = useState(0)

    return(
        <>
            <div className="flex flex-row h-screen overflow-hidden ">
                <Sidebar/>
                <div className="w-full overflow-y-scroll">
                <h1 className="text-3xl font-bold py-4 pl-6">Settings</h1>

                <div className="flex flex-row ml-10">

                <div className="flex flex-col items-center w-2/5 border-r-4 border-stone-500 max-h-screen">
                    

                    <div className=" max-h-screen w-3/4 flex flex-col mt-20">
                    
                    <p className="text-2xl font-semibold bg-gray-200 px-5 py-5 rounded border-4 border-green-900 cursor-pointer"
                    onClick={() => setSettingN(1)}
                    >Account Settings</p>
                    <p className="text-2xl font-semibold bg-gray-200 px-5 py-5 rounded border-x-4 border-b-4 border-green-900 cursor-pointer" 
                    onClick={() => setSettingN(2)}
                    >App Settings</p>    

                    </div>


                </div>

                <div className="flex flex-col  w-full">
                    
                    <div className="flex flex-col items-center  border-r-4 max-h-scree mt-20">
                        
                    
                        {settingN == 1 ?   
                        <div classname = "flex flex-col w-3/4 max-h-screen">
                        <div className="bg-gray-200  rounded border-4 border-green-900 cursor-pointer"><ChangeUserName/></div>
                        <div className="bg-gray-200  rounded border-x-4 border-b-4 border-green-900 cursor-pointer"><ChangePassword /></div>
                        </div>
                        : null
                    }
                    </div>
                </div>

                </div>
            </div>
            </div>
        </>
    )

}
export default Settings