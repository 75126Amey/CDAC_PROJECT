import { useEffect, useState } from "react";

export default function MultiAuthor({name,labelName,state,dispatch,refs}){

  
    const validKey = name + "Valid";
  
    const [values,setValues] = useState([]);
    useEffect(()=>{
      dispatch({
        type: "multiAuthor",
        payload: {
          name: name,
          value: values
        }
      })
       },[values])
    const [inputs,setInputs] = useState([]);
    const NormalInput = (
      <div className="row">
        <div className="col-8">
    <div className="input-group">
    <input
      onChange={(e) => {
        setValues(prevValues=>[parseInt(e.target.value),...prevValues.slice(1, prevValues.length)]);
      }}
      type="number"
      className="form-control form-control-lg"
      
      placeholder={labelName}
      name={name}
      id={name}
      ref={refs}
      />
       
       <button className="btn btn-primary" onClick={()=>{
                              setInputs([...inputs,additionalInput]);
                              setValues(prevValues=>[...prevValues,0]);
                            }}>+</button>
      </div>
      </div>
      </div>
    )
    const additionalInput = function({idx}){
      return(
        <input
      onChange={(e) => {
        setValues(prevValues=>[...prevValues.slice(0,idx+1),parseInt(e.target.value),...prevValues.slice(idx+2)]);
      }}
      type="number"
      className="form-control form-control-lg"
      name={name}
      />

      )
    }
    
    return(<div>
         <div className="form-outline mb-3">
                          <label htmlFor={name} className="font-italic label">
                            {labelName}
                           
                          </label>
                          <div>
                          <div className="input-group">
                          {NormalInput}
                         
                            </div>
                          {state[`${validKey}`] && (
                              <p style={{ color: "red", margin: 0 }}>
                              {state[`${validKey}`]}
                            </p>
                          )}
                           {!state[`${validKey}`] && (
                              <p style={{ color: "red", margin: 0 }}>
                              {"\xa0"}
                            </p>
                          )}
                          
                          </div>
                          <div className="d-flex justify-content-start">
                          {inputs.map((Ele,idx)=>{
                            return(
                            <div className="mx-2">
                               <div className="input-group"><Ele idx={idx}/>
                             <button className="btn btn-primary" onClick={()=>{
                              setInputs(inputs.filter(e=>e!==inputs[idx]));
                              setValues(prevValues=>[...prevValues.slice(0,idx+1),...prevValues.slice(idx+2)])
                            }}>-</button>
                            </div>
                            </div>
                           );
                          })}
                          </div>
                        </div>
                       
    </div>)
}