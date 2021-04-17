import { useEffect } from "react";
import { useState } from "react";
const Clock = () =>{
  const [date, setDate] = useState(new Date());
    useEffect(() => {
        const timer = setInterval(() => setDate(new Date()), 1000);
        return function cleanup() {
          clearInterval(timer);
        };
      },[]);
      return <>{date.toLocaleTimeString()}</>
}

export default Clock