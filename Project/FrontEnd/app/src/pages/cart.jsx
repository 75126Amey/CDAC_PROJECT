import React, { useState } from 'react';
import { Container, Row, Col, Button, Table, Image, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeFromCartAction } from '../features/cartSlice';
import { getUserRole } from '../services/user';
import { config2 } from '../config';
import NavBarSub from '../components/common/NavbarSub';
import NavbarMain from '../components/common/NavbarMain';

const CartPage = () => {
  const navigate  = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector(state=>state.cart);
  
  console.log(cart);
  // const [cartItems] = useState([
  //   {
  //     id: 1,
  //     title: 'Ebook Title 1',
  //     cover: 'https://via.placeholder.com/100',
  //     price: 10.00,
  //     isRentable: false,
  //   },
  //   {
  //     id: 2,
  //     title: 'Ebook Title 2',
  //     cover: 'https://via.placeholder.com/100',
  //     isRentable: true,
  //     rentStartDate: '',
  //     rentEndDate: '',
  //     rentPerDay: 2.00,
  //     days: 0,
  //   },
  // ]);

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCartAction(id))
  };

  const calculateTotalPrice = () => {
    return cart.items.reduce((total, item) => {
        if(item.rentable&&item.rentLastDate)
        return total + item.totalPrice;
      if(item.discount!=null&&item.discount>0){
      return total + item.basePrice*(1-(item.discount/100));
      }
      if(item.discount==null){
      return total + item.basePrice;
      }
      
    }, 0).toFixed(2);
  };

  return (
    <div>
       <NavbarMain/>
     
     
      {cart.items.length>0&&
    <Container>
      <h2>Your Cart</h2>
      <Table striped bordered hover style={{textAlign:"center"}}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Cover</th>
            <th>Price</th>
            <th>Discount</th>
            <th>Rent/Day</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Days</th>
            <th>Total Rent</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {cart.items.map(item => (
            <tr key={item.id}>
              <td style={{whiteSpace:"nowrap"}}><strong>{item.bookTitle}</strong></td>
              <td>
                
                <img src={`${config2.url}/covers/${item.coverImage}`} rounded className="mx-3"  style={{display:"inline-block",width:"150px"}}/>
              </td>
             <td>{item.rentable&&item.rentLastDate? 'N/A' : `₹${item.basePrice.toFixed(2)}`}</td>
             <td>{!item.rentLastDate&&item.discount>0?`₹${(item.basePrice*item.discount/100).toFixed(2)}`:'0.0'}</td>
             <td>{item.rentable&&item.rentLastDate? `₹${item.rentPerDay.toFixed(2)}` : 'N/A'}</td>
              <td>
                {item.rentable && item.rentLastDate &&(
                  <Form.Control
                    type="date"
                    value={new Date().toISOString().split("T")[0]}
                    readOnly
                  />
                )}
              </td>
              <td>
                {item.rentable && item.rentLastDate&&(
                  <Form.Control
                    type="date"
                    value={item.rentLastDate}
                    readOnly
                  />
                )}
              </td>
              <td>{item.rentable&&item.rentLastDate? item.rentDays : 'N/A'}</td>
              <td>{item.rentable&&item.rentLastDate? `${item.totalPrice}` : 'N/A'}</td>
              <td>
                <Button variant="danger" onClick={() => handleRemoveFromCart(item.id)}>Remove</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Row className="my-3">
        <Col>
          <h4>Total: ₹{calculateTotalPrice()}</h4>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button variant="primary" onClick={()=>{
            navigate("/")
          }}>Continue Shopping</Button>
        </Col>
        <Col className="text-right">
        {cart.items.length>0&&
          <Button variant="success" onClick={async()=>{
                      if(sessionStorage.getItem("token")!=null){
                          const role = await getUserRole();
                          if(role.data==="CUSTOMER"){
                              console.log("In checkout"+role);
                              navigate("/order");
                          }else{
                              console.log("Not a customer")
                              console.log(role);
                              navigate("/login");
                          }
                      }
                      else{
                          console.log("No token")
                          navigate("/login");
                      }
                    }
          }>Checkout</Button>
        }
        </Col>
      </Row>
    </Container>
}
{cart.items.length==0&&
<div>
          <div class="alert" style={{
            backgroundColor: "#fff8e1",
            color: "#795548",
            borderRadius: "10px",
            border: "1px solid #fce4ec",
            
         }}>
            No item in cart
            </div>
             <Row>
             <Col>
               <Button variant="primary mx-3" onClick={()=>{
                 navigate("/")
               }}>Continue Shopping</Button>
             </Col>
             </Row>
             </div>
      }
    </div>
  );
};

export default CartPage;



// import React, { useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { useDispatch, useSelector } from 'react-redux';
// import { removeFromCartAction } from '../features/cartSlice';
// import { config2 } from '../config';
// import { Link, useNavigate } from 'react-router-dom';
// import { getUserRole } from '../services/user';

// const CartPage = () => {
//   const cart = useSelector(state=>state.cart);
// const dispatch = useDispatch();
// const navigate = useNavigate();
//   const getTotalPrice = () => {

//     return cart.items.reduce((total, item) => {
//       if(item.rentLastDate==null){
//         return total + item.basePrice
//       }
//       else{
//         return total + item.totalPrice
//       }
//     }, 0);
//   };

//   const removeItem = (id) => {
//     dispatch(removeFromCartAction(id))
//   };

//   return (
//     <div className="container mt-5">
//       <h1 className="mb-4">Shopping Cart</h1>
//       <table className="table table-bordered">
//         <thead>
//           <tr>
//             <th>Book Title</th>
//             <th>Price</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {cart.items.map((item) => (
//             <tr key={item.id}>
//               <td>{item.bookTitle}
//               <img
//                   src={`${config2.url}/covers/${item.coverImage}`}
//                   alt=""
//                   style={{height:"300px"}}
//                   />
//               </td>
//               <td>{item.basePrice}</td>
//               <td>
//                 <button className="btn btn-danger btn-sm" onClick={() => removeItem(item.id)}>
//                   Remove
//                 </button>
//               </td>
//               {item.rentLastDate&&<td>
//                 {item.rentLastDate}
//                 <br/>
//                 {item.rentDays}
//                 <br/>
//                 {item.totalPrice}
//                 </td>}
//             </tr>
//           ))}
//           <tr>
//             <td colSpan="4" className="text-right"><strong>Total</strong></td>
//             <td><strong>${getTotalPrice().toFixed(2)}</strong></td>
//           </tr>
//         </tbody>
//       </table>
//       <Link to={"/"}><button>Continue shopping</button></Link>
//       {cart.items.length>0&&
//       <button onClick={async()=>{
//         if(sessionStorage.getItem("token")!=null){
//             const role = await getUserRole();
//             if(role.data==="CUSTOMER"){
//                 console.log("In checkout"+role);
//                 navigate("/order");
//             }else{
//                 console.log("Not a customer")
//                 console.log(role);
//                 navigate("/login");
//             }
//         }
//         else{
//             console.log("No token")
//             navigate("/login");
//         }
//       }}>Checkout</button>
//     }
//     </div>
//   );
// };

// export default CartPage;
