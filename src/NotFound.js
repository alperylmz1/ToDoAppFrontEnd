import { useNavigate } from "react-router-dom";
import Buton from "./Components/Buton";

const NotFound = () => {

    const navigate = useNavigate();

    const matrix_ = () => {

        const canvas = document.getElementById('canv');
        const ctx = canvas.getContext('2d');
        
        const w = canvas.width = document.body.offsetWidth;
        const h = canvas.height = document.body.offsetHeight;
        const cols = Math.floor(w / 20) + 1;
        const ypos = Array(cols).fill(0);
        
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, w, h);
        
        function matrix () {
          ctx.fillStyle = '#0001';
          ctx.fillRect(0, 0, w, h);
          
          ctx.fillStyle = '#0f0';
          ctx.font = '15pt monospace';
          
          ypos.forEach((y, ind) => {
            const text = "404";
            const x = ind * 20;
            ctx.fillText(text, x, y);
            if (y > 100 + Math.random() * 10000) ypos[ind] = 0;
            else ypos[ind] = y + 20;
          });
        }
        
        setInterval(matrix, 100);
        }

        return(
        <div className="w-100 h-screen">
        <canvas id = "canv" className="h-76 w-76">
        
            {setTimeout(() => {
                matrix_()
            },100)}
    
        </canvas>

        <div className="w-screen  flex items-center flex-column justify-center absolute bottom-0 top-0 z-50 text-gray-100">

        <div className="flex justify-center bg-opacity-50 bg-black w-1/2">
            <div className="w-2/3 h-screen">
                <div className="flex flex-row items-center justify-center h-1/5 pt-20">
                    <h2 className="text-2xl">Aradığınız sayfa yok gibi görünüyor...</h2>
                </div>
                <div className="flex flex-row items-center justify-center h-3/5">
                    <h2 className="text-9xl/[55px] font-bold">404</h2>
                </div>
                <div className="flex flex-row items-center justify-center h-1/5 pb-20">
                    <h2 className="cursor-pointer underline text-2xl" onClick={() => {navigate("/home")}}>Anasayfaya dönün</h2>
                </div>
            </div>
            </div>
            </div>
        
        </div>
        )


}
export default NotFound