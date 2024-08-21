import axios from 'axios'
import config, { config2 } from '../config'

export async function registerUser(email,password,role) {
  // body parameters
  const body = {
    email,password,role
  }

  // make API call
  const response = await axios.post(`${config2.url}/user/register`, body,{validateStatus: function (status) {
    return status < 500;
  }})

  // read JSON data (response)
  return response.data
}
export async function checkIfEmailExists(email){
  const response = await axios.get(`${config2.url}/user/checkEmail/${email}`)
  return response.data;
}
export async function loginUser(email, password) {
  // body parameters

  const body = {
    email,
    password,
  }
  // make API call
  const response = await axios.post(`${config2.url}/user/login`, body,{validateStatus: function (status) {
      return status < 500;
    }})
  console.log(response)
  // read JSON data (response)
  return response.data;
}

export async function getUserRole(){
  const token = sessionStorage.getItem('token')
  const response = await axios.get(`${config2.url}/user/getRole`, {
    headers: {
      Authorization: "Bearer "+token,
    },
    validateStatus: function (status) {
      return status < 500;
    }
  });
  return response.data;
}

export async function getUserId(email) {

  const response = await axios.get(`${config2.url}/user/getUserId/${email}`)

  return response.data
}
export async function getUserIdWithToken() {
  const token = sessionStorage.getItem('token')
  const response = await axios.get(`${config2.url}/user/getUserId`,{
  headers: {
    Authorization: "Bearer "+token,
  },
})
  return response.data
}
export async function getUser(email) {
  const response = await axios.get(`${config2.url}/user/testDownload/${email}`)
  return response.data;
}