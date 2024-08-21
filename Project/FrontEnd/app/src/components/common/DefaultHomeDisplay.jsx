import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logoImg from '../../Images/logo.jpg';
import carouselImg1 from '../../Images/carousel1.jpg'; // Replace with actual image paths
import carouselImg2 from '../../Images/carousel2.jpg'; // Replace with actual image paths
import carouselImg3 from '../../Images/carousel3.jpg'; // Replace with actual image paths
import img1 from '../../book_covers/img1.jpg'; // Replace with actual image paths
import img2 from '../../book_covers/img2.jpg'; // Replace with actual image paths
import img3 from '../../book_covers/img3.jpg'; // Replace with actual image paths
import img4 from '../../book_covers/img4.jpg'; // Replace with actual image paths
import img5 from '../../book_covers/img5.jpg'; // Replace with actual image paths
import { config2 } from '../../config';
import { useDispatch, useSelector } from 'react-redux';
import { logoutAction } from '../../features/userSlice';

export default function DefaultHomeDispaly({bookData,trendingBooks}){
    const navigate = useNavigate();
    return(
     <div>
           <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                    <div className="carousel-item active" data-bs-interval="5000">
                        <img className="d-block w-100" src={carouselImg1} alt="First slide" />
                    </div>
                    <div className="carousel-item" data-bs-interval="5000">
                        <img className="d-block w-100" src={carouselImg2} alt="Second slide" />
                    </div>
                    <div className="carousel-item" data-bs-interval="5000">
                        <img className="d-block w-100" src={carouselImg3} alt="Third slide" />
                    </div>
                </div>
                <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </a>
                <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </a>
            </div>
            <div className="container mt-4">
                <h2>Newly Added</h2>
                <div className="row">
                    {bookData.map((ele,index)=>{
                        return(
                            <div key={index} className="col">
                            <div className="card">
                                <img src={`${config2.url}/covers/${ele.coverImage}`} className="card-img-top" alt="Book 1" onClick={()=>{
                                        const encrypted = btoa(JSON.stringify(ele.id));
                                        navigate(`/book/display/${encrypted}`)
                                }}/>
                                <div className="card-body" >
                                    <h5 className="card-title">{ele.bookTitle}</h5>
                                </div>
                            </div>
                        </div>
                        )
                    })}
                  
                </div>
            </div>
            <div className="container mt-4">
                <h2>Trending Books</h2>
                <div className="row">
                {trendingBooks.map((ele,index)=>{
                        return(
                            <div key={index} className="col">
                            <div className="card">
                                <img src={`${config2.url}/covers/${ele.coverImage}`} className="card-img-top" alt="Book 1" onClick={()=>{
                                        const encrypted = btoa(JSON.stringify(ele.id));
                                        navigate(`/book/display/${encrypted}`)
                                }}/>
                                <div className="card-body" >
                                    <h5 className="card-title">{ele.bookTitle}</h5>
                                </div>
                            </div>
                        </div>
                        )
                    })}
                </div>
            </div>
     </div>
    )
}