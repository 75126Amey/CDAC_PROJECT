import axios from "axios";
import { config2 } from "../config";

export async function get7DaysDataForAdmin(){
    const token = sessionStorage.getItem("token");
    const response = await axios.get(`${config2.url}/order/weekly`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    const data = response.data.data.graph.list1.map(ele=>{
        return {
          date: ele.date.split('T')[0],
          sale: ele.sale
        }
  
    });
    
    const list =  Object.values(
        data.reduce((agg, car) => {
          if (agg[car.date] === undefined) agg[car.date] = { date: car.date, revenue: 0 }
          agg[car.date].revenue += +car.sale*.25
          return agg
        }, {})
      )
    
    const daily = response.data.data.daily;
    const monthly = response.data.data.monthly;

    return { list, daily, monthly };
}

export async function get7DaysDataForPublisher(){
    const token = sessionStorage.getItem("token");
    const response = await axios.get(`${config2.url}/publisher/weekly`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    const data = response.data.data.graph.list1.map(ele=>{
        return {
          date: ele.date.split('T')[0],
          sale: ele.sale
        }
  
    });
    
    const list =  Object.values(
        data.reduce((agg, car) => {
          if (agg[car.date] === undefined) agg[car.date] = { date: car.date, revenue: 0 }
          agg[car.date].revenue += +car.sale*.75
          return agg
        }, {})
      )
    
    const daily = response.data.data.daily;
    const monthly = response.data.data.monthly;

    return { list, daily, monthly };
}

export async function get7DaysDataForAuthor(){
  const token = sessionStorage.getItem("token");
  const response = await axios.get(`${config2.url}/author/weekly`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  const data = response.data.data.graph.list1.map(ele=>{
      return {
        date: ele.date.split('T')[0],
        sale: ele.sale
      }

  });
  
  const list =  Object.values(
      data.reduce((agg, car) => {
        if (agg[car.date] === undefined) agg[car.date] = { date: car.date, revenue: 0 }
        agg[car.date].revenue += +car.sale*.75
        return agg
      }, {})
    )
  
  const daily = response.data.data.daily;
  const monthly = response.data.data.monthly;

  return { list, daily, monthly };
}