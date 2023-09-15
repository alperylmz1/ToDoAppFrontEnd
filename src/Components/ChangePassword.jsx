import { useState } from "react";

const ChangePassword = () => {

    const [openPassword, setOpenPassword] = useState(false);

    async function PutPassword (ex) {
        //ex.preventDefault();
   
        const api = "http://localhost:63470/api/user/changePassword"
    
        try{
            const submitData = {
                
                    "userMail" : JSON.parse(localStorage.getItem("items")).userMail,
                
                    "userPassword" : document.getElementById("sifre").value, //eski password

                    "newUserPassword" : document.getElementById("new-password").value  //yeni password


                
            }
                                      
            console.log(submitData)
    
            const response = await fetch(api ,
                {
                    method : 'POST',
                    headers : {
                        'Content-Type' : 'application/json',
                        /*'User-Mail' : document.getElementById("mail").value,  //mail
                        'User-Password' : document.getElementById("sifre").value //eski password*/
                    },
                    body : JSON.stringify(submitData)
                })
            
            var responseData = await response.json();


            console.log(responseData.userName)
    
            
            alert("Başarılıı!!")

            
    
        } catch(error) {
            console.log(error);
            alert("Kullanıcı Adı veya şifre yanlış!")
            setOpenPassword(false)
        }
    
    
    }

    const handlePut = () => {
       
        setOpenPassword(false)
    }

    const handleEdit = () => {
        PutPassword().then(handlePut)
    }

    return(
        <>
            <button className="text-lg font-semibold  bg-gray-200 px-3 py-2" onClick={() => setOpenPassword(true)}>Şifrenizi Değiştirin</button>

            {openPassword ? (
            
            <>

            <div className="flex items-center justify-center
                      overflow-x-hidden overflow-y-auto fixed inset-0 z-100
                      ">
                        <div className="w-9/12 max-w-lg bg-white  rounded-lg
                        shadow-md relative flex flex-col">
                        
                        <div className="flex flex-row justify-between
                            p-4 border-b border-slate-200 rounded-t">
                                <h3 className="bg-white text-2xl font-semibold">Şifre Değişikliği</h3>
                                <button
                                className="px-1 text-gray-400 float-right text-3xl
                                leading-none font-semibold-block"
                                onClick={() => setOpenPassword(false)}
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
                                    Yeni Şifre
                                </label>
                                <input
                                    className="w-full bg-gray-200 text-blue-700
                                    border border-gray-200 rounded py-3 px-4
                                    mb-5 leading-tight focus:outline-none
                                    focus:bg-white"
                                    id="new-password"
                                    placeholder="Yeni Şifre"
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
export default ChangePassword