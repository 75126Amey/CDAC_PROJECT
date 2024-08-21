import { Link } from "react-router-dom";
import '../css/navbar.css';
import { Button, Container, FormControl, Nav, Navbar, NavDropdown,Form, InputGroup,Badge, Row} from "react-bootstrap";
import { FaSearch, FaShoppingCart } from "react-icons/fa";
import SearchComponenent from "./searchComponenet";
import { useSelector } from "react-redux";
import LoggedInButton from "./loggedInButton";
export default function NavbarComponent(){
  const cart = useSelector(state=>state.cart);
  const login = useSelector(state=>state.user);
    return(
        <Navbar expand="lg" className="customNav shadow-sm rounded mt-4">
        
       <Link to={"/"}>
        <Navbar.Brand>
          <img
            src="/images/logo-navbar.png"
            width="200"
           
            className="d-inline-block align-top"
            alt="Brand logo"
          />
        </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Container className=""> 
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-around">
        <SearchComponenent/>
       
          <Nav className="align-center">
            {login.loginStatus?(<LoggedInButton/>):(<Button className="search-button"><Link to={"/login"} style={{color:"white",textDecoration:"none"}}>Register/Login</Link></Button>)}
            <Nav.Link className="px-5 mx-0" as={Link} to="/cart">
            <div>
              <FaShoppingCart className="cart-icon"/>
              <Badge className="bg-danger inline-block">{cart.items.length}</Badge>
              </div>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
        </Container>
      </Navbar>
    )
}