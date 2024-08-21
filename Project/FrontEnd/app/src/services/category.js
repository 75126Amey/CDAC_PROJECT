import axios from "axios";
import config, { config2 } from "../config";

export async function getCategories() {
const token = sessionStorage.getItem('token')
const response = await axios.get(`${config2.url}/category`);
return response.data;
}

