import { useState } from "react"
import useInterval from "../hooks/useInterval"

const AnketModal = () => {

    const [anket, setAnket] = useState(false)
    useInterval(() => {
        setAnket(true)
    } , 30000)

    return(
        <>
            {anket ? 
            <>

                    <div className="flex items-center justify-center
                      overflow-x-hidden overflow-y-auto fixed inset-0 z-100
                      ">
                        <div className="w-9/12 max-w-lg bg-white  rounded-lg
                        shadow-md relative flex flex-col">
                        <div className="flex flex-row justify-between
                            p-5 border-b border-slate-200 rounded-t">
                                <h3 className="bg-white text-3xl font-semibold">Anket</h3>
                                <button
                                className="px-1 text-gray-400 float-right text-3xl
                                leading-none font-semibold-block"
                                onClick={() => {setAnket(false)}}

                                >
                                x
                                </button>

                            </div>
                            <div className="mt-10 mb-10 flex flex-col items-center">Uygulamayı sevdiniz mi?</div>
                            <div className="flex justify-between p-6 border-t
                            border-slate-200 rounded-b">
                                <button
                                className="bg-blue-500 text-white font-semibold
                                border rounded text-sm px-6 py-3 hover:bg-blue-900"
                              
                                >
                                    Evet
                                </button>
                                <button
                                className="bg-red-500 text-white font-semibold
                                border rounded text-sm px-6 py-3 hover:mr-20"
                              
                                >
                                    Hayır
                                </button>
                            </div>                          
                        </div>
                            
                            
                      </div> 

            </>

            :
            null}
        </> 
        
    )

}
export default AnketModal