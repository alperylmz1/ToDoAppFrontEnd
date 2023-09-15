const UserDefinerById = (setName, UserId) => {

    // bildirimleri gönderirken, sender ı sadece id olarak gönderdik, önyüzde bildirimi gösterirken, buradan id ile isimi çekip isimi göstereceğiz.



    async function UserGet (ex) {
        //ex.preventDefault();
    
        const api = `http://localhost:63470/api/user/${UserId}`
    
        try{const response = await fetch(api ,
                {
                    method : 'GET',
                    headers : {
                        'Content-Type' : 'application/json'
                    }
                })
            
            var responseData = await response.json();
    
            //console.log(responseData.userName)
    
            setName(responseData.userName)
        

            //return responseData.userName
    
        } catch(error) {
            console.log(error);
        }
        //return responseData;
    
    }

    const HandleDefine = () => {
        UserGet()
    }

    return(
        HandleDefine()
    )

}
export default UserDefinerById