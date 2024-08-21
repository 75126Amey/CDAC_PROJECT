import { Accordion,ListGroup } from "react-bootstrap";
import '../css/accordion.css'; 
export default function CategoryAccordion({data}){

   return( 
    
   <div className="custom-accordion border rounded d-none d-lg-block">
    <h4 className="text-center pb-2 border-bottom">Categories</h4>
   <Accordion alwaysOpen defaultActiveKey={[1]} flush className="">
    {data.filter(ele=>ele.parentId==null).map((ele)=>(
        <Accordion.Item eventKey={ele.id}>
        <Accordion.Header>{ele.name}</Accordion.Header>
        <Accordion.Body>
          <ListGroup variant="flush">
            {data.filter(cat=>cat.parentId===ele.id).map((cat)=>(
              <ListGroup.Item action key={cat.id} className="rounded" on>{cat.name}</ListGroup.Item>
            ))}
          </ListGroup>
        </Accordion.Body>
       
      </Accordion.Item>
    ))}
    </Accordion>
    </div>
   )
}