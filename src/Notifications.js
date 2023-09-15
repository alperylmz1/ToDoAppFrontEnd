import { useEffect, useState } from "react";
import Notifiers from "./Components/Notifiers";
import NotifierDetails from "./Components/NotifierDetails";

import Sidebar from "./Components/Sidebar"

const Notifications = () => {

    const[notificationList, setNotificationList] = useState([])

    const [test, setTest] = useState("")

    const [message, setMessage] = useState("")
    const [senderId, setSenderId] = useState()
    const [receiverId, setReceiverId] = useState()
    const [messageDate, setMessageDate] = useState()
    const [messageTitle, setMessageTitle] = useState()
    const [messageStatus, setMessageStatus] = useState()
    const [notificationId, setNotificationId] = useState()

    const [notifierUpdate, setNotifierUpdate] = useState(false)

    const [unreadNot, setUnreadNot] = useState()


    useEffect(() => { 
    async function NotificicationGet (ex) {
        //ex.preventDefault();
    
        const api = `http://localhost:63470/api/notification/receiver/${JSON.parse(localStorage.getItem("items")).id}`
    
        try{const response = await fetch(api ,
                {
                    method : 'GET',
                    headers : {
                        'Content-Type' : 'application/json',
                    }
                })
            
            var responseData = await response.json();
    
            console.log(responseData)

            setNotificationList(responseData)
    
    
        } catch(error) {
            console.log(error);
        }
        //return responseData;
    
      }

      {localStorage.getItem("items") &&  
        NotificicationGet()       
                                     
      }


       setNotifierUpdate(false)

       //setUnreadNot(notificationList.filter(e => e.messageStatus === 0).length)
       

       
    } , [notifierUpdate]);
      console.log(notificationList)

    var counter_ = 0

    
    //notificationList.map((n , i) => {if( n.messageStatus === 0){counter_ ++}})

    //console.log(notificationList.filter(e => e.messageStatus === 0).length)
    localStorage.setItem("unreadCount" , notificationList.filter(e => e.messageStatus === 0).length)
    
    return(
        <>
        <div className="flex flex-row  h-screen overflow-hidden">
        <Sidebar notifierUpdate={notifierUpdate}/>
        <div className="w-full overflow-y-scroll">
            <div className="flex flex-row h-screen">
            <div className="w-full items-center">
                <h1 className = "text-3xl font-bold py-4 pl-6 mb-5">Notifications</h1>

                <div className="flex flex-row ml-10">

                <div className="flex flex-col items-center w-2/5 border-r-4 border-stone-500 max-h-screen">
                    <h1 className="text-2xl font-bold py-4 pl-6 mb-5 border-b-4">Messages</h1>
                    <div className=" overflow-y-scroll max-h-screen w-full flex flex-col items-center">

                        {notificationList.map((notification, i) => 
                            
                        <>
        
                            <Notifiers senderId={notification.senderId} receiverId={notification.receiverId} message={notification.message} sentDate={notification.sentDate.split("T")[0]} 
                            messageTitle={notification.messageTitle}  messageStatus={notification.messageStatus} notificationId={notification.id}
                            setTest = {setTest} setSenderId={setSenderId} setMessage={setMessage} setReceiverId={setReceiverId} setMessageDate={setMessageDate}
                            setMessageTitle={setMessageTitle} setMessageStatus={setMessageStatus} setNotificationId={setNotificationId} setNotifierUpdate={setNotifierUpdate}/>
                        </> 
                        
                        )}
                    </div>


                </div>

                <div className="flex flex-col w-full">
                    
                    <div className="flex flex-col items-center">
                        <h1 className="text-2xl font-bold py-4 pl-6 mb-5 border-b-4">Message Detail</h1>
                    </div>

                    <div>
                        <NotifierDetails senderId={senderId} receiverId={receiverId} message={message} sentDate={messageDate} messageTitle={messageTitle}
                        messageStatus={messageStatus} notificationId={notificationId} setNotifierUpdate={setNotifierUpdate}/>
                    </div>

                </div>
                
                </div>
            </div>
            </div>
            </div>
            </div>
        </>
    )

}
export default Notifications