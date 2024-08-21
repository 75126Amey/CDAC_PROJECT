import { Button, FormControl, InputGroup, Nav,Form,Navbar } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";


export default function SearchComponenent(){
    return(
        <div>
            <form className="flex-fill" onSubmit={(e)=>e.preventDefault()}>
                <div className="input-group">
                    <input className="form-control flex-fill" placeholder="Search by title"/>
                    <button className="btn btn-success search-button" onClick={()=>{
                        console.log("Hello");
                    }}><i className="fas fa-search"></i></button> 
                </div>
            </form>
        </div>
    )
}