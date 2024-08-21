export default function RadioComponent({
  name,
  labelName,
  dispatch,
  options,
  state
}) {

  return (
    
    <div className="mb-3">
      <label>{labelName}</label>
      {options.map((ele) => {
        return(
        <div key={ele.id}>
          <label htmlFor={ele.id}>{ele.value}</label>

          <input
            type="radio"
            name={name}
            value={ele.value}
            id={ele.id}
            defaultChecked={state[`${name}`]===ele.value}
            onChange={(e) => {
              dispatch({
                type: "radioSelect",
                payload: {
                  target: e.currentTarget,
                  name: name,
                  value: e.currentTarget.value
                }
              })
            }}
          />
        </div>
        )
      })}
    </div>
  );
}
