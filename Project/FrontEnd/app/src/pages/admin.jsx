
import { getAuthorDetails, getPendingAuthors } from "../services/author";
import { Link, useNavigate } from "react-router-dom";
import { verifyAdmin } from "../services/admin";
import axios from "axios";
import { useEffect, useState } from "react";

import ChartAdmin from "./dashboard/chartAdmin";
import BookUpload from "./BookUpload";
import '../css/author.css';
import { useRef } from "react";
import { getUserRole } from "../services/user";
import AuthApprov from "../components/authApprovComponent copy";
import BookApprov from "../components/bookApprovComponent";
import { getPendingBooks } from "../services/book";
import { get7DaysDataForAdmin } from "../services/dashboard";
import Footer from "../components/common/Footer";
import AddAuthor from "../components/addAuthor";
import DownloadReport from "../components/downReportAdmin";
//import BookApprov from "../components/bookApprovComponent";
export default function Admin() {
  const navigate = useNavigate();
  const [displayState,setDisplayState] = useState(1);
  const[pendingAuthorData,setPendingAuthorData]  = useState([]);
  const[pendingBookData,setPendingBookData] = useState([]);
  const[graphData,setGraphData] = useState([]);
  const[daily,setDaily] = useState([]);
  const[monthly,setMonthly] = useState([]);
  const dashboard = useRef();
  const add  = useRef();
  const authors = useRef();
  const books = useRef();
  const download = useRef();
  const addAuthor = useRef();
  const DisplayComponent = ChartAdmin
  const onLoad = async () => {
    
    if(sessionStorage.getItem("token") ==null){
    navigate("/acessDenied");
   }
   else{
    const response1 = await getUserRole();
    if(response1.status !== "success" ||
      response1.data!== "ADMIN"){
        navigate("/acessDenied");
      }
      else{
        const response2 = await getPendingAuthors();
        const response3 = await getPendingBooks();
        const response4 = await get7DaysDataForAdmin();
        setPendingAuthorData(response2.data);
        setPendingBookData(response3.data);
        setGraphData(response4.list);
        setDaily(response4.daily);
        setMonthly(response4.monthly);
      }
    }
  };
  useEffect(() => {
    onLoad();
  }, []);
  const change = (refs,component)=>{
    dashboard.current.style.backgroundColor = "white";
    dashboard.current.style.color = "black"
    add.current.style.backgroundColor = "white"
    add.current.style.color = "black"
    authors.current.style.backgroundColor = "white"
    authors.current.style.color = "black"
    books.current.style.backgroundColor = "white"
    books.current.style.color = "black"
    download.current.style.backgroundColor = "white"
    download.current.style.color = "black"
    addAuthor.current.style.backgroundColor = "white"
    addAuthor.current.style.color = "black"
    refs.current.style.backgroundColor = "#63855A"
    refs.current.style.color = "white"
    setDisplayState(component);
  }
  return (
    <div>
      <div>
    {<div>
     
    <nav className="navbar navbar-expand-sm navbar-light bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <img
            src="/images/logo-color.png"
            className="me-2"
            height="50"
            alt="MDB Logo"
        
          />
        </a>
    <div className="d-flex justify-content-start align-items-center">
    <div className="dropdown">
      <div data-bs-toggle="dropdown">
      Welcome, Admin
      </div>
      <ul className="dropdown-menu p-0 text-center" style={{width:"60px",minWidth:"auto"}}>
      <Link className="text-decoration-none text-dark" to="/login"><li>Logout</li></Link>
      </ul>
    </div>
    </div>
      </div>
    </nav>
    <div className="container m-0 p-0">
        <div className="row">
            <div className="col-3">
            <div className="d-flex list-group text-center" id="myList" role="tablist">
      <div className="selected list-group-item fs-4 flex-grow-1 py-4" style={{backgroundColor:"#63855A",color:"white"}} ref={dashboard} onClick={()=>{
        change(dashboard,1)
      }}>Dashboard</div>
       <div className="selected list-group-item fs-4 flex-grow-1 py-4"  ref={addAuthor} onClick={()=>{
        change(addAuthor,6)
      }}>Add Author</div>
      <div className="list-group-item fs-4 flex-grow-1 py-4" ref={add} onClick={()=>{
        change(add,2)
      }}>Add a new book</div>
      <div className="list-group-item fs-4 flex-grow-1 py-4" ref={authors} onClick={()=>{
        change(authors,3)
      }}>Approve Authors</div>
       <div className="list-group-item fs-4 flex-grow-1 py-4" ref={books} onClick={()=>{
        change(books,4)
      }}>Approve Books</div>
      <div className="list-group-item fs-4 flex-grow-1 py-4"ref={download} onClick={()=>{
        change(download,5)
      }}>Download Report</div>
    </div>
            </div>
            <div className="col-9">
            {displayState===1?<ChartAdmin data={graphData} daily = {daily} monthly = {monthly}/>:(<div></div>)}
            {displayState===2?<BookUpload change={change} dashboard={dashboard}/>:(<div></div>)}
            {displayState===3?<AuthApprov pendingAuthorData={pendingAuthorData}/>:(<div></div>)}
            {displayState===4?<BookApprov pendingBookData={pendingBookData}/>:(<div></div>)}
            {displayState===5?<DownloadReport data={[{name:"Download Sales Report",url:"download/admin/sales"}]}/>:(<div></div>)}
            {displayState===6?<AddAuthor change={change} dashboard={dashboard}/>:(<div></div>)}
        </div>
    
    </div>
    
        </div>
        
        </div>
}

        </div>
       
        </div>
        
  );
}
