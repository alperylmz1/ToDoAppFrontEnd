import DeleteIcon from '@mui/icons-material/Delete';

const NotifierDetails = ({senderId, receiverId, message, sentDate, messageTitle, messageStatus, notificationId, setNotifierUpdate}) => {

    
    async function NotifierDelete (ex) {
        //ex.preventDefault();
       
        const api = `http://localhost:63470/api/notification/${notificationId}`
    
        try{
    
            const response = await fetch(api ,
                {
                    method : 'DELETE',
                    headers : {
                        'Content-Type' : 'application/json'
                    },
                })
            
            
            
            alert("Başarılıı!!")
            
            //setTaskUpdate(true)

        } catch(error) {
            console.log(error);
        }
    
    
    }

    const handleEdit= () => {
        setNotifierUpdate(true)
    }

    const handleDelete = () => {
        NotifierDelete().then(handleEdit())
    }


    return(
        
        <>
            <div className="items-start justify-start ml-20 pt-5">
                <div className="flex flex-row justify-between">
                    <p className="font-bold text-l uppercase pb-5">{messageTitle}</p>
                    <p className="font-semibold text-l uppercase pb-5 mr-20">{message ? `Received Date: ${sentDate}`: null}</p>
                </div>
                <div className='flex flex-row justify-between'>
                <p>{message}</p>

                {message ? (  <>
                    <button className="bg-red-600 mt-6 text-white font-semibold
            py-1.5 px-3 rounded-lg hover:bg-red-800 duration-200 mr-20" onClick={handleDelete}
            >
                <DeleteIcon/>
                </button>
                
                </>
                ) : null}
                </div>
            </div>

        </>
    )


}
export default NotifierDetails