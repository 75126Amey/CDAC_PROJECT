import { useDispatch } from "react-redux"
import { logoutAction } from "../features/userSlice";
import { Dropdown } from "react-bootstrap";

export default function LoggedInButton(){
    const dispatcher = useDispatch();
    return(
    <Dropdown>
  <Dropdown.Toggle variant="success" id="dropdown-basic">
    Dropdown Button
  </Dropdown.Toggle>

  <Dropdown.Menu>
    <Dropdown.Item><button onClick={()=>{
        sessionStorage.removeItem("token");
        dispatcher(logoutAction());
    }}>log out</button></Dropdown.Item>
   
  </Dropdown.Menu>
</Dropdown>
    )
}