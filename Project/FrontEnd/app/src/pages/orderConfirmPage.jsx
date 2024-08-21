import { useDispatch, useSelector } from "react-redux"
import { placeOrder } from "../services/order"
import { removeAllfromCartAction } from "../features/cartSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function OrderConfirm(){
    const cart = useSelector(state=>state.cart)
    const navigate = useNavigate();  // to navigate to success page after order placement
  const dispatch = useDispatch();
    const body = {
        rentItems:cart.items.filter(item=>item.rentLastDate!=null).map(item=>({id:item.id,rentLastDate:new Date(item.rentLastDate).toISOString()})),
        itemIds: cart.items.filter(item=>item.rentLastDate==null).map(item=>item.id)
    }
  
    return(
        <div>
            <h1>Please confirm your order</h1>
            {
                cart.items.map(items=>{
                    return(
                        <div key={items.id}>
                            <p>{items.bookTitle}</p>
                            <p>{items.basePrice}</p>
                        </div>
                    )
                })
            }
            <button onClick={async()=>{
                console.log("Body:"+body);
              //  const response = await placeOrder(body);
               // dispatch(removeAllfromCartAction())
               // navigate("/")
                
            }}>Place order</button>
            
        </div>
    )
}



export default OrderConfirm;