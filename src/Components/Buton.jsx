import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Alert } from "@mui/material";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import StarIcon from '@mui/icons-material/Star';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';

import MessageSender from "./MessageSender";

const Buton = ({id, tdText, tdTitle, tdEndDate, tdFavorite, tdStatus, setTaskUpdate, isChange , ButtonType}) => {

    const handleEdit = () => {
        console.log("Buton çalıştı")
        setTaskUpdate(true)
    }

    const handleInput = () => {
        //TodoSubmit();t
        //console.log(id)

        //TodoFavorite();
        //handleEdit();

        ButtonPut().then(handleEdit())

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



    async function ButtonPut (ex) {
        //ex.preventDefault();
   
        const api = "http://localhost:63470/api/todo"
    
        try{
            const submitData = {
                "id" : id,
                "userId": id2post,
                "tdTitle": tdTitle,
                "tdText": tdText,
                "tdStatus": (ButtonType === "ToLeft" ? tdStatus - 1  : (ButtonType == "ToRight" ? tdStatus + 1 : tdStatus)), 
                "tdActive": false,
                "tdFavorite": (ButtonType === "Favorite" ? !tdFavorite : tdFavorite),
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
            
            const responseData = await response.json();
    
            console.log(response)

            if(response && (submitData.userId != submitData.assignedByUser)){
                if(ButtonType === "Favorite"){
                    var message = `${submitData.tdTitle} Todonuz ${JSON.parse(localStorage.getItem("items")).userName} Tarafından ${!tdFavorite ? ("Favori") : ("Favori Değil")} Olarak İşaretlendi.`
                }
                else if(ButtonType === "ToLeft")
                {
                    var message = `${submitData.tdTitle} Todonuz ${JSON.parse(localStorage.getItem("items")).userName} Tarafından ${id2String[tdStatus]} Pozisyonundan ${id2String[tdStatus-1]} Pozisyonuna Kaydırıldı.`

                }
                else
                {
                    var message = `${submitData.tdTitle} Todonuz ${JSON.parse(localStorage.getItem("items")).userName} Tarafından ${id2String[tdStatus]} Pozisyonundan ${id2String[tdStatus+1]} Pozisyonuna Kaydırıldı.`

                }

                const MessageTitle = `${submitData.tdTitle} Todonuzda Değişiklik Hakkında`

                console.log(message)
                
                 MessageSender( submitData.assignedByUser, submitData.userId, message , MessageTitle, JSON.parse(localStorage.getItem("items")).userName)
                
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
            {ButtonType == "ToLeft" ?
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
            :
            (ButtonType == "ToRight" ?
            <>
            {tdStatus != 2 &&
            <>
                    <button className="bg-blue-900 mt-6 text-white font-semibold
            py-1.5 px-3 rounded-lg ml-3 hover:bg-blue-950 duration-200" onClick={handleInput}
            >
                <ArrowForwardIcon/>
                </button>
                </>
            }
            </>
            :

            <>
            {tdFavorite ? (

                <>
                    <button className="bg-yellow-600 mt-6 text-white font-semibold
            py-1.5 px-3 rounded-lg hover:bg-yellow-800 duration-200" onClick={handleInput}
            >
                <StarIcon/>
                </button>
                </>
            
            ) : 
            <>
                    <button className="bg-gray-500 text-white mt-6 font-semibold
            py-1.5 px-3 rounded-lg hover:bg-gray-700 duration-200" onClick={handleInput}
            >
                <StarBorderOutlinedIcon/>
                </button>
                </>
            }
            </>

            )
            }
        </>
        
    )

}
export default Buton