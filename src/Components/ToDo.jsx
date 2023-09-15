import EditTask from "./EditTask";
import FavoriteTask from "./FavoriteTask";
import ToLeft from "./ToLeft"

import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ToRight from "./ToRight";

import MessageSender from "./MessageSender";
import Buton from "./Buton";
import { useDrag } from "react-dnd";


const ToDo = ({id, tdTitle, tdText, tdEndDate, tdFavorite, tdStatus, setTaskUpdate, taskUpdate, tdUserId ,isChange}) => {

    /*
    const [{ isDragging } , drag] = useDrag(() => ({
        type: "todo",
        item: {
            id:id,
            tdTitle:tdTitle,
            tdText:tdText,
            tdEndDate:tdEndDate,
            tdFavorite:tdFavorite,
            tdStatus:tdStatus,
            tdUserId:tdUserId,
        },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging,
        })
    }))
    */


    const handleDeleteIt = () => {
        
    }

    const handleDelete = () => {
        //TodoDelete();
        //handleDeleteIt();
        TodoDelete().then(handleDeleteIt())

    }


    async function TodoDelete (ex) {
        //ex.preventDefault();
       
        const api = `http://localhost:63470/api/todo/${id}`
    
        try{
    
            const response = await fetch(api ,
                {
                    method : 'DELETE',
                    headers : {
                        'Content-Type' : 'application/json'
                    },
                })

            //var responseData = await response.json();
    
            //console.log(response)
        
            
            //localStorage.setItem("items" , JSON.stringify({id:responseData.id, userName:responseData.userName, userRole: responseData.userRole}));
            
            //navigate("/home")

            console.log(tdUserId)
            console.log(isChange)
            
            if(response && (tdUserId != JSON.parse(localStorage.getItem("items")).id)){
                const message = `${tdTitle} Todonuz ${JSON.parse(localStorage.getItem("items")).userName} Tarafından Silindi.`

                const MessageTitle = `${tdTitle} Todonuzda Değişiklik Hakkında`

                console.log(message)
                
                 MessageSender( JSON.parse(localStorage.getItem("items")).id, tdUserId, message, MessageTitle, JSON.parse(localStorage.getItem("items")).userName)
                
            }
            
            
            alert("Başarılıı!!")
            
            setTaskUpdate(true)

        } catch(error) {
            console.log(error);
        }
    
    
    }

    
    return (
        <>
            <div className="flex flex-col items-start justify-start bg-yellow-200 my-4 py-4 px-6 w-3/4 max-w-lg rounded-2xl" //ref={drag}
            >  
            
            <div className="w-full flex flex-row justify-between ">
                <p className="font-semibold text-xl">{tdTitle}</p>
               
                
                <EditTask id = {id} tdTitle = {tdTitle} tdText = {tdText} tdEndDate = {tdEndDate} tdFavorite = {tdFavorite} tdStatus={tdStatus} setTaskUpdate={setTaskUpdate}
                isChange={isChange}/>
                

            </div>
            <p className={`text-m  flex flex-row justify-between text-green-800`}>Deadline: {tdEndDate.split("T")[0]}</p>
        

            <p className="text-lg py-2 ">{tdText}</p>  

            {/* <div className="w-full flex flex-row grid justify-items-end">
                <button className="bg-red-500 text-white
                font-semibold py-1.5 px-3 mt-6 mb-1 rounded-lg"
                onClick={handleDelete}
                >
                <DeleteIcon/>
                </button>
                
            </div>

            <div className="w-full flex flex-row justify-between">

                <FavoriteTask id = {id} tdTitle = {tdTitle} tdText = {tdText} tdEndDate = {tdEndDate} tdFavorite = {tdFavorite} setTaskUpdate={setTaskUpdate}/>
            </div> */}

            <div className="w-full flex flex-row justify-between mt-5">               
            <Buton id = {id} tdTitle = {tdTitle} tdText = {tdText} tdEndDate = {tdEndDate} tdFavorite = {tdFavorite} tdStatus={tdStatus} setTaskUpdate={setTaskUpdate} isChange={isChange}
            ButtonType = "Favorite"/>
            <div>   

                    <Buton id = {id} tdTitle = {tdTitle} tdText = {tdText} tdEndDate = {tdEndDate} tdFavorite = {tdFavorite} tdStatus={tdStatus} setTaskUpdate={setTaskUpdate} isChange={isChange}
                    ButtonType = "ToLeft"/>

                    <Buton id = {id} tdTitle = {tdTitle} tdText = {tdText} tdEndDate = {tdEndDate} tdFavorite = {tdFavorite} tdStatus={tdStatus} setTaskUpdate={setTaskUpdate} isChange={isChange}
                    ButtonType = "ToRight"/>
                
            </div> 
                    <button className="bg-red-500 text-white
                font-semibold py-1.5 px-3 mt-6 mb-1 rounded-lg hover:bg-red-900 duration-200"
                onClick={handleDelete}
                >
                <DeleteIcon/>
                </button>
            
            </div>


            </div>
        </>

    )


}

export default ToDo;