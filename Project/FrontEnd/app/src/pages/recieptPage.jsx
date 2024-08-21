import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Image, Table, Navbar } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { getOrder } from '../services/order';
import NavbarMain from '../components/common/NavbarMain';
import { config2 } from '../config';
import Footer from '../components/common/Footer';

const ReceiptPage = () => {
    const {state} = useLocation();
    const [orderDetails,setOrderDetails] = useState({});
    let id;
    let purchasedItems;
    let rentedItems;
    if(state!=null){
        id = state.id;
    }
    // Fetch order details using the order ID
    async function getOrderDetails(){
        const  response = await getOrder(id);
        setOrderDetails(response.data);
        console.log(response);
    }
    useEffect(()=>{
        getOrderDetails();
    },[])
  // Separate rented and purchased items

//   purchasedItems = orderDetails.items.filter(item => !item.isRented);
//   rentedItems = orderDetails.items.filter(item => item.isRented);

  return (
    <div>
   <NavbarMain/>
  {orderDetails&&orderDetails.orderDate&& <div class="container my-4 border border-dark">
        <header class="mb-4">
            <h2 className='mb-3'>Order Receipt</h2>
            <p className='h5'><strong>Customer Name: {orderDetails.customerName}</strong> </p>
            <p className='h5'><strong>Order No: {orderDetails.orderNo}</strong> </p>
            <p className='h5'><strong>Transaction No: {orderDetails.transactionNo}</strong> </p>
            <p className='h5'><strong>Order Date: {new Date(orderDetails.orderDate).toISOString().split("T")[0]}</strong> </p>
            {orderDetails.orderStatus==="FAILED"&&<p className='h5'><strong>Status: Payment failed</strong></p>}
        </header>

        {orderDetails.orderItems&&orderDetails.orderItems.length>0 &&
        <section class="mb-4 ">
           
            <h4>{orderDetails.orderStatus==="SUCCESS"&&`Purchased`} Items</h4>

            <table class="table table-bordered" style={{textAlign:"center"}}>
                <thead class="thead-light">
                    <tr>
                        <th>Book Title</th>
                        <th>Price</th>
                        <th>Discount</th>
                        <th>Net Price</th>
                    </tr>
                </thead>
                <tbody>
                {orderDetails.orderItems.map(item=>{
                   
                  return ( <tr>
                        <td>{item.bookTitle}</td>
                        <td>₹{item.basePrice.toFixed(2)}</td>
                        <td>₹{item.discountPrice?item.discountPrice.toFixed(2):'0.00'}</td>
                        <td>₹{item.netPrice.toFixed(2)}</td>
                    </tr>    
                   )
                    })};
                    
                </tbody>
            </table>
        </section>}
{
    orderDetails.rentItems&&orderDetails.rentItems.length>0&&
        <section class="mb-4">
            <h4>Rented Items</h4>
            <table class="table table-bordered" style={{textAlign:"center"}}>
                <thead class="thead-light">
                    <tr>
                       
                        <th>Book Title</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Days</th>
                        <th>Rent per Day</th>
                        <th>Total Rent</th>
                    </tr>
                </thead>
                <tbody>
                  {orderDetails.rentItems.map(item=>{
                    return (
                        
                              <tr>
                      
                        <td>{item.bookTitle}</td>
                        <td>{item.rentStartDate&&new Date(item.rentStartDate).toISOString().split("T")[0]}</td>
                        <td>{item.rentLastDate&&new Date(item.rentLastDate).toISOString().split("T")[0]}</td>
                        <td>{item.noOfDaysRented}</td>
                        <td>₹{item.basePrice}</td>
                        <td>₹{(item.basePrice*item.noOfDaysRented).toFixed(2)}</td>
                    </tr>
                        
                    )
                  })}
                  
                </tbody>
            </table>
        </section>

                }
        <footer class="mt-4 ">
            <div class="d-flex align-items-end flex-column">
                <div style={{fontSize:"1.2em"}}><strong>Subtotal: </strong>₹{orderDetails.baseAmt}</div>
                <div style={{fontSize:"1.2em"}}><strong>Discount: </strong> ₹{orderDetails.discountAmt?orderDetails.discountAmt.toFixed(2):'0.00'}</div>
                <div style={{fontSize:"1.2em"}}><strong>Total: </strong>₹{orderDetails.netAmt}</div>
             
            </div>
           { orderDetails.orderStatus==="SUCCESS"&&<h3 class="mt-4" style={{textAlign:"center"}}>Thank you for your purchase!</h3>}
        </footer>
    </div>
}
    </div>
   
  );
};

export default ReceiptPage;
