import { useEffect, useState } from "react";
import NavbarMain from "./common/NavbarMain";
import { config2 } from "../config";
import { useNavigate } from "react-router-dom";
import Footer from "./common/Footer";

export default function Bookshelf({data}){
    const navigate = useNavigate();
    return(
    <div>
        <div className="px-3">
            <div className="container-fluid border border-dark bg-custom-class rounded-4 my-3" style={{backgroundColor: '#d3d3d3'}}>
                <h1 className="text-start mt-3 ms-3">BookShelf</h1>
                <div className="row mx-3 my-3 p-3">
                    {data&&data.map((item)=>(
                            <div className="col-3 border border-dark bg-light rounded mx-5 my-3 p-3">
                            <img src={`${config2.url}/covers/${item.coverImage}`} alt="book logo" className="d-inline-block" style={{width:'160px', height: '240px', verticalAlign: 'center'}}
                            onClick={()=>{
                              navigate("/book/view",{state: {
                                url:item.manuscript
                              }})  
                            }}
                            />
                            <h3 className="my-2">{item.bookTitle}</h3>
                            <h6>Status: </h6>{item.status}
                            </div>
                        
                        ))}
                </div>  
            </div>
        </div>
        <Footer/>
    </div>
    )
}