import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import eBookImage from '../Images/eBookImage.jpg.jpg';
import RentImage from '../Images/RentImage.jpg - Copy.jpg';
import ReviewImage from '../Images/Review.Imagejpg.jpg';
import BuyImage from '../Images/BuyImage.jpg.jpg';
import Navbar from './common/NavbarMain';
import Footer from '../components/common/Footer';
import { getRecentlyAddedBooks, getTrendingBooks } from '../services/book';
import DefaultHomeDispaly from './common/DefaultHomeDisplay';
import NavBarSub from './common/NavbarSub';
import NavbarMain from './common/NavbarMain';


const Home = () => {
    const [booksData,setBooksData] = useState([]);
    const[trendingBooks,setTrendingBooks] = useState([]);
    const getBooksData = async () => {
        let response =  await getRecentlyAddedBooks(0);
        const response2 = await getTrendingBooks();
        setBooksData(response.data);
        setTrendingBooks(response2.data);
    }
    useEffect(() => {
        getBooksData();
    },[]);
    return (
        <>
        <NavbarMain/>
        <NavBarSub/>
            <DefaultHomeDispaly bookData={booksData} trendingBooks={trendingBooks}/>
            <div className="container-fluid">
                <header className="text-center my-5">
                    {/* <h1 className="display-4">Welcome to E-Book E-Rent</h1> */}
                </header>
                <div className="row mb-5">
                    <div className="col-md-12">
                        <div className="card text-center">
                            <Link to="/books"><img src={eBookImage} style={{height:"100vh"}} className="card-img-top" alt="E-Book E-Rent" /></Link>
                        </div>
                    </div>
                </div>

                
                
                <section className="container">
                    <h2 className="text-center mb-4">Overview</h2>
                    <div className="row">
                        <div className="col-md-10 offset-md-1">
                            <p className="lead text-justify">
                                E-Book E-Rent is your go-to platform for renting and buying e-books. Our system provides a wide range of e-books, 
                                easy rental options, and seamless buying experiences. Users can leave reviews, manage their rentals, and purchase books with ease.
                            </p>
                            <p className="lead text-justify">
                                Administrators and publishers have dedicated panels to manage book listings, rentals, and user reviews. Join us today to explore 
                                our vast collection of e-books and enjoy a seamless reading experience.
                            </p>
                        </div>
                    </div>
                </section>
                <section className="container mt-5 mb-5">
                    <h2 className="text-center mb-4">Services</h2>
                    <div className="row">
                        <div className="col-md-3">
                            <div className="card text-center shadow">
                                <Link to="/books"><img src={eBookImage}  className="card-img-top" alt="Books" /></Link>
                                <div className="card-body">
                                    <h5 className="card-title">Books</h5>
                                    <p className="card-text">Browse and explore our collection of e-books.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="card text-center shadow">
                                <Link to="/rent"><img src={RentImage} className="card-img-top" alt="Rent" /></Link>
                                <div className="card-body">
                                    <h5 className="card-title">Rent</h5>
                                    <p className="card-text">Rent e-books at affordable prices.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="card text-center shadow">
                                <Link to="/buy"><img src={BuyImage} className="card-img-top" alt="Buy" /></Link>
                                <div className="card-body">
                                    <h5 className="card-title">Buy</h5>
                                    <p className="card-text">Purchase e-books instantly.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="card text-center shadow">
                                <Link to="/author/register"><img src={ReviewImage} className="card-img-top" alt="Reviews" /></Link>
                                <div className="card-body">
                                    <h5 className="card-title">Publish Your Book</h5>
                                    <p className="card-text">Publish your own book on our site</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </>
    );
}

export default Home;
