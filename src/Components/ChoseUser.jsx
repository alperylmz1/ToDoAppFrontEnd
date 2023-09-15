import { useEffect, useState } from "react"

const ChoseUser = ({setIsChange, setTaskUpdate}) => {

    const [userList, setUserList] = useState([]);

    const [chosenUser, setChosenUser] = useState();

    //const id={JSON.parse(localStorage.getItem("items")).id} 
    const userRole = JSON.parse(localStorage.getItem("items")).userRole
    
   useEffect(() => {

    async function UserGet (ex) {
        //ex.preventDefault();
    
        const api = 'http://localhost:63470/api/user'
    
        try{const response = await fetch(api ,
                {
                    method : 'GET',
                    headers : {
                        'Content-Type' : 'application/json'
                    }
                })
            
            var responseData = await response.json();
    
            console.log(responseData)
    
            
            //localStorage.setItem("items" , JSON.stringify({id:responseData.id, userName:responseData.userName, userRole: responseData.userRole}));
            
            //navigate("/home")  17:22
            
            setUserList(responseData)
    
        } catch(error) {
            console.log(error);
        }
        //return responseData;
    
    
    }
    {localStorage.getItem("items") &&   //BURASI ÖNEMLİ. İLK YAPTIĞIMDA BURDA BU KOŞUL YOKTU. ANCAK ŞİMDİ, LOGİN BİLGİLERİ LOCAL STORAGE DE TUTULUYOR. EĞER STORAGE DE YOKSA BU SAYFA
    UserGet()                           //ÇALIŞMAMALI VE LOGİN SAYFASINA ATMALI, ÇÜNKÜ KULLANICI GİRİŞ YAPMAMIŞTIR. BUNU ZATEN YUKARIDA EN BAŞTA YAPTIK, ANCAK REACT TÜM 
                                      //KODLARI RENDERLADIĞI İÇİN BURAYA DA GELİYORDU, ID DEĞERİ OLMADIĞI HALDE APİ YE YAZIP REQUEST ATMAYA ÇALIŞIYORDU. BURDA ONU ÖNLEDİK.
  //UserGet()                           //bunu sonradan ekledim, user id leri dropdown menüye almak için, bu fonksiyon bir yerlerde çağırlmalıydı.

    };       
    },  [userRole])

    console.log(userList)
    //console.log(id)
    //setDeneme(false)

    const handleChange = (e) => {
        console.log(e.target.value)
        setChosenUser(e.target.value)
        setIsChange(e.target.value)
        setTaskUpdate(true)

    }
    
    
    return(
        <>
            {JSON.parse(localStorage.getItem("items")).userRole === 1  &&
            
            <>
                <div className="mr-20 font-medium border-2 border-green-900 rounded">
                    <select onChange={handleChange}>

                        <option>Kullanıcı Seçiniz</option>
                        {userList.map((user , i) => 
                        {return <option key={user.id} value={user.id}>{user.userName}</option>}
                        )}
                    </select>

                </div>
            </>
            }
        </>
    )



}
export default ChoseUser


/*
<div className="mr-20">
  
    <select>
    {userList.map((user, i) => 
    {return <option>{user.userName}</option>}
    )}
    </select>

</div>
*/