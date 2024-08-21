import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
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
import { FaShoppingCart } from 'react-icons/fa';
import { Badge, Button, Nav } from 'react-bootstrap';
import { setSearchTermGlobal } from '../../features/searchSlice';
 const NavbarMain = ({bookData}) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const login = useSelector(state=>state.user);
    const cart = useSelector(state=>state.cart);
    const navigate = useNavigate();
    const dispatcher = useDispatch();
    const navbarStyle = {
        backgroundColor: '#fff', // White background for the top navbar
        padding: '0 20px',
    };

    const bottomNavbarStyle = {
        backgroundColor: '#fff', // White background for the bottom navbar
        padding: '0 20px',
        borderTop: '1px solid #ddd', // Optional border to separate top and bottom navbars
    };

    const navLinkStyle = {
        color: '#000', // Black text color
        transition: 'color 0.3s ease',
        padding: '0 10px',
    };

    const navLinkHoverStyle = {
        color: '#ffeb3b',
    };

    const logoStyle = {
        height: '40px',
        width: 'auto',
        marginRight: '20px',
    };

    const loginButtonStyle = {
        fontSize: '16px',
        padding: '10px',
        borderRadius: '50%',
        borderColor: '#ddd',
        backgroundColor: '#fff',
        height: '50px',
        width: '50px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    };

    const handleMouseEnter = (event) => {
        Object.assign(event.target.style, navLinkHoverStyle);
    };

    const handleMouseLeave = (event) => {
        Object.assign(event.target.style, navLinkStyle);
    };
    const [searchTerm,setSearchTerm] = useState("");
    return (
        <>
            <nav className="navbar navbar-expand-lg mb-5 mt-3" style={navbarStyle}>
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">
                        <img src={'/images/logo-navbar.png'} alt="Logo" style={logoStyle} />
                    </Link>
                    <div className="d-flex align-items-center" style={{ flex: 1 }}>
                        <form className="d-flex mx-auto" style={{ flex: 1 }} onSubmit={(e)=>{
                            e.preventDefault();
                            
                            if(searchTerm.length!==0) {
                            dispatcher(setSearchTermGlobal(searchTerm));
                            navigate(`/search`)
                        }
                        }}>
                            <input 
                                className="form-control me-2" 
                                type="search" 
                                placeholder="Search for books" 
                                aria-label="Search"
                                style={{ flex: 1, maxWidth: '400px' }} // Reduced width
                                onChange={(e)=>{
                                    setSearchTerm(e.target.value);
                                
                                }}
                            />
                            <button 
                                className="btn btn-outline-dark" // Changed button color
                                type="submit"
                                style={{ fontSize: '16px', padding: '10px 20px', borderRadius: '5px', borderColor: '#ddd' }}
                            >
                                Search
                            </button>
                        </form>
                        {login.loginStatus==false &&
                            <Link to={"/login"}><Button variant='dark mx-3' className='mr-5'>Login/Register</Button></Link>
                            }
                        {login.loginStatus &&<div className="dropdown">

                            <button 
                                className="btn btn-outline-dark dropdown-toggle mx-3" 
                                type="button"
                                id="loginDropdown" 
                                aria-expanded={dropdownOpen}
                                style={loginButtonStyle}
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                            >
                               
                                <i className="fas fa-user"></i>
                            </button>
                           
                            <ul className={`dropdown-menu ${dropdownOpen ? 'show' : ''}`} aria-labelledby="loginDropdown"style={{width:'50%'}}>
                                <li className='dropdown-item'>Hello, {login.userName.lastName}</li>
                                <li><Link className="dropdown-item" to="/order/history">My Orders</Link></li>
                                <li><Link className="dropdown-item" to="/library">My Library</Link></li>
                                <li className='dropdown-item' onClick={()=>{
                                     sessionStorage.removeItem("token");
                                     dispatcher(logoutAction());
                                     navigate("/login");
                                }}>Logout</li>
                            </ul>
                            
                        </div>
                            }
                        <Link to={"/cart"} style={{ color: '#000' }}>
                        <FaShoppingCart className="cart-icon"/>
                        <Badge className="bg-danger inline-block">{cart.items.length}</Badge>
                        </Link>
                    </div>
                </div>
            </nav>
        </>
    );
};


export default NavbarMain;

