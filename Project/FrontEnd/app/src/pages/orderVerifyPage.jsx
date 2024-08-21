import React from 'react';
import { Container, Row, Col, Button, Table } from 'react-bootstrap';
import { removeAllfromCartAction } from '../features/cartSlice';
import { placeOrder } from '../services/order';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { config2 } from '../config';

const OrderConfirmPage = () => {
    const cart = useSelector(state=>state.cart)
    const navigate = useNavigate();  // to navigate to success page after order placement
    const dispatch = useDispatch();
    console.log(cart);
      const body = {
          rentItems:cart.items.filter(item=>item.rentLastDate!=null).map(item=>({id:item.id,rentLastDate:new Date(item.rentLastDate).toISOString()})),
          itemIds: cart.items.filter(item=>item.rentLastDate==null).map(item=>item.id)
      }
   
    const calculateTotal = () => {
        let total = 0;
        cart.items.forEach(item => {
            if (item.rentable&&item.rentLastDate!=null) {
                const totalDays = Math.ceil((new Date(item.rentLastDate) - new Date()) / (1000 * 60 * 60 * 24));
                total += totalDays * item.rentPerDay;
            } else {
                if(item.discount!=null){
                total += item.basePrice*(1-item.discount/100);
                }
                else{
                    total += item.basePrice;
                }
            }
        });
        return total.toFixed(2);
    };

    return (
        <Container>
            <h2 className="my-4">Order Confirmation</h2>
            <Table striped bordered hover style={{textAlign:"center"}}>
                <thead>
                    <tr>
                        <th>Cover</th>
                        <th>Title</th>
                        <th>Price</th>
                        <th>Discount</th>
                        <th>Start Date</th>
                        
                        <th>End Date</th>
                        <th>Total Days</th>
                        <th>Rent/Day</th>
                        <th>Total Rent</th>
                    </tr>
                </thead>
                <tbody>
                    {cart.items.map(item => (
                        <tr key={item.id}>
                            <td><img src={`${config2.url}/covers/${item.coverImage}`} alt={item.bookTitle} style={{ width: '150px' }} /></td>
                            <td style={{whiteSpace:"nowrap"}}>{item.bookTitle}</td>
                            <td>₹{item.rentable && item.rentLastDate? 'Na' : item.basePrice.toFixed(2)}</td>
                            <td>{!item.rentLastDate&&item.discount!=null?`₹${(item.basePrice*item.discount/100).toFixed(2)}`:'0.0'}</td>
                            <td>{item.rentable&&item.rentLastDate?  <input type='date' readOnly value={new Date().toISOString().split("T")[0]} style={{textAlign:"center"}}/>: 'Na'}</td>
                            <td>{item.rentable&&item.rentLastDate?<input type='date' readOnly value={new Date(item.rentLastDate).toISOString().split("T")[0]} style={{textAlign:"center"}}/>  : 'Na'}</td>
                            <td>{item.rentable&&item.rentLastDate? Math.ceil((new Date(item.rentLastDate) - new Date()) / (1000 * 60 * 60 * 24) ): '-'}</td>
                            <td>{item.rentable&&item.rentLastDate? `₹${item.rentPerDay.toFixed(2)}` : 'Na'}</td>
                            <td>{item.rentable&&item.rentLastDate? `₹${(Math.ceil((new Date(item.rentLastDate) - new Date()) / (1000 * 60 * 60 * 24))*item.rentPerDay).toFixed(2)}` : '-'}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Row className="my-4">
                <Col md={{ span: 4, offset: 8 }} className="text-right">
                    <h4>Total: ₹{calculateTotal()}</h4>
                </Col>
            </Row>
            <Row className="my-4">
                <Col className="text-center">
                    <Button variant="primary" size="lg" onClick={async()=>{
                console.log(body);
                const response = await placeOrder(body);
                dispatch(removeAllfromCartAction())
                navigate("/payment",{state:{
                    id:response.data.id,
                    orderNo:response.data.orderNo,
                    amount:response.data.amount
                }})
                console.log(response)
            }}>Confirm Order</Button>
            <Button variant="danger mx-5" size="lg" onClick={async()=>{
               
                navigate("/cart")
               
            }}>Back to cart</Button>
                </Col>
            </Row>
        </Container>
    );
};

export default OrderConfirmPage;
