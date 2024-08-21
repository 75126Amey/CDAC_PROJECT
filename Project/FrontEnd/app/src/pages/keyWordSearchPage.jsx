import { useLocation, useParams } from "react-router-dom";
import { getBooksBySearchTerm } from "../services/book";
import { useEffect, useState } from "react";
import SearchResult from "./SearchResult";
import { useSelector } from "react-redux";
import axios from "axios";
import { config2 } from "../config";

export default function KeywordSearchPage(){
    const {id} = useParams();
   
    
    const [data,setData] = useState([]);
  
    const onLoad = async()=>{
        const response2 = await axios.get(`${config2.url}/book/keyword`)
        let name = response2.data.data.filter(ele=>ele.id==id).map(ele=>ele.keyword)[0];
        const response = await axios.get(`${config2.url}/book/search/keyword/${name}`);
        setData(response.data.data);
    }
    useEffect(()=>{
        onLoad();
    },[])
    return(
<SearchResult books={data}/>
    )
}