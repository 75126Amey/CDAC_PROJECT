function SelectComponent({name,refs,labelName,validationFunction,state,dispatch,options}){
 
    return(<div>
         <label htmlFor="">{labelName}</label>
    <select
      className="form-select "
      onChange={(e) => {
        {
          dispatch({
            type: "validation",
            payload: {
              validFunc: validationFunction,
              target: e.target,
              name: e.target.name,
              value:
                e.target.value,
            },
          });
        }
        console.log(state)
      }}
      ref={refs}
      name={name}
    >
      <option value={0}>{`Select an option`}</option>
        {
            options.map((option) => {
              return (
                <option key={option.id} value={option.value}>
                  {option.name}
                </option>
              );
            })
  
        }
    </select>
    <p style={{ color: "red" }}>{state.selectValid}</p>
  </div>
    )
   
}
export default SelectComponent;