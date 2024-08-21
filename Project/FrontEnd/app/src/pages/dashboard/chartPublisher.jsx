import { useEffect, useState } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label } from 'recharts';
export default function ChartPublisher({data,daily,monthly}){
    return (
        <div>
        {<div style={{ padding: '20px' }}>
                  
            <div className="d-flex justify-content-between">
            {monthly!=null&&<div className='h3 border p-3 rounded border-dark'>Monthy Earnings: ₹{(monthly*.75).toFixed(2)}</div>}
            {daily!=null&&<div  className='h3 border p-3 rounded border-dark'>Today's earnings: ₹{(daily*.75).toFixed(2)}</div>}
            </div>
            <div className='mt-5'>
           <ResponsiveContainer width={"100%"} height={500}>
   <BarChart width={600} height={600} data={data}>
   <Bar dataKey="revenue" fill="purple" />
   
   <XAxis dataKey="date"/>
  
   <YAxis dataKey={"revenue"}>
   <Label
         style={{
          textAnchor: "middle",
          fontSize: "130%",
          fill: "grey",
      }}
   angle={270} 
   value={"Revenue in ₹"} />
    </YAxis>
</BarChart>
      </ResponsiveContainer>
      </div>
      
       
        </div>
}
  </div>
    )
}



