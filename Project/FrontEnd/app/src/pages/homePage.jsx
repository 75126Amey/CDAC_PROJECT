import {Link, useNavigate } from "react-router-dom"
import LoginUser from "./login";
import { useEffect, useState } from "react";
import { getUser } from "../services/user";
import { config2 } from "../config";
import SearchComponenent from "../components/searchComponenet";
import NavbarComponent from "../components/navbarComponent";
import { Button, FormControl, InputGroup, Nav,Form,Navbar, Container, Accordion, Row,Col } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import CategoryAccordion from "../components/categoryAccordion";
import { getCategories } from "../services/category";
import Footer from "../components/footerComponent";
import DefaultDisplay from "../components/defaultDisplay";
import { getRecentlyAddedBooks } from "../services/book";
import { useSelector } from "react-redux";

function HomePage(){
    const navigate = useNavigate();
    const [categoriesData,setCategoriesData] = useState([]);
    const [booksData,setBooksData] = useState([]);
    const getCategoriesData = async () => {
        let response = await getCategories();
        setCategoriesData(response.data);
        response =  await getRecentlyAddedBooks(0);
        setBooksData(response.data);
    }
    useEffect(() => {
        getCategoriesData();
    }, []);
    return(
      <div>
        <Container style={{width:"75%"}}>
        <NavbarComponent/>
        <Row>
            
            <Col className="col-2 mt-3">           
            <CategoryAccordion data={categoriesData}/>
            </Col>
            <Col className="col-10 mt-3">
            <DefaultDisplay bookData={booksData}/>
            </Col>
        
        </Row>
        {/* <Footer/> */}
        </Container>
 <img src={'http://localhost:8080/author/image/photo/5'}/>
      </div>
    )
}
export default HomePage;