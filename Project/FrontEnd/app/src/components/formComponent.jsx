export default function FormComponent({name,validationFunction,refs,labelName,type,state,dispatch}){
    const validKey = name + "Valid";
    const normalInput = (   <input
      onChange={(e) => {
        dispatch({
          type: "validation",
          payload:{validFunc: validationFunction,
            target: e.target}
          
        });
      }}
      type={type}
      className="form-control form-control-lg"
      ref = {refs}
      placeholder={labelName}
      name={name}
      id={name}
    />)
    const textArea = (<textarea
      onChange={(e) => {
        dispatch({
          type: "validation",
          payload:{validFunc: validationFunction,
            target: e.target}
          
        });
      }}
      type={type}
      className="form-control form-control-lg"
      ref = {refs}
      placeholder={labelName}
      name={name}
      id={name}
    />)
    return(<div>
         <div className="form-outline mb-2">
                          <label htmlFor={name} className="font-italic label">
                            {labelName}
                           
                          </label>
                          {type ==="textarea"?textArea:normalInput}
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
    </div>)
}