import { ReactReader } from 'react-reader'
import {useEffect, useState} from 'react';
import useLocalStorageState from 'use-local-storage-state';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';


const BookCatalog = () => {
  const[data,setData] = useState([]);
  const navigate = useNavigate();
  const loadData = async()=>{
    const response=2;
    const data2 = response.data;
    setData(data2);
  }
  useEffect(()=>{
    loadData();
  },[])
    return (
      <div>
        {
          data.map(ele=>{
            return(
            <div>
              <h3>{ele.book_title}</h3>
              <img style={{width:"200px"}} src={`http://localhost:8080/covers/${ele.coverImage}`}/>
              <button className='btn btn-primary' onClick={()=>{
                  navigate("/book/view",{state:{url:ele.manuscript}})
              }}>View Book</button>
            </div>
            )
          })
        }
      </div>
    )
  }

  export default BookCatalog;