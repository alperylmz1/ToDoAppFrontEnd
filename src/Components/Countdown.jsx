import { useEffect, useState } from "react"

const Countdown = () => {

    const [count, setCount] = useState(0)

    useEffect = (() => {

        const interval = setInterval(() => {
            setCount(count +1);
        } , 1000);

        return () => clearInterval(interval);
    
    }, [count]);

    return <h1>{count}</h1>;

}
export default Countdown