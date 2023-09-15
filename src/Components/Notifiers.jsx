import DraftsIcon from '@mui/icons-material/Drafts';
import MarkunreadIcon from '@mui/icons-material/Markunread';

const Notifiers = ({senderId, receiverId, message, sentDate, messageTitle, messageStatus, notificationId ,setTest, setSenderId, setReceiverId, setMessage, setMessageDate, 
    setMessageTitle, setMessageStatus, setNotificationId, setNotifierUpdate}) => {

        async function NotificationRead (ex) {
            //ex.preventDefault();
       
            const api = "http://localhost:63470/api/notification"
        
            try{
                const submitData = {
                    "id" : notificationId,
                    "senderId" : senderId,
                    "receiverId" : receiverId,
                    "messageTitle" : messageTitle,
                    "messageStatus" : 1,
                    "message" : message,
                    "sentDate" : sentDate
                    
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
        
            } catch(error) {
                console.log(error);
            }
        
        
        }







    const handleClick =() => {
        setSenderId(senderId)
        setReceiverId(receiverId)
        setMessage(message)
        setMessageDate(sentDate)
        setMessageTitle(messageTitle)
        setMessageStatus(messageStatus)
        setNotificationId(notificationId)

        if(messageStatus === 0){
            NotificationRead().then(setNotifierUpdate(true))
        }

        
    }


    return (
    
    <div className={`flex flex-col ${messageStatus ? 'bg-gray-200' : 'bg-gray-400'}  items-start justify-start my-4 py-4 px-6 w-3/4 max-w-lg rounded-l cursor-pointer hover:bg-white-300
     `}
    
    onClick={handleClick}>  
            
            <div className="w-full flex flex-row justify-between ">
                <p className="font-semibold text-xl">{messageTitle}</p>
            
                <p className={`text-m pt-1 flex flex-row justify-between`}>{messageStatus ? <DraftsIcon/> : <MarkunreadIcon style={{color: '#0d85d4'}}/>}</p>
            </div>
    </div>
    )

}
export default Notifiers