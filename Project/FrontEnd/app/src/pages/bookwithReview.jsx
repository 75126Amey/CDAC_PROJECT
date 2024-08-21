import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Image,
  Card,
  Modal,
  FormControl,
} from "react-bootstrap";
import {
  AbortedDeferredError,
  Link,
  useLocation,
  useParams,
} from "react-router-dom";
import { getBookById, getReviewsForBook } from "../services/book";
import { config2 } from "../config";
import { useDispatch, useSelector } from "react-redux";
import { addToCartAction, removeFromCartAction } from "../features/cartSlice";
import NavbarComponent from "../components/navbarComponent";
import {
  addReview,
  getBooksPurchasedByCustomer,
  getBooksRentedByCustomer,
  getCustomerOccupation,
  getLibrayBooks,
  getReviewableIds,
} from "../services/customer";
import { getUserIdWithToken, getUserRole } from "../services/user";
import RatingModal from "../components/reviewModal";
import AboutBook from "../components/aboutBook";
import NavbarMain from "../components/common/NavbarMain";
import Footer from "../components/common/Footer";
const BookView = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const[isReviewed,setIsRevieved] = useState(false);
  const calculateOverallRating = () => {
    const totalRating = bookDetails.reviews.reduce(
      (acc, review) => acc + review.rating,
      0
    );
    return (totalRating / bookDetails.reviews.length).toFixed(1);
  };
  const { idHash } = useParams();
  const id = atob(idHash);
  //For rent modal
  const [show, setShow] = useState(false);
  const handleClose = () => {setShow(false);}
  const handleShow = () => setShow(true);
  //For review modal
  const [showModal, setShowModal] = useState(false);

  const handleShow2 = () => setShowModal(true);
  const handleClose2 = () => setShowModal(false);

  const handleSave = async (data) => {
    const response = await addReview(id, data.rating, data.comment);
    setIsRevieved(true);
    console.log(response);
  };
  const [specificReview, setSpecificReview] = useState(0);
  //Tomorrows date for rent calaculation
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const [bookDetails, setBookDetails] = useState({});
  const [readMore, setReadMore] = useState(false);
  const [isRentable, setIsRentable] = useState(false);
  const [rentPrice, setRentPrice] = useState(0);

  const [rentDays, setRentDays] = useState(1);

  const[discount, setDiscount] = useState();
  const [rentLastDate, setRentLastDate] = useState(
    tomorrow.toISOString().split("T")[0]
  );
  const [isInLibrary, setIsInLibrary] = useState(false);

  const [isReviewable, setIsReviewable] = useState(false);

  const [userId, setUserId] = useState(0);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const onLoad = async () => {
    const response = await getBookById(id);
    setBookDetails(response.data);
    setIsRentable(response.data.rentable);
    setRentPrice(response.data.rentPerDay);
    if (sessionStorage.getItem("token") != null) {
      const role = await getUserRole();
      const userIdResponse = await getUserIdWithToken();
      setUserId(userIdResponse.data);
      if (role.data === "CUSTOMER") {
        const response1 = await getLibrayBooks();
        if (response1.data.some((ele) => ele.id == id)) {
          setIsInLibrary(true);
        }
        const response3 = await getReviewableIds();
        if (response3.data.some((ele) => ele == id)) {
          setIsReviewable(true);
        }
       
      }
    }
  };
  useEffect(() => {
    onLoad();
  },[]);
 useEffect(() => {
  setBookDetails(prevDetails=>({...prevDetails,discount}));
 },[discount])
 useEffect(()=>{
  const func1 = async()=>{
  if(sessionStorage["token"]!=null){
  const response4 = await getCustomerOccupation();
  if(bookDetails.parentCategoryName==="Educational"){
    console.log("true")
    if(response4.data=="STUDENT"||response4.data=="TEACHER"){
  setDiscount(10.5)
    }
  }
}
}
func1();
 },[bookDetails])
 useEffect(()=>{
  onLoad();
 },[isReviewed])
  return (
    <div>
      {bookDetails != null && bookDetails.authors ? (
        <Container>
          <NavbarMain />
          <Row>
            <Col md={4}>
              <Image
                src={`${config2.url}/covers/${bookDetails.coverImage}`}
                alt={bookDetails.bookTitle}
                fluid
              />
            </Col>
            <Col md={8}>
              <h1>{bookDetails.bookTitle}</h1>
              <h2>{bookDetails.bookSubTitle}</h2>
              <p className="fs-5">
                by{" "}
                {bookDetails.authors.map((author, index) => (
                  <React.Fragment key={author.id}>
                    <Link to={`/author/about/${author.id}`}>{author.name}</Link>
                    {index < bookDetails.authors.length - 1 && ", "}
                  </React.Fragment>
                ))}
              </p>
              <br/>
              <p className="fs-5">
               <span className="my-5"><strong>Category:</strong>{" "}
                <Link to={`/category/${bookDetails.categoryId}`}>
                  {bookDetails.categoryName}
                </Link>{" "}
                </span> 
                <br />
                <br/>
                {bookDetails.keywords.length != 0 && (
                   <span className="my-5"> <strong>Keywords:</strong></span>
                )}{" "}
                {bookDetails.keywords.map((keyword, index) => (
                  <React.Fragment key={keyword.id}>
                    <Link to={`/keyword/${keyword.id}`}>{keyword.keyword}</Link>
                    {index < bookDetails.authors.length - 1 && ", "}
                  </React.Fragment>
                ))}
              </p>
              <Row>
                <Col md={4}>
                  {!cart.items.map((ele) => ele.id).some((ele) => ele == id) &&
                    isInLibrary == false&&discount==null && (
                      <Button
                        variant="primary large"
                        bsSize="large"
                        className="mb-2 px-4"
                        style={{ fontSize: "1.2em" }}
                        onClick={() => {
                          dispatch(addToCartAction(bookDetails));
                        }}
                      >
                        ₹{bookDetails.basePrice} Ebook
                      </Button>
                    )}
                      {!cart.items.map((ele) => ele.id).some((ele) => ele == id) &&
                    isInLibrary == false&& discount>0&& (
                      <Button
                        variant="primary large"
                        bsSize="large"
                        className="mb-2 px-2"
                        style={{ fontSize: "1.2em" }}
                        onClick={() => {
                          dispatch(addToCartAction(bookDetails));
                        }}
                      >
                       <span><del>₹{bookDetails.basePrice}</del> ₹{((bookDetails.basePrice)*(1-discount/100)).toFixed(2)} Ebook</span> 
                      </Button>
                    )}
                  {isInLibrary && (
                    <p class="h4 text-success fw-bold align-center mb-2 ">
                      Already in library
                    </p>
                  )}
                  {cart.items.map((ele) => ele.id).some((ele) => ele == id) && (
                    <Button
                      variant="primary large"
                      bsSize="large"
                      className="mb-2 px-4"
                      style={{ fontSize: "1.2em" }}
                      onClick={() => {
                        dispatch(removeFromCartAction(id));
                      }}
                    >
                      Remove From Cart
                    </Button>
                  )}
                </Col>
                <Col md={4}>
                  {isRentable &&
                    !cart.items.map((ele) => ele.id).some((ele) => ele == id) &&
                    isInLibrary == false && (
                      <Button
                        variant="primary large"
                        bs
                        className="mb-2 px-2"
                        style={{ fontSize: "1.2em" }}
                        onClick={handleShow}
                      >
                        Rent for ₹{bookDetails.rentPerDay} per day
                      </Button>
                    )}
                  <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                      <Modal.Title>Rent calculation</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <FormControl
                        min={tomorrow.toISOString().split("T")[0]}
                        type="date"
                        defaultValue={tomorrow.toISOString().split("T")[0]}
                        onChange={(e) => {
                          const firstDate = new Date();
                          const secondDate = new Date(e.target.value);
                          const millisecondsDiff =
                            secondDate.getTime() - firstDate.getTime();
                          const daysDiff = Math.ceil(
                            millisecondsDiff / (24 * 60 * 60 * 1000)
                          );
                          setRentDays(daysDiff);
                          setRentLastDate( secondDate.toISOString().split("T")[0]);
                          setBookDetails((prevDetails) => ({
                            ...prevDetails,
                            rentLastDate: secondDate.toISOString().split("T")[0],
                            rentDays:daysDiff,
                            totalPrice: rentPrice * daysDiff,
                            discount:discount
                          }));
                        }}
                      />
                      <div className="d-flex justify-content-between">
                        <p> Days Rented: {rentDays}</p>
                        <p> Rent price: {rentPrice * rentDays}</p>
                      </div>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleClose}>
                        Close
                      </Button>
                      <Button
                        variant="primary"
                        onClick={() => {
                          console.log(bookDetails)
                          dispatch(addToCartAction(bookDetails));
                          handleClose();
                        }}
                      >
                        Add to Cart
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </Col>
              </Row>
              <h5 className="mt-3">Synopsis</h5>
              <p className="fs-5">
                {isExpanded ? bookDetails.longDesc : bookDetails.shortDesc}
                <br />
                <Button
                  variant="link"
                  onClick={() => setIsExpanded(!isExpanded)}
                >
                  {isExpanded ? "Read Less" : "Read More"}
                </Button>
              </p>
            </Col>
          </Row>
          <hr />
          <Row>
            <Col md={4}></Col>
            <Col md={4} className="text-center d-flex flex-column justify-content-center ">
            {userId&&isReviewable&&!bookDetails.reviews.map(review=>review.customerId).some(ele=>ele===userId)?<Button className="mb-3 fs-5" onClick={handleShow2}>Add A Review</Button>: <div></div>
                    }
            <RatingModal show={showModal} handleClose={handleClose2} handleSave={handleSave} rating={null} comment={null} />
              {bookDetails.reviews.length>0&&(<div><h4>Overall Rating: {calculateOverallRating()} ★</h4>
              <h5>Customer Reviews</h5></div>)}
              {bookDetails.reviews.map((review, index) => (
                <Card key={index} className="mb-3">
                  <Card.Body>
                    <Card.Title>
                      {"★".repeat(review.rating)}
                      {"☆".repeat(5 - review.rating)}
                    </Card.Title>
                    <Card.Text>"{review.comment}"</Card.Text>
                    <Card.Subtitle className="text-muted">
                      - {review.customerName}
                    </Card.Subtitle>
                  </Card.Body>
                </Card>
              ))}
              {bookDetails.reviews.length==0&& <div class="alert" style={{
                    backgroundColor: "#fff8e1",
                    color: "#795548",
                    borderRadius: "10px",
                    border: "1px solid #fce4ec"
                 }}>
                    No reviews yet. Be the first to leave a review!
                    </div>
                    }
            </Col>
            <Col md={4}></Col>
          </Row>
        </Container>
      ) : (
        <div></div>
      )}
      <Footer/>
    </div>
  );
};

export default BookView;


