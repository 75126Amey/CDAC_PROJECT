import {Link} from 'react-router-dom';
import { Button,Modal } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { config2 } from '../config';
import { updateStatusOfBook } from '../services/book';
import Bookdisplay from '../pages/Bookdisplay';
import axios from 'axios';
export default function BookApprov({pendingBookData}){
  const [showImageModal, setShowImageModal] = useState(0);
  const handleCloseImageModal = () => setShowImageModal(undefined);
  const handleShowImageModal = (id) => setShowImageModal(id);
  const[respondeData,setResponseData] =useState(pendingBookData.map(ele=>ele.status));
return(
    <div>
    <div>
    <table className="table align-middle mb-0 bg-white">
    <thead className="bg-light">
      <tr>
        <th>Title</th>
        <th>Author</th>
        <th>Manuscript</th>
        <th>Status</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      
      {pendingBookData.map((ele,index)=>{
        return(
          <tr key={ele.id}>
          <td>
            <div className="d-flex align-items-center">
              <img
                  src={`${config2.url}/covers/${ele.coverImage}`}
                  alt=""
                  style={{height:"300px"}}
                  />
              <div className="ms-3">
                <p className="fw-bold mb-1">{ele.title}</p>
               
              </div>
            </div>
          </td>
          <td>
       {ele.author}

          </td>
          <td>
          <Button className='modalButton' onClick={()=>handleShowImageModal(ele.id)}>View</Button>
                   <Modal show={showImageModal===ele.id} onHide={handleCloseImageModal}>
                    <Modal.Header closeButton>
                    <Modal.Title>Manuscript <a href={`${config2.url}/files/${ele.manuscript}`} download><Button>Download</Button></a></Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <Bookdisplay url={ele.manuscript}/>
                      
                     </Modal.Body>
                   </Modal>
          </td>
          <td>
            <span className="rounded-pill d-inline">{respondeData[index]}</span>
          </td>
          <td>
           {respondeData[index]==="PENDING"&&<div>
            <Button className='mx-4' variant='success' onClick={async()=>{
              const response = await updateStatusOfBook(ele.id, "APPROVED");
            
              if(response.status==="success"){
                alert("Author approved successfully");
                setResponseData([...respondeData.slice(0,index),"APPROVED",...respondeData.slice(index+1)]);
        
              }else{
                alert("Failed to approve book");
              }
            }}>
              Approve
            </Button>
            <Button variant='danger' onClick={async()=>{
              const response = await updateStatusOfBook(ele.id, "REJECTED");
            
              if(response.status==="success"){
                alert("status updated successfully");
                setResponseData([...respondeData.slice(0,index),"REJECTED",...respondeData.slice(index+1)]);
              }else{
                alert("Failed to approve book");
              }
            }}>
              Reject
            </Button>
            </div>
      }
      
          </td>
        </tr>
        )
      })}
    
    </tbody>
  </table>
  </div>
    </div>
);
}