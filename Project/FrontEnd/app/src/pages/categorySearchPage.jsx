import { useLocation, useParams } from "react-router-dom";
import { getBooksBySearchTerm } from "../services/book";
import { useEffect, useState } from "react";
import SearchResult from "./SearchResult";
import { useSelector } from "react-redux";
import axios from "axios";
import { config2 } from "../config";

export default function CategorySearch(){
    const {id} = useParams();
   
    
    const [data,setData] = useState([]);
  
    const onLoad = async()=>{
        const response = await axios.get(`${config2.url}/category/books/${id}`);
        setData(response.data.data);
    }
    useEffect(()=>{
        onLoad();
    },[])
    return(
<SearchResult books={data}/>
    )
}