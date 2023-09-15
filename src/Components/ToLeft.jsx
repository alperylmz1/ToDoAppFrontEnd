import { useState } from "react"
import StarIcon from '@mui/icons-material/Star';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Alert } from "@mui/material";

import MessageSender from "./MessageSender";


const ToLeft = ({id, tdText, tdTitle, tdEndDate, tdFavorite, tdStatus, setTaskUpdate, isChange}) => {



    const deneme = () => {
        return(
            <>
                <Alert severity="success" color="info">Deneme</Alert>
            </>
        )
    }

    const handleLeft = () => {
        setTaskUpdate(true)
    }

    const handleInput = () => {
        //TodoSubmit();t
        //console.log(id)

        //TodoFavorite();
        //handleEdit();

        TodoStatusLeft().then(handleLeft())

    }

    const id2String = {
        0 : "Todo",
        1 : "Active",
        2 : "Completed"
    }


    var id2post = JSON.parse(localStorage.getItem("items")).id
    if(isChange){                           //eğer ChoseUser komponentinden bir bilgi geldiyse, o bilgiye göre fetch yap diyoruz.
        id2post = isChange
      }

    async function TodoStatusLeft (ex) {
        //ex.preventDefault();
   
        const api = "http://localhost:63470/api/todo"
    
        try{
            const submitData = {
                "id" : id,
                "userId": id2post,
                "tdTitle": tdTitle,
                "tdText": tdText,
                "tdStatus": tdStatus - 1,
                "tdActive": false,
                "tdFavorite": tdFavorite,
                "assignedByUser": JSON.parse(localStorage.getItem("items")).id,
                "assignedDate": new Date(),
                "endDate" : tdEndDate
            }
    
            console.log(submitData)
    
            const response = await fetch(api ,
                {
                    method : 'PUT',
                    headers : {
                        'Content-Type' : 'application/json'
                    },
                    body : JSON.stringify(submitData)
                })
            
            var responseData = await response.json();
    
            console.log(response)

            if(response && (submitData.userId != submitData.assignedByUser)){
                const message = `${submitData.tdTitle} Todonuz ${JSON.parse(localStorage.getItem("items")).userName} Tarafından ${id2String[tdStatus]} Pozisyonundan ${id2String[tdStatus-1]} Pozisyonuna Kaydırıldı.`
                console.log(message)

                const MessageTitle = `${submitData.tdTitle} Todonuzda Değişiklik Hakkında`
                
                 MessageSender( submitData.assignedByUser, submitData.userId, message, MessageTitle, JSON.parse(localStorage.getItem("items")).userName)
                
            }
    
            
            //localStorage.setItem("items" , JSON.stringify({id:responseData.id, userName:responseData.userName, userRole: responseData.userRole}));
            
            //navigate("/home")
            alert("Başarılıı!!")

            
    
        } catch(error) {
            console.log(error);
        }
    
    
    }

    return(
        <>
            {tdStatus !=0 &&
            <>
                    <button className="bg-blue-900 mt-6 text-white font-semibold
            py-1.5 px-3 rounded-lg mr-3 hover:bg-blue-950 duration-200" onClick={handleInput} 
            >
                <ArrowBackIcon/>
                </button>
                </>
            }
                
        </>
    )

}
export default ToLeft