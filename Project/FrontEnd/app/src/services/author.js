import axios from "axios";
import config, { config2 } from "../config";
export const getAuthorDetails = async () => {
  const token = sessionStorage.getItem("token");
  const response = await axios.get(`${config2.url}/author/details`, {
    headers: {
      Authorization: "Bearer "+token,
    },
  });
  return response.data;
};
export async function register2(formdata) {
const response = await axios.post(`${config2.url}/author/register`, formdata);
  return response.data;
}

export async function getUserId(email) {

  const response = await axios.get(`${config.url}/author/getUserId/${email}`)

  return response.data
}
export const getPendingAuthors = async () => {
  const token = sessionStorage.getItem("token");
  const response = await axios.get(`${config2.url}/author/pending`, {
    headers: {
      Authorization: "Bearer "+token,
    },
  });
  return response.data;
};

export const updateAuthorDetails = async (id,status) => {
  const token = sessionStorage.getItem("token");
  const response = await axios.patch(`${config2.url}/author/status/${id}`,null, {
    headers: {
      Authorization: "Bearer "+token,
    },
    params:{
      status
    }
  });
  return response.data;
}

export const getApprovedProAuthors = async () => {
  const token = sessionStorage.getItem("token");
  const response = await axios.get(`${config2.url}/author/details/pro`, {
    headers: {
      Authorization: "Bearer "+token,
    },
  });
  return response.data;
};

export const updateProAuthorDetails = async (formdata) => {
  const token = sessionStorage.getItem("token");
  const response  = await axios.put(`${config2.url}/proAuthor/details`,formdata,{
    headers: {
      Authorization: "Bearer "+token,
    },
  });
  return response.data;
}

export const getBooksByAuthor = async () => {
  const token = sessionStorage.getItem("token");
  const response = await axios.get(`${config2.url}/author/books`, {
    headers: {
      Authorization: "Bearer "+token,
    },
  });
  return response.data;
}

export async function addAuthor(formData){
  const token = sessionStorage.getItem('token')
  const response = await axios.post(`${config2.url}/proAuthor/register`, formData, {
    headers: {
      Authorization: "Bearer "+token,
    },
    validateStatus: function (status) {
      return status < 500;
    }
  });
  return response.data;
}

export async function addPublisher(formData){
  const token = sessionStorage.getItem('token')
  const response = await axios.post(`${config2.url}/proAuthor/register`, formData, {
    headers: {
      Authorization: "Bearer "+token,
    },
    validateStatus: function (status) {
      return status < 500;
    }
  });
  return response.data;
}