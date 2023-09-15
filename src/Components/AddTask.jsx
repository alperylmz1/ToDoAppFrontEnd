import { useState  } from "react";
import MessageSender from "./MessageSender";
//import { json, useNavigate } from "react-router-dom";

const AddTask = ({isChange, taskUpdate, setTaskUpdate}) => {

    //const navigate = useNavigate();

    const [addModal, SetAddModal] = useState(false);


    const handleAdd = () => {
        setTaskUpdate(true)
        SetAddModal(false)
    }

    const handleInput = () => {
        if(document.getElementById("project-name").value && document.getElementById("task-description").value && document.getElementById("deadline").value){
        TodoSubmit().then(handleAdd())
        }
        else{
            alert("Proje İsmi ve Açıklaması Boş Bırakılamaz!")
        }
    }

    var id2post = JSON.parse(localStorage.getItem("items")).id
    if(isChange){                           //eğer ChoseUser komponentinden bir bilgi geldiyse, o bilgiye göre fetch yap diyoruz.
        id2post = isChange
      }


    async function TodoSubmit (ex) {
        //ex.preventDefault();
        console.log("Buton")
    
        console.log(document.getElementById("project-name").value , document.getElementById("task-description").value)
        console.log(document.getElementById("deadline").value)
    
        const api = "http://localhost:63470/api/todo"
    
        try{
            const submitData = {
                "userId": id2post,
                "tdTitle": document.getElementById("project-name").value ,
                "tdText": document.getElementById("task-description").value,
                "tdStatus": 0,
                "tdActive": false,
                "tdFavorite": false,
                "assignedByUser": JSON.parse(localStorage.getItem("items")).id,
                "assignedDate": new Date(),
                "endDate" : document.getElementById("deadline").value
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

            if(response && (submitData.userId != submitData.assignedByUser)){
                const message = `${submitData.tdTitle} Todosu ${JSON.parse(localStorage.getItem("items")).userName} Tarafından Tablonuza Eklendi.`
                console.log(message)
                
                const MessageTitle = `${submitData.tdTitle} Todonuzda Değişiklik Hakkında`

                 MessageSender( submitData.assignedByUser, submitData.userId, message, MessageTitle, JSON.parse(localStorage.getItem("items")).userName)
                
            }
    
            alert("Başarılıı!!")

            SetAddModal(false)
    
        } catch(error) {
            console.log(error);
        }
    
    
    }


    return (
        <>
            <button className="bg-blue-500 text-white uppercase text-sm
            font-semibold py-1.5 mx-1.5 pl-2 pr-2.5 rounded 
            hover:bg-blue-900 ml-16 duration-200"
            type="button"
            onClick={() => SetAddModal(true)}
            >
                New Todo
            </button>
            {addModal ? (
                <>
                      <div className="flex items-center justify-center
                      overflow-x-hidden overflow-y-auto fixed inset-0 z-100 bg-gray-200 bg-opacity-80
                      ">
                        <div className="w-9/12 max-w-lg bg-white  rounded-lg
                        shadow-md relative flex flex-col">
                        <div className="flex flex-row justify-between
                            p-5 border-b border-slate-200 rounded-t">
                                <h3 className="bg-white text-3xl font-semibold">Add New Todo</h3>
                                <button
                                className="px-1 text-gray-400 float-right text-3xl
                                leading-none font-semibold-block"
                                onClick={() => SetAddModal(false)}
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
                                        placeholder="Task description"
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
                                    defaultValue = {new Date().toJSON().split("T")[0]}
                                    required
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
                                    Add Task
                                </button>
                            </div>                          
                        </div>
                            
                            
                      </div> 
                </>
            ) : null}
        </>
    );
}

export default AddTask