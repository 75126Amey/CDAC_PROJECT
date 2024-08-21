import axios from 'axios'
import config, { config2 } from '../config'

export async function register2(email,password,firstName, lastName,phoneNo,dob,profession,userId) {
  // body parameters
  
  const body = {
    email,password,firstName,lastName,phoneNo,dob,profession
  }
console.log(body);
  const response = await axios.post(`${config2.url}/customer/register`, body)

  return response.data
}
export async function getUserId(email) {

  const response = await axios.get(`${config2.url}/customer/getUserId/${email}`)

  return response.data
}

export const getDetails = async () => {
  const token = sessionStorage.getItem("token");
  const response = await axios.get(`${config.url}/customer/details`, {
    headers: {
      token: token,
    },
  });
  return response.data;
};

export const getBooksPurchasedByCustomer = async () => {
  const token = sessionStorage.getItem("token");
  const response = await axios.get(`${config2.url}/customer/book`, {
    headers: {
      Authorization: "Bearer "+token,
    },
  });
  return response.data;
};

export const getBooksRentedByCustomer = async () => {
  const token = sessionStorage.getItem("token");
  const response = await axios.get(`${config2.url}/customer/book/rent`, {
    headers: {
      Authorization: "Bearer "+token,
    },
  });
  return response.data;
};

export const getReviewableIds = async () => {
  const token = sessionStorage.getItem("token");
  const response = await axios.get(`${config2.url}/customer/book/reviewable`, {
    headers: {
      Authorization: "Bearer "+token,
    },
  });
  return response.data;
}

export const addReview = async(id,rating,comment)=>{
  const body  = {bookId:id,rating: rating, comment: comment}
  console.log("Review" + body);
  const token = sessionStorage.getItem('token')
  const response = await axios.post(`${config2.url}/customer/book/comment`,body, {
    headers: {
      Authorization: "Bearer "+token,
    },
  });
  return response.data;
}

export const getLibrayBooks = async () => {
  const token = sessionStorage.getItem("token");
  const response = await axios.get(`${config2.url}/customer/book/library`, {
    headers: {
      Authorization: "Bearer "+token,
    },
  });
  return response.data;
}

export const getCustomerName = async () => {
  const token = sessionStorage.getItem("token");
  const response = await axios.get(`${config2.url}/customer/name`, {
    headers: {
      Authorization: "Bearer "+token,
    },
  });
  return response.data;
}

export const getOrderIds = async () => {
  const token = sessionStorage.getItem("token");
  const response = await axios.get(`${config2.url}/customer/orders`, {
    headers: {
      Authorization: "Bearer "+token,
    },
  });
  return response.data;
}

export const getCustomerOccupation = async () => {
  const token = sessionStorage.getItem("token");
  const response = await axios.get(`${config2.url}/customer/getOccupation`, {
    headers: {
      Authorization: "Bearer "+token,
    },
  });
  return response.data;
}
