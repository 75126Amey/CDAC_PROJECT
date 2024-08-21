import booklogo from "../book-logo.png"
import user from "../user.jpg"
import cart from "../cart.png";
import search from "../search.png"
import '../css/navbar.css';
import { Link } from "react-router-dom";

function Navbar(props)
{
    return(
        <nav className="navbar navbar-light d-flex justify-content-between py-0" style={{backgroundImage: `url(${process.env.PUBLIC_URL}/images/library.png)`}}>
                <div className="d-flex align-items-center">
                    <img src={booklogo} alt="book logo" style={{width:'300px', height: '80px'}} />
                </div>
                <div className="d-flex align-items-center">
                <input className="form-control me-2 d-inline-block search-bar" type="search" placeholder="Search" aria-label="Search"/>
                <button className="btn btn-sm mx-0 button"><img src={search} className="search-icon"/></button>
                </div>
                <div className="d-flex align-items-center">
                <Link to="../user">
                <span className="d-inline-block text-white me-3 fw-bold">{props.name}</span>
                <img src={user} alt="userlogo" className="d-inline-block me-3" style={{width:'50px', height: '50px', borderRadius: '100%'}} />
                </Link>
                <Link to="../cart">
                <img src={cart} alt="cart logo" style={{width:'60px', height: '50px'}}/>
                </Link>
                </div>
        </nav>
    )
}



export default Navbar