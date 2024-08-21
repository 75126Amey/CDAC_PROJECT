const reducer = (state, action) => {
    if (action.type === "validation") {
      const target = action.payload.target;
      const name = target.name;
      let value = target.value;
      const validKey = name + "Valid";
      let message = `Enter valid ${name}`;
      if(target.type ==="file"){
       value  = target.files[0];
       message = "Upload the necessary file"
      }
      if (action.payload.validFunc(value)) {
        target.classList.remove("is-invalid");
        return { ...state, [validKey]: "\xa0", [name]: value };
      } else {
        target.classList.add("is-invalid");
        return {
          ...state,
          [validKey]: message,
          [name]: value,
        };
      }
    }
    else if (action.type == "register") {
      const validKey = action.payload.name + "Valid";
      console.log(validKey);
      return { ...state, [validKey]: action.payload.message };
    }
    else if (action.type === "radioSelect") {
      const target = action.payload.target;
      const name = target.name;
      let value = target.value;
      return {...state,[name]: value}
    }
    else if(action.type === "multiAuthor"){
      const name = action.payload.name
      return { ...state, [name]: action.payload.value}
    }
    else if(action.type === "keywords"){
      const name = action.payload.name
      return { ...state, [name]: action.payload.value}
    }
    else{
      return {...state}
    }
  };
  export default reducer;