import { useEffect, useState } from 'react';
import '../css/orderHistory.css';
import { getOrderIds } from '../services/customer';
import NavbarMain from '../components/common/NavbarMain';
import { useNavigate } from 'react-router-dom';
export default function OrderHistory(){
    const[orders,setOrders] = useState([]);
    const navigate = useNavigate();
    async function onLoad(){
        const response = await getOrderIds();
        setOrders(response.data);
    }
    useEffect(()=>{
        onLoad();
    },[]);
    return(
        <div>

            <NavbarMain/>
            <h2 style={{textAlign:"center"}}>Order History</h2>
    {orders.map(order=>{
        return(
            <div className="order-history">
    <div className="order-card">
      <div className="order-card-title">Order Number: {order.orderNo}</div>
      <div className="order-card-text">Order Date: {new Date(order.date).toISOString().split("T")[0]}</div>
      <button type="button" class="btn btn-primary" onClick={()=>{
        navigate("/order/reciept",{state:{
            id:order.id
        }})
      }}>View Order Details</button>
  </div>
  </div>
        );
    })}
    

        </div>
    )
}