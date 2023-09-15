import AddTask from "./Components/AddTask";
import ToDo from "./Components/ToDo";

import Sidebar from "./Components/Sidebar"

import "./home.css"

import { useEffect, useState  } from "react";

import { json, useNavigate } from "react-router-dom";
import { Select } from "@mui/material";
import ChoseUser from "./Components/ChoseUser";
import SortChange from "./SortChange";

import { DndProvider, useDrop} from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

function Home() {

  const [taskList, setTaskList] = useState([]);
  const [taskUpdate , setTaskUpdate] = useState(false);



  const [completed, setCompleted] = useState([])


  const [userList, setUserList] = useState([]);

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const [isShow, setisShow] = useState(false)

  const [isChange, setIsChange] = useState()

  const [sortPref , setSortPref] = useState()
  

  const navigate = useNavigate();
    useEffect(() => {                                   //Bu alanda, localstorage de kayıt yoksa sayfayı görmesine izin vermemek
        if(!localStorage.getItem("items"))              //ve login sayfasına atmayı sağladık.
            {
                navigate("/login");
                console.log(1)
            }
        else{
            
        }
    } , [])

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  console.log(taskUpdate)

  //var userId = JSON.parse(localStorage.getItem("items"))  // JSONstringify dan böyle pars ederek çekiyoruz.
  //console.log(userId.id)

  /*var id2fetch = JSON.parse(localStorage.getItem("items")).id

  if(isChange){                           //eğer ChoseUser komponentinden bir bilgi geldiyse, o bilgiye göre fetch yap diyoruz.
    id2fetch = isChange
  }*/

  useEffect(()=> {
  async function TodoGet (ex) {
    //ex.preventDefault();

    const api = `http://localhost:63470/api/todo/user/${id2fetch}`

    try{const response = await fetch(api ,
            {
                method : 'GET',
                headers : {
                    'Content-Type' : 'application/json',
                    'Sort-Pref' : sortPref
                }
            })
        
        var responseData = await response.json();

        console.log(responseData)

        
        //localStorage.setItem("items" , JSON.stringify({id:responseData.id, userName:responseData.userName, userRole: responseData.userRole}));
        
        //navigate("/home")  17:22
        
        setTaskList(responseData)



    } catch(error) {
        console.log(error);
    }
    //return responseData;

  }
  {localStorage.getItem("items") &&  //BURASI ÖNEMLİ. İLK YAPTIĞIMDA BURDA BU KOŞUL YOKTU. ANCAK ŞİMDİ, LOGİN BİLGİLERİ LOCAL STORAGE DE TUTULUYOR. EĞER STORAGE DE YOKSA BU SAYFA
  TodoGet()       
                                     //ÇALIŞMAMALI VE LOGİN SAYFASINA ATMALI, ÇÜNKÜ KULLANICI GİRİŞ YAPMAMIŞTIR. BUNU ZATEN YUKARIDA EN BAŞTA YAPTIK, ANCAK REACT TÜM 
                                      //KODLARI RENDERLADIĞI İÇİN BURAYA DA GELİYORDU, ID DEĞERİ OLMADIĞI HALDE APİ YE YAZIP REQUEST ATMAYA ÇALIŞIYORDU. BURDA ONU ÖNLEDİK.

  //UserGet()                           //bunu sonradan ekledim, user id leri dropdown menüye almak için, bu fonksiyon bir yerlerde çağırlmalıydı.

};       
  setTaskUpdate(false);
  //setTaskUpdate(false);                
  } , [taskUpdate]);
  //setTaskList(responseDataaa)

    

  /*async function UserGet (ex) {
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

  }*/

  //console.log(userList)

  if(localStorage.getItem("items")){
    var id2fetch = JSON.parse(localStorage.getItem("items")).id

    if(isChange){                           //eğer ChoseUser komponentinden bir bilgi geldiyse, o bilgiye göre fetch yap diyoruz.
    id2fetch = isChange
  } 

    var pref2fetch = 0
    if(sortPref){
    pref2fetch = sortPref
    }
  }
  

  
  console.log(pref2fetch)


  /*
  const [{isOver}, drop] = useDrop(() => ({
    accept: "todo",
    drop: (item) => addToCompleted(item.id, item.tdTitle),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    })
  }))

  const addToCompleted = (id, tdTitle) => {
    console.log(id, tdTitle)
  }
  */
    
  return (
    <>

    {localStorage.getItem("items") && (

      <>
    

    <div className="flex flex-row  h-screen overflow-hidden">
      <Sidebar />
      <div className="w-full overflow-y-scroll">
      <h1 className = "text-3xl font-bold py-4 pl-6 mb-5">TODO BOARD</h1>
      
      <div className="flex flex-row justify-between w-full">

        
      
      <AddTask taskUpdate={taskUpdate} setTaskUpdate={setTaskUpdate} isChange={isChange}/>


      <SortChange setSortPref={setSortPref} setTaskUpdate={setTaskUpdate}/>
      
      
      <ChoseUser setTaskUpdate={setTaskUpdate} setIsChange = {setIsChange}/>

      </div>
      
      <div className="flex flex-row">
        <div className="w-full flex flex-col items-center max-h-screen">
         
      <h2 className="text-xl font-semibold w-3/4 max-w-lg my-4
      py-2 px-4 bg-indigo-300 
      text-center rounded-2xl">To Do</h2>
       <div className=" overflow-y-scroll w-full flex flex-col items-center">

      {taskList.map((todo, i) => 
        todo.tdStatus == 0 && (
        <>
        
        <ToDo key={i} id = {todo.id} tdTitle = {todo.tdTitle} tdText={todo.tdText} tdEndDate={todo.endDate} tdFavorite={todo.tdFavorite} tdStatus={todo.tdStatus} index = {i}
        setTaskUpdate={setTaskUpdate} taskUpdate={taskUpdate} tdUserId={todo.userId} isChange={isChange}/>
        </> 
        )
      )}
      </div>
      </div>

      <div className="w-full flex flex-col border-x-4 border-stone-500 items-center max-h-screen">
      <h2 className="text-xl font-semibold w-3/4 max-w-lg my-4
      py-2 px-4 bg-red-300 
      text-center rounded-2xl">Active</h2>
      <div className=" overflow-y-scroll w-full flex flex-col items-center">
      
        {taskList.map((todo, i) => 
        todo.tdStatus == 1 && (
        <>
        
        <ToDo key={i} id = {todo.id} tdTitle = {todo.tdTitle} tdText={todo.tdText} tdEndDate={todo.endDate} tdFavorite={todo.tdFavorite} tdStatus={todo.tdStatus} index = {i}
        setTaskUpdate={setTaskUpdate} taskUpdate={taskUpdate} isChange={isChange}/>
        </> 
        )
      )}

      </div>
      </div>

      <div className="w-full flex flex-col items-center max-h-screen">
      <h2 className="text-xl font-semibold w-3/4 max-w-lg my-4
      py-2 px-4 bg-gray-300 
      text-center rounded-2xl">Completed</h2>  
      <div className=" overflow-y-scroll w-full flex flex-col items-center">

        {taskList.map((todo, i) => 
        todo.tdStatus == 2 && (
        <>
        
        <ToDo key={i} id = {todo.id} tdTitle = {todo.tdTitle} tdText={todo.tdText} tdEndDate={todo.endDate} tdFavorite={todo.tdFavorite} tdStatus={todo.tdStatus} index = {i}
        setTaskUpdate={setTaskUpdate} taskUpdate={taskUpdate} isChange={isChange}/>
        </> 
        )
      )}
      </div>

      </div>

      </div>
      </div>
      </div>
      </>
      )}
    </> 

  );
}

export default Home;


//NOT: AddTask componenti ile endpointi kullanıp db ye post atabiliyoruz. 

//düşünceme göre, AddTask componenti içinde get all diyerek hepsini çekip App dosyasına göndermek iyi olacaktı.

//bunun için videodaki gibi setState(response) ile AddTask dan App e göndermeyi düşündüm ancak başarıya ihtiyaç var.

//yarın buna bakalım.