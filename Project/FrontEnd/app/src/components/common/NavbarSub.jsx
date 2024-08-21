import { Link } from "react-router-dom";
export default function NavBarSub(){
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

    <nav className="navbar navbar-expand-lg" style={bottomNavbarStyle}>
    <div className="container-fluid">
        <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link 
                        className="nav-link" 
                        to="/author/register" 
                        style={navLinkStyle} 
                        onMouseEnter={handleMouseEnter} 
                        onMouseLeave={handleMouseLeave}
                    >
                        Publish on our site, click here
                    </Link>
                </li>
            </ul>
        </div>
    </div>
</nav>
}