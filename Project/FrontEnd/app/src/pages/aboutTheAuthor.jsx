import { useNavigate, useParams } from 'react-router-dom'
import '../css/aboutauthor.css'
import { config2 } from '../config';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Navbar } from 'react-bootstrap';
import NavbarMain from '../components/common/NavbarMain';
export default function AboutTheAuthor(){
    const {id} = useParams();
    const [authorData, setAuthorData] = useState();
    const [bookData, setBookData] = useState();
    const navigate = useNavigate();
    const onload = async()=>{
        const response = await axios.get(`${config2.url}/proAuthor/details/${id}`)
        setAuthorData(response.data.data.pro);
        setBookData(response.data.data.books);
    }
    useEffect(()=>{
        onload();
    },[])
return(
    <div>
        <NavbarMain/>
        {authorData&&<div className="container mt-5">
            <p className='display-5 text-center'>About the Author</p>
            <div className="row justify-content-center">
                <div className="col-md-8 text-center">
                    <img src={`${config2.url}/proAuthor/image/${id}`} alt="Author Photo" className="img-fluid rounded-circle mb-4 author-photo"/>
                    <h1 className="author-name">{authorData.firstName} {authorData.lastName}</h1>
                    <p className="about-author mt-4">
                       {authorData.aboutAuthor}
                    </p>
                    <p className="mt-4">
                        <a href={`${authorData.website}`} target="_blank" className="btn btn-outline-primary">Visit Website</a>
                    </p>
                </div>
            </div>
            
            <div className="row mt-5">
                <div className="col-md-12">
                    <h2 className="text-center mb-4">Books by {authorData.firstName} {authorData.lastName}</h2>
                </div>
            </div>
            <div className="row justify-content-center">
               {bookData.map(
                (ele,idx)=>{
                    return(
<div key={idx} className="col-6 col-md-2 text-center">
                        <img src={`${config2.url}/covers/${ele.coverImage}`} alt="Book 1" className="img-fluid book-cover mb-2"
                        onClick={()=>{
                            const encrypted = btoa(JSON.stringify(ele.id));
                            navigate(`/book/display/${encrypted}`)
                        }}
                        />
                        <p>{ele.bookTitle}</p>
                    </div>
                    )
                }
               )}
               
            </div>
        </div>}
    </div>
     
)
}