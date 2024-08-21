 const reducer = (state, action) => {
    if (action.type === "validation") {
      const target = action.payload.target;
      const name = target.name;
      let value = target.value;
      const validKey = name + "Valid";
      let message = `Enter valid ${name}`;
      if (name === "firstName") {
        message = "Enter first name";
      } else if (name === "lastName") {
        message = "Enter last name";
      } else if (name === "phoneNo") {
        message = "Enter valid phone number";
      }else if(name === "bankAccountNo") {
        message  = "Enter valid bank account no. (11-16) digits"
      }
      else if(name ==="ifscNo"){
        message = "Enter valid 11 digit ifsc code";
      }
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
    if (action.type == "register") {
      const validKey = action.payload.name + "Valid";
      return { ...state, [validKey]: action.payload.message };
    }
  };
  export default reducer;