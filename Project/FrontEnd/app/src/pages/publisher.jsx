import axios from "axios";
import { useEffect, useState } from "react";
import { getAuthorDetails } from "../services/author";
import { Link, useNavigate } from "react-router-dom";
import ChartPublisher from "./dashboard/chartPublisher";

import '../css/author.css';
import { useRef } from "react";
import { get7DaysDataForPublisher } from "../services/dashboard";
import { getUserRole } from "../services/user";
import { config2 } from "../config";
import DownloadReportForPublisher from "../components/downReportPublisher";
export default function Publisher() {
  const [email, setEmail] = useState("");
  const [displayState,setDisplayState] = useState(1);

  const[graphData,setGraphData] = useState([]);
  const[daily,setDaily] = useState([]);
  const[monthly,setMonthly] = useState([]);

  const[name,setName] = useState();
  const[id,setId] = useState();
  const dashboard = useRef();
  const add  = useRef();
  const view = useRef();
  const download = useRef();
  const navigate = useNavigate();
  const DisplayComponent = ChartPublisher
  const onLoad = async () => {
    if(sessionStorage.getItem("token")==null){
      navigate("/acessDenied");
     }
     else{
      const response1 = await getUserRole();
      if( response1.status !== "success" ||
       response1.data!== "PUBLISHER"){
        navigate("/acessDenied");
       }
       else{
        const response2 = await get7DaysDataForPublisher();
        const response3 = await axios.get(`${config2.url}/publisher/details`,{
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        })
        setGraphData(response2.list);
        setDaily(response2.daily);
        setMonthly(response2.monthly);
        setName(response3.data.data.name);
        setId(response3.data.data.id);
       }
     }
  };
  useEffect(() => {
    onLoad();
  }, []);
  const change = (refs,component)=>{
    dashboard.current.style.backgroundColor = "white";
    dashboard.current.style.color = "black"
    download.current.style.backgroundColor = "white"
    download.current.style.color = "black"
    refs.current.style.backgroundColor = "#63855A"
    refs.current.style.color = "white"
    setDisplayState(component);
  }
  // useEffect(()=>{
  //     loadData();
  // },[])
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
  <div className="selected list-group-item fs-4 flex-grow-1 py-4" style={{backgroundColor:"#63855A",color:"white"}} ref={dashboard} onClick={()=>{
    change(dashboard,1)
  }}>Dashboard</div>

  <div className="list-group-item fs-4 flex-grow-1 py-4"ref={download} onClick={()=>{
    change(download,2)
  }}>Download Report</div>
</div>
        </div>
        <div className="col-9">
        {displayState===1?<ChartPublisher  data={graphData} daily = {daily} monthly = {monthly}/>:(<div></div>)}
        {displayState===2?<DownloadReportForPublisher  id={id}/>:(<div></div>)}
    </div>

</div>

    </div>
    </div>
  );
}
