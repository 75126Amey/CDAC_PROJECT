import { useEffect, useState } from "react";
import { getDetails } from "../services/customer";

export default function Customer(){
    const [data,setData] = useState({});
    const onLoad = async()=>{
        const response = await getDetails();
       
        setData(response.data[0]);
    };
    useEffect(()=>{
        onLoad();
    },[])
    return(
        <div><h1>{data.first_name} {data.last_name}</h1></div>
    )
}