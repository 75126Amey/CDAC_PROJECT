import { useEffect, useReducer, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { register2 } from "../services/customer";
import { getUserId } from "../services/user";
import { toast } from "react-toastify";
import FormComponent from "../components/formComponent";
import SelectComponent from "../components/selectComponent";
import reducer from "../reducers/register";
import {
  dobValidation,
  emailValidation,
  lengthValidation,
  phoneNoValidation,
  professionValidation,
} from "../services/validation";


const initialState = {
  firstName: " ",
  lastName: " ",
  phoneNo: " ",
  dob: " ",
  profession: " ",
  firstNameValid: "\xa0",
  lastNameValid: "\xa0",
  phoneNoValid: "\xa0",
  dobValid: "\xa0",
  selectValid: "\xa0",
};

function RegisterCustomer2() {
  const [form, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();
  const { state } = useLocation();
  

  //State variables;
  const [userId, setUserId] = useState(0);

  //Ref values
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const phoneNoRef = useRef();
  const dobRef = useRef();
  const professionRef = useRef();

  const onRegister = async () => {
    if (!lengthValidation(form.firstName)) {
      firstNameRef.current.classList.add("is-invalid");
      dispatch({
        type: "register",
        payload: { name: "firstName", message: "Enter first name" },
      });
    } else if (!lengthValidation(form.lastName)) {
      lastNameRef.current.classList.add("is-invalid");
      dispatch({
        type: "register",
        payload: { name: "lastName", message: "Enter last name" },
      });
    } else if (!phoneNoValidation(form.phoneNo)) {
      phoneNoRef.current.classList.add("is-invalid");
      dispatch({
        type: "register",
        payload: { name: "phoneNo", message: "Enter valid phone number" },
      });
    } else if (!dobValidation(form.dob)) {
      dobRef.current.classList.add("is-invalid");
      dispatch({
        type: "register",
        payload: { name: "dob", message: "Enter valid dob" },
      });
    } else if (!professionValidation(form.profession)) {
      professionRef.current.classList.add("is-invalid");
      dispatch({
        type: "register",
        payload: { name: "profession", message: "Enter valid profession" },
      });
    } else {
      // make the API call and receive the result
   
      const result = await register2(
        state.form.email,
        state.form.password,
        form.firstName,
        form.lastName,
        form.phoneNo,
        form.dob,
        form.profession,
        
      );
      if (result["status"] === "success") {
        toast.success("successfully registered a user");
        navigate("/login");
      } else {
        console.log(result["error"]);
        toast.danger("Failed to register the user");
      }
    }
  };

  return (
    <div>
      <section className="vh-100" style={{ backgroundColor: "#c4dbbd" }}>
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-xl-6">
              <div className="card bg-light" style={{ borderRadius: "15px" }}>
                <div className="card-body">
                  <h2 className="mb-1 text-center">Customer Details</h2>
                  <div className="d-flex justify-content-center row align-items-center pt-4 pb-3">
                    <div className="col-md-9 pe-5">
                      <form onSubmit={(e) => e.preventDefault()}>
                        <FormComponent
                          name="firstName"
                          validationFunction={lengthValidation}
                          refs={firstNameRef}
                          labelName="First Name"
                          type="text"
                          state={form}
                          dispatch={dispatch}
                        />
                        <FormComponent
                          name="lastName"
                          validationFunction={lengthValidation}
                          refs={lastNameRef}
                          labelName="Last Name"
                          type="text"
                          state={form}
                          dispatch={dispatch}
                        />

                        <FormComponent
                          name="phoneNo"
                          validationFunction={phoneNoValidation}
                          refs={phoneNoRef}
                          labelName="Phone No."
                          type="tel"
                          state={form}
                          dispatch={dispatch}
                        />

                        <FormComponent
                          name="dob"
                          validationFunction={dobValidation}
                          refs={phoneNoRef}
                          labelName="Date of Birth"
                          type="date"
                          state={dobRef}
                          dispatch={dispatch}
                        />
                        <SelectComponent
                          name={"profession"}
                          refs={professionRef}
                          labelName="Profession"
                          validationFunction={professionValidation}
                          state={form}
                          dispatch={dispatch}
                          options={[
                            { id: 2, value: "STUDENT",name:"STUDENT" },
                            { id: 3, value: "TEACHER",name:"TEACHER"},
                            { id: 4, value: "OTHER",name:"OTHER"},
                          ]}
                        />
                          <div className="d-flex justify-content-center">
                        <button
                          onClick={onRegister}
                          className="btn btn-success btn-block"
                        >
                          Sign Up
                        </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default RegisterCustomer2;
