import { useState } from "react";

const ChangeUserName = ({setUserName2Show}) => {

    const [openUserName, setOpenUserName] = useState(false);
    
    const [openPassword, setOpenPassword] = useState(false);


    async function PutUsername (ex) {
        //ex.preventDefault();
   
        const api = "http://localhost:63470/api/user/changeUserName"
    
        try{
            const submitData = {
                
                    /*
                    "id": JSON.parse(localStorage.getItem("items")).id,
                    "userId": 99,
                    "userMail": document.getElementById("mail").value,
                    "userName": document.getElementById("new-user-name").value,
                    "userRole": JSON.parse(localStorage.getItem("items")).userRole,
                    "userPassword": document.getElementById("sifre").value
                    */
                   "userMail": JSON.parse(localStorage.getItem("items")).userMail,
                   "newUserName": document.getElementById("new-user-name").value,
                   "userPassword": document.getElementById("sifre").value

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


            console.log(responseData.userName)

            localStorage.setItem("items" , JSON.stringify({id:responseData.id, userName:responseData.userName, userRole: responseData.userRole, userMail: JSON.parse(localStorage.getItem("items")).userMail}))
    
            
            alert("Başarılıı!!")

            
    
        } catch(error) {
            console.log(error);
            alert("Kullanıcı Adı veya şifre yanlış!")
            setOpenUserName(false)
        }
    
    
    }

    const handlePut = () => {
        setUserName2Show(JSON.parse(localStorage.getItem("items")).userName)  // yukarıda localhosta attık ama, sayfada güncel ismin çıkması için burda state e atıp sayfaya yolluyoruz.
                                                                              //böylece diğer sayfada get atmadan localden çekiyor, state ile de güncelle diyoruz.
        setOpenUserName(false)
    }

    const handleEdit = () => {
        PutUsername().then(handlePut)
    }




    return(
        <>
            <button className="text-lg font-semibold bg-gray-200 px-3 py-2" onClick={() => setOpenUserName(true)}>Kullanıcı Adınızı Değiştirin</button>

            {openUserName ? (
            
            <>

            <div className="flex items-center justify-center
                      overflow-x-hidden overflow-y-auto fixed inset-0 z-100
                      ">
                        <div className="w-9/12 max-w-lg bg-white  rounded-lg
                        shadow-md relative flex flex-col">
                        
                        <div className="flex flex-row justify-between
                            p-4 border-b border-slate-200 rounded-t">
                                <h3 className="bg-white text-2xl font-semibold">Kullanıcı Adı Değişikliği</h3>
                                <button
                                className="px-1 text-gray-400 float-right text-3xl
                                leading-none font-semibold-block"
                                onClick={() => setOpenUserName(false)}
                                >
                                x
                                </button>

                            </div>

                            <form className="px-6 pt-6 pb-4">

                                <div>
                                    <label
                                    className="track-wide
                                text-gray-700 text-s font-semibold mb-2 block"
                                htmlFor="project-name">
                                    Şifre
                                    </label>
                                    <input
                                        className="w-full bg-gray-200 text-blue-700
                                        border border-gray-200 rounded py-3 px-4
                                        mb-5 leading-tight focus:outline-none
                                        focus:bg-white" 
                                        id = "sifre"
                                        placeholder="Şifre"
                                    />
                                
                                </div>
                                <div>
                                <label className="track-wide
                                text-gray-700 text-s font-semibold mb-2 block"
                                htmlFor="project-name">
                                    Yeni Kullanıcı İsmi
                                </label>
                                <input
                                    className="w-full bg-gray-200 text-blue-700
                                    border border-gray-200 rounded py-3 px-4
                                    mb-5 leading-tight focus:outline-none
                                    focus:bg-white"
                                    id="new-user-name"
                                    placeholder="Yeni Kullanıcı İsmi"
                                    required
                                />
                                </div>


                            </form> 

                            <div className="flex justify-end p-4 border-t
                            border-slate-200 rounded-b">
                                <button
                                className="bg-blue-500 text-white font-semibold
                                border rounded text-sm px-6 py-3 hover:bg-blue-900"
                                onClick={handleEdit}
                               
                                >
                                    Onayla
                                </button>
                            </div>    

                        </div>
                            
                            
                      </div> 

            </>
            ) : null}
        </>

    )

}

export default ChangeUserName