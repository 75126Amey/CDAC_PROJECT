import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { config2 } from '../config';

const PaymentPage = () => {
    const [amount, setAmount] = useState('');
    const [orderNo, setOrderNo] = useState('');
    const [orderId, setOrderId] = useState('');
    const [paymentType, setPaymentType] = useState('CARD');
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [upiId, setUpiId] = useState('');
    const [otp, setOtp] = useState('');
    const [cardSent,isCardSent] = useState(false);
    const navigate = useNavigate();
    const handlePaymentTypeChange = (e) => {
        setPaymentType(e.target.value);
    };
    const{state} = useLocation();
    useEffect(()=>{
        if(state == null){
            navigate("/acessDenied")
        }
        else{
        setAmount(state.amount);
        setOrderNo(state.orderNo);
        setOrderId(state.id);
        }
    })
    const handleSubmit = async () => {
        
        console.log(state);
        const response = await axios.post(`${config2.url}/order/generateOTP`,{
            "orderId":state.id,
            "type":paymentType,
            cardNo:cardNumber,
        },{
            headers: {
                Authorization: "Bearer "+sessionStorage.getItem('token'),
            },
        })
        if(response.data.data.status=="error"){
            navigate("/order/reciept",{state:{
                id:orderId
            }})
        }else{
        isCardSent(true)
        }
    }
    const handlePayment = async () => {
        const body  = {
            orderId,
            otp
        }
        const response = await axios.post(`${config2.url}/order/validateOTP`,null,{
            headers: {
                Authorization: "Bearer "+sessionStorage.getItem('token'),
            },
            params:{
                orderId,
                otp
            }
        })
        navigate("/order/reciept",{state:{
            id:orderId
        }})
               
    }
    return (
        <div className="container payment-container" style={styles.container}>
            <h2 className="text-center payment-header">Payment Form</h2>

            <form>
                <div className="mb-3">
                    <h5>Amount: ₹{amount}</h5>
                </div>

                <div className="mb-3">
                   <h5>Order Id: {orderNo}</h5>
                </div>

                <div className="mb-3">
                    <label htmlFor="paymentType" className="form-label">Type of Payment</label>
                    <select
                        className="form-select"
                        id="paymentType"
                        value={paymentType}
                        onChange={handlePaymentTypeChange}
                    >
                        <option value="CARD">Card</option>
                        <option value="UPI">UPI</option>
                    </select>
                </div>

                {paymentType === 'CARD' && (
                    <>
                        <div className="mb-3">
                            <label htmlFor="cardNumber" className="form-label">Card Number</label>
                            <input
                                type="text"
                                className="form-control"
                                id="cardNumber"
                                value={cardNumber}
                                onChange={(e) => setCardNumber(e.target.value)}
                                placeholder="Enter your card number"
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="expiryDate" className="form-label">Expiry Date</label>
                            <input
                                type="text"
                                className="form-control"
                                id="expiryDate"
                                value={expiryDate}
                                onChange={(e) => setExpiryDate(e.target.value)}
                                placeholder="MM/YY"
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="cvv" className="form-label">CVV</label>
                            <input
                                type="text"
                                className="form-control"
                                id="cvv"
                                value={cvv}
                                onChange={(e) => setCvv(e.target.value)}
                                placeholder="Enter CVV"
                            />
                        </div>
                    </>
                )}

                {paymentType === 'UPI' && (
                    <div className="mb-3">
                        <label htmlFor="upiId" className="form-label">UPI ID</label>
                        <input
                            type="text"
                            className="form-control"
                            id="upiId"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                            placeholder="Enter your UPI ID"
                        />
                    </div>
                )}

{cardSent==false&&
               <div>
                <button type="button" className="btn btn-primary w-100" onClick={handleSubmit}>
                    Generate OTP
                </button>
                </div> 
}
               {cardSent&&
               <div>
                <div className="mb-3">
                    <label htmlFor="otp" className="form-label">OTP</label>
                    <input
                        type="text"
                        className="form-control"
                        id="otp"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        placeholder="Enter OTP"
                    />
                </div>

                <button type="button" className="btn btn-primary w-100" onClick={handlePayment}>
                    Make Payment
                </button>
                </div> 
}
            </form>
        </div>
    );
};

const styles = {
    container: {
        maxWidth: '500px',
        margin: '50px auto',
        padding: '30px',
        backgroundColor: '#fff',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
        borderRadius: '8px',
    },
};

export default PaymentPage;
