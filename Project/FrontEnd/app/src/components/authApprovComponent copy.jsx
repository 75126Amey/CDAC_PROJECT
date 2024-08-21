import {Link} from 'react-router-dom';
import { Button,Modal } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { config2 } from '../config';
import { updateAuthorDetails } from '../services/author';
export default function AuthApprov({pendingAuthorData}){
  const [showImageModal, setShowImageModal] = useState(0);
  const handleCloseImageModal = () => setShowImageModal(undefined);
  const handleShowImageModal = (id) => setShowImageModal(id);
  const[respondeData,setResponseData] =useState(pendingAuthorData.map(ele=>ele.status));
return(
    <div>
    <div>
    <table className="table align-middle mb-0 bg-white">
    <thead className="bg-light">
      <tr>
        <th>Name</th>
        <th>Identification</th>
        <th>Status</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      
      {pendingAuthorData.map((ele,index)=>{
        return(
          <tr key={ele.id}>
          <td>
            <div className="d-flex align-items-center">
              <img
                  src={`${config2.url}/author/image/photo/${ele.id}`}
                  alt=""
                  style={{width:"45px",height:"45px"}}
                  className="rounded-circle"
                  />
              <div className="ms-3">
                <p className="fw-bold mb-1">{ele.firstName} {ele.lastName}</p>
                <p className="text-muted mb-0">{ele.email}</p>
              </div>
            </div>
          </td>
          <td>
          <Button className='modalButton' onClick={()=>handleShowImageModal(ele.id)}>View</Button>
                   <Modal show={showImageModal===ele.id} onHide={handleCloseImageModal}>
                    <Modal.Header closeButton>
                    <Modal.Title>Identification</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <img src={`${config2.url}/author/image/identification/${ele.id}`} className='img-fluid'/>
                     </Modal.Body>
                   </Modal>

          </td>
          <td>
            <span className="rounded-pill d-inline">{respondeData[index]}</span>
          </td>
          <td>
           {respondeData[index]==="PENDING"&&<div>
            <Button className="mx-4" variant='success'  onClick={async()=>{
              const response = await updateAuthorDetails(ele.id, "APPROVED");
            
              if(response.status==="success"){
                alert("Author approved successfully");
                setResponseData([...respondeData.slice(0,index),"APPROVED",...respondeData.slice(index+1)]);
        
              }else{
                alert("Failed to approve author");
              }
            }}>
              Approve
            </Button>

            <Button variant="danger" onClick={async()=>{
              const response = await updateAuthorDetails(ele.id, "REJECTED");
            
              if(response.status==="success"){
                alert("status updated successfully");
                setResponseData([...respondeData.slice(0,index),"REJECTED",...respondeData.slice(index+1)]);
              }else{
                alert("Failed to approve author");
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