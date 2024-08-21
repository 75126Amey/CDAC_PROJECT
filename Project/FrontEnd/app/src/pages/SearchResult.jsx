import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Pagination } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { config2 } from '../config';
import NavbarMain from '../components/common/NavbarMain';
import { useNavigate } from 'react-router-dom';



const SearchResult = ({books,term}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const booksPerPage = 2;

    const indexOfLastBook = currentPage * booksPerPage;
    const indexOfFirstBook = indexOfLastBook - booksPerPage;
    const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const navigate  = useNavigate();
    
    return (
        <Container>
            <NavbarMain/>
            <Row>
                {currentBooks.length==0 && <div class="container mt-4">
                 <div class="alert" style={{
                    backgroundColor: "#fff8e1",
                    color: "#795548",
                    borderRadius: "10px",
                    border: "1px solid #fce4ec"
                 }}>
                    No results found for the term: "<strong>{term}</strong>".
                    </div>
                    </div>}
                {currentBooks.map((book, index) => (
                    <Col key={index} md={12} className="mb-4">
                        <Card style={{ border: 'none' }}>
                            <Row>
                                <Col md={9}>
                                    <Card.Body>
                                        <Card.Title>{book.bookTitle}</Card.Title>
                                        <Card.Text>
                                            {book.authors.map((author, index) =>{
                                               return <strong key={index}>{author}</strong>
                                            })}
                                            <br />
                                           
                                            <small>{book.publisherName}</small><br />
                                            {book.shortDesc}<br />
                                            <strong>₹{book.basePrice}</strong><br/>
                                            {book.rentable && <strong>Rent for: ₹{book.rentPerDay} per day</strong>}
                                        </Card.Text>
                                    </Card.Body>
                                </Col>
                                <Col md={3} style={{cursor:"pointer"}} onClick={()=>{
                                        const encrypted = btoa(JSON.stringify(book.id));
                                        navigate(`/book/display/${encrypted}`)
                                }}>
                                    <Card.Img variant="top" src={`${config2.url}/covers/${book.coverImage}`} className='w-50'/>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                ))}
            </Row>
           <Pagination>
                {[...Array(Math.ceil(books.length / booksPerPage)).keys()].map(number => (
                    <Pagination.Item key={number + 1} active={number + 1 === currentPage} onClick={() => paginate(number + 1)}>
                        {number + 1}
                    </Pagination.Item>
                ))}
            </Pagination>
        </Container>
    );
};

export default SearchResult;
