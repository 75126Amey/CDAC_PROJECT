import { useLocation, useParams } from "react-router-dom";
import { getBooksBySearchTerm } from "../services/book";
import { useEffect, useState } from "react";
import SearchResult from "./SearchResult";
import { useSelector } from "react-redux";

export default function SearchPage(){
    const search = useSelector(stat => stat.search);
   
    
    const [data,setData] = useState([]);
  
    const onLoad = async()=>{
        const response = await getBooksBySearchTerm(search.term);
        setData(response.data);
    }
    useEffect(()=>{
        onLoad();
    },[])
    return(
<SearchResult books={data} term={search.term}/>
    )
}