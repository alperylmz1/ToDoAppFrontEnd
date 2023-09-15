import { useState } from "react"
import StarIcon from '@mui/icons-material/Star';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';

import MessageSender from "./MessageSender";


const FavoriteTask = ({id, tdText, tdTitle, tdEndDate, tdFavorite, tdStatus, setTaskUpdate, isChange}) => {


    const [editModal, setEditModal] = useState(false);
    const [idVal , setIdVal] = useState() //bu
    const [textVal , setTextVal] = useState() //bu 
    const [titleVal , setTitleVal] = useState() //ve bu, bu üçü şuan kullanılmıyor, yazarken ihtiyaç olabileceğini düşünmüştüm, ama aşağıda html'de direk state üzerinden de çekebildim, gerek kalmadı. Yine de dursun.
                                                // edit isteklerinin boş yere olmamasını, değişklik olup olmadığı denetlemek için karşılaştırma için kullanabiliriz.
    const [enddateVal , setEnddateVal] = useState() //bu da öyle

    const [tdFavoriteVal , setTdFavoriteVal] = useState()

    const [tdStatusVal , setTdStatusVal] = useState()


    const handleEdit = () => {
        setTaskUpdate(true)
    }

    const handleInput = () => {
        //TodoSubmit();t
        //console.log(id)

        //TodoFavorite();
        //handleEdit();

        TodoFavorite().then(handleEdit())

    }

    var id2post = JSON.parse(localStorage.getItem("items")).id
    if(isChange){                           //eğer ChoseUser komponentinden bir bilgi geldiyse, o bilgiye göre fetch yap diyoruz.
        id2post = isChange
      }

    async function TodoFavorite (ex) {
        //ex.preventDefault();
   
        const api = "http://localhost:63470/api/todo"
    
        try{
            const submitData = {
                "id" : id,
                "userId": id2post,
                "tdTitle": tdTitle,
                "tdText": tdText,
                "tdStatus": tdStatus,
                "tdActive": false,
                "tdFavorite": !tdFavorite,
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
                const message = `${submitData.tdTitle} Todonuz ${JSON.parse(localStorage.getItem("items")).userName} Tarafından ${!tdFavorite ? ("Favori") : ("Favori Değil")} Olarak İşaretlendi.`
                
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

export default FavoriteTask