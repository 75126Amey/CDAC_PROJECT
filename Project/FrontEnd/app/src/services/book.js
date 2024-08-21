import axios from "axios";
import config, { config2 } from "../config";

export async function getRecentlyAddedBooks(pageNo) {
const response = await axios.get(`${config2.url}/book/page/${pageNo}`)
return response.data;
}
export async function getTrendingBooks() {
  const response = await axios.get(`${config2.url}/book/page/trending/0`)
  return response.data;
  }
export async function getBookById(id) {
  const response = await axios.get(`${config2.url}/book/${id}`)
  return response.data;
  }
export async function getKeywords() {
  const token = sessionStorage.getItem('token')
  const response = await axios.get(`${config2.url}/book/keyword`, {
      headers: {
        Authorization: "Bearer "+token,
      },
    });
  return response.data;
  }
export async function addBook(formData){
  const token = sessionStorage.getItem('token')
  const response = await axios.post(`${config2.url}/book/add`, formData, {
    headers: {
      Authorization: "Bearer "+token,
    },
    validateStatus: function (status) {
      return status < 500;
    }
  });
  return response.data;
}

export const getPendingBooks = async () => {
  const token = sessionStorage.getItem("token");
  const response = await axios.get(`${config2.url}/book/pending`, {
    headers: {
      Authorization: "Bearer "+token,
    },
  });
  return response.data;
};

export const updateStatusOfBook = async (id,status) => {
  const token = sessionStorage.getItem("token");
  const response = await axios.patch(`${config2.url}/book/status/${id}`,null, {
    headers: {
      Authorization: "Bearer "+token,
    },
    params:{
      status
    }
  });
  return response.data;
}

export const getReviewsForBook = async (id) => {
  const response = await axios.get(`${config2.url}/book/review/${id}`);
  return response.data;
}

export const getBooksBySearchTerm = async(name)=>{
  const response = await axios.get(`${config2.url}/book/search?term=${name}`)
  return response.data;
}

