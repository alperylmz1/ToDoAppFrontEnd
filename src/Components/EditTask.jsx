import { useState } from "react"

import EditIcon from '@mui/icons-material/Edit';

import MessageSender from "./MessageSender";

const EditTask = ({id, tdText, tdTitle, tdEndDate, tdFavorite, tdStatus, setTaskUpdate, isChange}) => {

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
        setEditModal(false)
    }

    const handleInput = () => {
        //TodoSubmit();t
        //console.log(id)

        //TodoUpdate();
        //handleEdit();
        if(document.getElementById("project-name").value && document.getElementById("task-description").value && document.getElementById("deadline").value){
        TodoUpdate().then(handleEdit())
        }
        else{
            alert("Proje İsmi ve Açıklaması Boş Bırakılamaz!")
        }

    }

    
    var id2post = JSON.parse(localStorage.getItem("items")).id
    if(isChange){                           //eğer ChoseUser komponentinden bir bilgi geldiyse, o bilgiye göre fetch yap diyoruz.
        id2post = isChange
      }


    async function TodoUpdate (ex) {
        //ex.preventDefault();
       
    
        console.log(document.getElementById("project-name").value , document.getElementById("task-description").value)
    
    
        const api = "http://localhost:63470/api/todo"
    
        try{
            const submitData = {
                "id" : id,
                "userId": id2post,
                "tdTitle": document.getElementById("project-name").value ,
                "tdText": document.getElementById("task-description").value,
                "tdStatus": tdStatus,
                "tdActive": false,
                "tdFavorite": tdFavorite,
                "assignedByUser": JSON.parse(localStorage.getItem("items")).id,
                "assignedDate": new Date(),
                "endDate" : document.getElementById("deadline").value
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
                const message = `${submitData.tdTitle} Todonuz ${JSON.parse(localStorage.getItem("items")).userName} Tarafından Yeniden Düzenlendi.`
                console.log(message)
                
                const MessageTitle = `${submitData.tdTitle} Todonuzda Değişiklik Hakkında`

                 MessageSender( submitData.assignedByUser, submitData.userId, message, MessageTitle, JSON.parse(localStorage.getItem("items")).userName)
                
            }
    
            
            //localStorage.setItem("items" , JSON.stringify({id:responseData.id, userName:responseData.userName, userRole: responseData.userRole}));
            
            //navigate("/home")
            alert("Başarılıı!!")

            setEditModal(false)
    
        } catch(error) {
            console.log(error);
        }
    
    
    }



    const clickEditButton = () => {  // todo daki mavi edit butonuna basınca, hem edit modalini true ye çevirerek görünür yapıyor, hem de id yi en başta elde etmemi sağlıyor.
        console.log(id)
        //console.log(tdEndDate.split("T")[0])

        //const ss = id
        setIdVal(id)
        setTextVal(tdText)
        setTitleVal(tdTitle)
        setEnddateVal(tdEndDate)
        setTdStatusVal(tdStatus)
        //document.getElementById("task-description").innerHTML = "alper"
        setEditModal(true)

        //burda id update request için alınacak. Default value gösterimi için iki yol var, ya Appjs den ToDo ya, ToDo dan EditTask a state ile gönderecem, ya da burada id ile get 
        //request atacağım. Karar vermedim henüz. 
        //İlkini seçtim.
    }

    return(
        <>
            <button className="bg-blue-700 text-white font-semibold
            py-1.5 px-3 rounded-lg hover:bg-blue-900 duration-200" onClick={clickEditButton}
            >
                <EditIcon/>
            </button>

            {editModal ? (

                <>
                    <div className="flex items-center justify-center
                      overflow-x-hidden overflow-y-auto fixed inset-0 z-100
                      ">
                        <div className="w-9/12 max-w-lg bg-white  rounded-lg
                        shadow-md relative flex flex-col">
                        <div className="flex flex-row justify-between
                            p-5 border-b border-slate-200 rounded-t">
                                <h3 className="bg-white text-3xl font-semibold">Edit Todo</h3>
                                <button
                                className="px-1 text-gray-400 float-right text-3xl
                                leading-none font-semibold-block"
                                onClick={() => setEditModal(false)}
                                >
                                x
                                </button>

                            </div>
                            <form className="px-6 pt-6 pb-4">
                                <div>
                                <label className="track-wide uppercase
                                text-gray-700 text-s font-semibold mb-2 block"
                                htmlFor="project-name">
                                    Project Name
                                </label>
                                <input
                                    className="w-full bg-gray-200 text-blue-700
                                    border border-gray-200 rounded py-3 px-4
                                    mb-5 leading-tight focus:outline-none
                                    focus:bg-white"
                                    id="project-name"
                                    type="text"
                                    placeholder="Project Name"
                                    defaultValue={tdTitle}
                                    required 
                                />
                                </div>
                                <div>
                                    <label
                                    className="track-wide uppercase
                                text-gray-700 text-s font-semibold mb-2 block"
                                htmlFor="project-name">
                                    Task Description
                                    </label>
                                    <textarea
                                        className="w-full bg-gray-200 text-blue-700
                                        border border-gray-200 rounded py-3 px-4
                                        mb-5 leading-tight focus:outline-none
                                        focus:bg-white" 
                                        id = "task-description"
                                        rows = "5"
                                        //placeholder="Task description"
                                        defaultValue={tdText}     //aldığımız id yi state e koyup yukarıdan çekebildik.
                                    />
                                
                                </div>
                                
                                <div>
                                <label className="track-wide uppercase
                                text-gray-700 text-s font-semibold mb-2 block"
                                htmlFor="project-name">
                                    DEADLINE
                                </label>
                                <input
                                    className="w-full bg-gray-200 text-blue-700
                                    border border-gray-200 rounded py-3 px-4
                                    mb-5 leading-tight focus:outline-none
                                    focus:bg-white"
                                    id="deadline"
                                    type="date"
                                    //placeholder="Project Name"
                                    defaultValue={tdEndDate.split("T")[0]}
                                    required = "required"
                                />
                                </div>

                            </form> 
                            <div className="flex justify-end p-6 border-t
                            border-slate-200 rounded-b">
                                <button
                                className="bg-blue-500 text-white font-semibold
                                border rounded text-sm px-6 py-3 hover:bg-blue-900"
                                onClick={handleInput}
                                >
                                    Edit Todo
                                </button>
                            </div>                          
                        </div>
                            
                            
                      </div> 
                </>
            
            ) : null}
        </>
    )

}
export default EditTask


