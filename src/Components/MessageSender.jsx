const MessageSender = (SenderId, ReceiverId, Message, MessageTitle, SenderName) => {

    async function SendMessage (ex) {
        //ex.preventDefault();
        
        const api = "http://localhost:63470/api/notification"
    
        try{
            const submitData = {
                    "SenderId" : SenderId,
                    "ReceiverId" : ReceiverId,
                    "Message" : Message,
                    "MessageTitle" : MessageTitle,
                    "MessageStatus" : 0,
                    "SentDate" : new Date(),
                    "SenderName" : SenderName
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
    
            
            //localStorage.setItem("items" , JSON.stringify({id:responseData.id, userName:responseData.userName, userRole: responseData.userRole}));
            
            //navigate("/home")
            //alert("Başarılıı!!")

            //SetAddModal(false)
    
        } catch(error) {
            console.log(error);
        }

    
    }    

    const handleSend =() => {
        SendMessage()
    }

    return (
        handleSend()
    )


}
export default MessageSender