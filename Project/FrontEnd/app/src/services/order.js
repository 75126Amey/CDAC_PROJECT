import axios from "axios";
import { config2 } from "../config";

export async function placeOrder(body){
    const token = sessionStorage.getItem('token')
    const response = await axios.post(`${config2.url}/order/make`, body,{
      headers: {
        Authorization: "Bearer "+token,
      },
    });
    return response.data;
  }
  export async function getOrder(id){
    const token = sessionStorage.getItem('token')
    const response = await axios.get(`${config2.url}/order/${id}`,{
      headers: {
        Authorization: "Bearer "+token,
      },
    });
    return response.data;
  }