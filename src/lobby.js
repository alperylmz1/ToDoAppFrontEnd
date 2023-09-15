import { useEffect, useState } from "react"
import MessageSender from "./Components/MessageSender"
import UserDefinerById from "./Components/UserDefinerById"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ChangeUserName from "./Components/ChangeUserName";
import ChangePassword from "./Components/ChangePassword";

import Sidebar from "./Components/Sidebar"
import useInterval from "./hooks/useInterval";
import AnketModal from "./Components/AnketModal";

const Lobby = () => {


    const [todoList, setTodoList] = useState([]);

    const [userName2Show , setUserName2Show] = useState(JSON.parse(localStorage.getItem("items")).userName);
    
    const [deneme, setDeneme] = useState()

   /* useEffect(() => {

        //setDeneme(userName2Show)
        //console.log(userName2Show)

    }, [userName2Show])*/

////////////////////////////////////////////////////////////////////////////////////////////////////////

    
async function TodoGet (ex) {
    //ex.preventDefault();

    const api = `http://localhost:63470/api/todo/user/${JSON.parse(localStorage.getItem("items")).id}`

    try{const response = await fetch(api ,
            {
                method : 'GET',
                headers : {
                    'Content-Type' : 'application/json',
                }
            })
        
        var responseData = await response.json();

        console.log(responseData)

        
        setTodoList(responseData)



    } catch(error) {
        console.log(error);
    }
    return responseData;

  }

      const date = new Date()
      
      const i1 = 0;
      const i2 = 0;
      const i3 = 0;
      const i4 = 0;
      
      useEffect(() => {
        TodoGet().then(console.log(todoList))
        //console.log(todoList)

        const i1 = todoList.filter(e => e.tdStatus === 2).length
        const i2 = (i1 / todoList.length) * 100
        const i3 = todoList.filter(e => e.tdStatus !== 2).length
        const i4 = todoList.filter(e => e.tdFavorite === 1).length
        //const i5 = todoList.filter(e => e.assignedDate.getMonth() === date.getMonth()).length

      console.log(i1, i2, i3, i4)

      } , []);

      console.log(todoList)

      


    const [countN , setCountN] = useState()

    const counter = (minimum, maximum) => {
        for (let count = minimum; count<= maximum; count++)
        {
            setTimeout(() =>{
                setCountN(count)
            }, 1000)
        }
    }

    const [toplamTodo, setToplamTodo] = useState(0)
    useInterval(() => {
        if (toplamTodo < todoList.length)
        {
            setToplamTodo(toplamTodo + 1)
        }
    } , 100)

    const [tamamlamaOran, setTamamlamaOran] = useState(0)
    useInterval(() => {
        if (tamamlamaOran < (todoList.filter(e => e.tdStatus === 2).length / (todoList.length) * 100).toFixed(2))
        {
            setTamamlamaOran((tamamlamaOran + 1))
        }
    } , 40)

    const [tamamlananTodo, setTamamlananTodo] = useState(0)
    useInterval(() => {
        if (tamamlananTodo < (todoList.filter(e => e.tdStatus === 2).length))
        {
            setTamamlananTodo((tamamlananTodo + 1))
        }
    } , 100)

    const [favoriTodo, setFavoriTodo] = useState(0)
    useInterval(() => {
        if (favoriTodo < (todoList.filter(e => e.tdFavorite === true).length))
        {
            setFavoriTodo((favoriTodo + 1))
        }
    } , 100)

    const [ayEklenenTodo, setAyEklenenTodo] = useState(0)
    useInterval(() => {
        if (ayEklenenTodo < (todoList.filter(e => new Date(e.assignedDate).getMonth() === date.getMonth()).length))
        {
            setAyEklenenTodo((ayEklenenTodo + 1))
        }
    } , 100)

    
    const [aktifTodo, setAktifTodo] = useState(0)
    useInterval(() => {
        if (aktifTodo < (todoList.filter(e => e.tdStatus !== 2).length))
        {
            setAktifTodo((aktifTodo + 1))
        }
    } , 100)

  

    return(
        (todoList ?
        <>
        <div className="flex flex-row h-screen overflow-hidden ">
        <Sidebar/>
        <div className="w-full overflow-y-scroll">
            <div className="bg-gradient-to-r from-green-600 to-blue-500 animate-text pb-10 border-b-8 border-green-800">

                <div className="flex flex-row justify justify-center  duration-800">
                    <div className="flex flex-row mt-20  justify justify-center rounded-full">
                        {/*<h1 className="justify-center  pb-5" ><AccountCircleIcon fontSize="large"/></h1>*/}
                        <img src={ require("./undfPp.JPG")} alt=""  className="border-4 border-green-900 rounded-full w-content h-40 w-40 items-center justify-center shadow-lg" />

                    </div>
                </div>

                <div className="flex flex-row justify justify-center pt-5">
                    <div className="text-3xl font-semibold flex flex-row">
                        <h1 className="uppercase">{userName2Show}</h1>
                    </div>
                </div>

            </div>

            <div className="flex flex-row  justify-center pt-10 pb-15">
                <div className="flex flex-col w-1/3 items-center">
                    <h1 className="font-semibold text-lg">Tamamladığınız Todo Sayısı</h1>
                    <h1 className="font-bold text-7xl pt-8" id="i1">{todoList ? tamamlananTodo: '?'}</h1>
                </div>

                <div className="flex flex-col w-1/3 items-center">
                    <h1 className="font-semibold text-lg">Tamamlama Oranı</h1>
                    <h1 className="font-bold text-7xl pt-8">%{todoList ? tamamlamaOran : '?'}</h1>
                    {/*
                    <ResponsiveContainer width={400} height={150} aspect={2}>
        <PieChart width={200} height={200}>
          <Pie
            dataKey="value"
            isAnimationActive={true}
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            label
            width= "200"
          />
          <Tooltip/>
          
        </PieChart>
        </ResponsiveContainer>
                </div>
                    
                    */}
                </div>

                <div className="flex flex-col w-1/3 items-center">
                    <h1 className="font-semibold text-lg">Toplam Todo Sayısı</h1>
                    <h1 className="font-bold text-7xl pt-8">{todoList ? toplamTodo : '?'}</h1>
                </div>
            </div>

            <div className="flex flex-row  justify-center pt-20 pb-15">
                <div className="flex flex-col w-1/3 items-center">
                    <h1 className="font-semibold text-lg">Favori Todo Sayısı</h1>
                    <h1 className="font-bold text-7xl pt-8">{todoList ? favoriTodo : '?'}</h1>
                </div>

                <div className="flex flex-col w-1/3 items-center">
                    <h1 className="font-semibold text-lg">Bu ay eklenen Todo Sayısı</h1>
                    <h1 className="font-bold text-7xl pt-8">{todoList ? ayEklenenTodo : '?'}</h1>
                </div>

                <div className="flex flex-col w-1/3 items-center">
                    <h1 className="font-semibold text-lg">Aktif Todo Sayısı</h1>
                    <h1 className="font-bold text-7xl pt-8">{todoList ? aktifTodo : '?'}</h1>
                </div>
            </div>


            

        </div>
        </div>
        </>
    : null)) 
}
export default Lobby