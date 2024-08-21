import axios from "axios";
import { useEffect, useState } from "react";
import { getApprovedProAuthors, getAuthorDetails, getBooksByAuthor, updateProAuthorDetails } from "../services/author";
import { Link, useNavigate } from "react-router-dom";
import ChartAuthor from "./dashboard/chartAuthor";
import BookUpload from "./BookUpload";
import Bookshelf from "../components/bookShelf";
import '../css/author.css';
import { useRef } from "react";
import { Button, FormControl, Modal } from "react-bootstrap";
import BookUploadByAuthor from "./BookUploadByAuthor";
import { get7DaysDataForAuthor } from "../services/dashboard";
import { getBookById } from "../services/book";
import DownloadReportForAuthor from "../components/downReportAuthor";
export default function Author() {
  const [displayState,setDisplayState] = useState(1);
  const [name,setName] = useState("");
  const [show, setShow] = useState(false);
  const[website,setWebsite] = useState(null);
  const[aboutAuthor,setAboutAuthor] = useState(null);
  const[authorID,setAuthorID] = useState(null);


  const [bookShelf,setBookShelf] = useState();
  const[graphData,setGraphData] = useState([]);
  const[daily,setDaily] = useState([]);
  const[monthly,setMonthly] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const dashboard = useRef();
  const add  = useRef();
  const view = useRef();
  const download = useRef();
  const navigate = useNavigate();
  const DisplayComponent = ChartAuthor
  const loadData = async () => {
    if(sessionStorage.getItem("token") ==null){
      navigate("/acessDenied");
    }
    else{
      const response = await getAuthorDetails();
      if (response.status === "success" && response.data.role == "AUTHOR") {
        if (response.data.status === "PENDING") {
          navigate("/author/pending",{state:{
            message:"Your account is pending approval"
          }});
        }
        else if (response.data.status === "REJECTED") {
          navigate("/author/pending",{state:{
            message:"Your account has been rejected"
          }});
        }
        else {
    setName(response.data.firstName + " " + response.data.lastName);
    const response2 = await get7DaysDataForAuthor();
    const response3 = await getBooksByAuthor();
    setGraphData(response2.list);
    setDaily(response2.daily);
    setMonthly(response2.monthly);
    setBookShelf(response3.data);
    console.log(response);
    loadDataAdditionalDetails();
        }
    }
      }  
  };
  const loadDataAdditionalDetails = async () => {
    const response = await getApprovedProAuthors();
    setWebsite(response.data.website);
    setAboutAuthor(response.data.aboutAuthor);
    setAuthorID(response.data.id);
  }
  
  useEffect(()=>{
      loadData();
  },[])
  const change = (refs,component)=>{
    dashboard.current.style.backgroundColor = "white";
    dashboard.current.style.color = "black"
    add.current.style.backgroundColor = "white"
    add.current.style.color = "black"
    view.current.style.backgroundColor = "white"
    view.current.style.color = "black"
    download.current.style.backgroundColor = "white"
    download.current.style.color = "black"
    refs.current.style.backgroundColor = "#63855A"
    refs.current.style.color = "white"
    setDisplayState(component);
  }
  return (
    <div>
           
<nav className="navbar navbar-light bg-body-tertiary">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">
      <img
        src="/images/logo-color.png"
        className="me-2"
        height="50"
        alt="MDB Logo"
    
      />
    </a>
    {website==null&&
    
    <Button variant="outline-primary" onClick={handleShow}>
        Tell us about yourself
      </Button>
    }
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Additional Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Enter your website:
          <FormControl type="text" defaultValue={website} onChange={(e)=>{
            setWebsite(e.target.value);
          }}/>
          Tell us more about yourself:
          <FormControl as="textarea" defaultValue={aboutAuthor} onChange={(e)=>{
            setAboutAuthor(e.target.value);
          }}/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={async()=>{
            const formData = new FormData();
            console.log(authorID);
            formData.append("id",parseInt(authorID));
            formData.append("website",website);
            formData.append("aboutAuthor",aboutAuthor);
            console.log(formData.get("id"));
            await updateProAuthorDetails(formData);
            handleClose();
            }}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      
    
<div className="d-flex justify-content-start align-items-center">
<div className="dropdown">
  <div data-bs-toggle="dropdown">
  Welcome, {name} 
  </div>
  <ul class="dropdown-menu p-0 text-center" style={{width:"60px",minWidth:"auto"}}>
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
  <div className="selected list-group-item fs-4 flex-grow-1 py-5" style={{backgroundColor:"#63855A",color:"white"}} ref={dashboard} onClick={()=>{
    change(dashboard,1)
  }}>Dashboard</div>
  <div className="list-group-item fs-4 flex-grow-1 py-5" ref={add} onClick={()=>{
    change(add,2)
  }}>Add a new book</div>
  <div className="list-group-item fs-4 flex-grow-1 py-5" ref={view} onClick={()=>{
    change(view,3)
  }}>View Bookshelf</div>
  <div className="list-group-item fs-4 flex-grow-1 py-5"ref={download} onClick={()=>{
    change(download,4)
  }}>Download Report</div>
</div>
        </div>
        <div className="col-9">
        {displayState===1?<ChartAuthor data={graphData} daily = {daily} monthly = {monthly}/>:(<div></div>)}
        {displayState===2?<BookUploadByAuthor authorID={authorID} change={change} dashboard={dashboard}/>:(<div></div>)}
        {displayState===3?<Bookshelf data={bookShelf}/>:(<div></div>)}
        {displayState===4?<DownloadReportForAuthor id={authorID}/>:(<div></div>)}
    </div>

</div>

    </div>
    </div>
  );
}

