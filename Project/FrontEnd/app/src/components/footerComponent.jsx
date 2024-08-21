import {Row, Col, Image,Container } from 'react-bootstrap';
const Footer = () => {
    return (
      <footer style={{ backgroundColor: '#e0e7ff', padding: '20px 0',width:"75%",margin:"auto" }} className='fixed-bottom'>
        <Container>
          <Row>
            <Col md={3} className="text-center">
              <Image src="logo.png" alt="Logo" fluid />
              <p>Brand motto</p>
            </Col>
            <Col md={2}>
              <h5>About us</h5>
              <ul className="list-unstyled">
                <li>Contact us</li>
                <li>Feedback</li>
              </ul>
            </Col>
            <Col md={3}>
              <h5>Follow</h5>
              <ul className="list-unstyled">
                <li>Instagram</li>
                <li>Twitter</li>
                <li>Linkedin</li>
              </ul>
            </Col>
            <Col md={2}>
              <h5>Register/Login for Author</h5>
            </Col>
            <Col md={2}>
              <h5>Legal</h5>
              <ul className="list-unstyled">
                <li>Terms</li>
                <li>Privacy</li>
              </ul>
            </Col>
          </Row>
        </Container>
      </footer>
    );
  };
  
  export default Footer;