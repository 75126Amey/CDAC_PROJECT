import { useEffect, useReducer, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getUserId, register2 } from "../services/author";
import { toast } from "react-toastify";
import reducer from "../reducers/register";
import {
  bankAccountNoValidation,
  dobValidation,
  emailValidation,
  fileValidation,
  ifscCodeValidation,
  lengthValidation,
  phoneNoValidation,
} from "../services/validation";
import FormComponent from "../components/formComponent";
const initialState = {
  firstName: " ",
  lastName: " ",
  email: "",
  phoneNo: "",
  dob: " ",
  photo: null,
  identity: null,
  bankAccountNo: "",
  ifscNo: " ",
  firstNameValid: "\xa0",
  lastNameValid: "\xa0",
  dobValid: "\xa0",
  emailValid: "\xa0",
  phoneNoValid: "\xa0",
  photoValid: "\xa0",
  identityValid: "\xa0",
  bankAccountNoValid: "\xa0",
  ifscNoValid: "\xa0",
};

function RegisterAuthor2() {
  const [form, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();
  const { state } = useLocation();
  //Ref values
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const dobRef = useRef();
  const email2Ref = useRef();
  const photoRef = useRef();
  const phoneNoRef = useRef();
  const identificationRef = useRef();
  const bankAccountNoRef = useRef();
  const ifscNoRef = useRef();

  const onRegister = async () => {
    console.log(form);
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
    } else if (!dobValidation(form.dob)) {
      dobRef.current.classList.add("is-invalid");
      dispatch({
        type: "register",
        payload: { name: "dob", message: "Enter valid dob" },
      });
    } else if (!phoneNoValidation(form.phoneNo)) {
      phoneNoRef.current.classList.add("is-invalid");
      dispatch({
        type: "register",
        payload: { name: "phoneNo", message: "Enter valid phone number" },
      });
    } else if (!fileValidation(form.photo)) {
      photoRef.current.classList.add("is-invalid");
      dispatch({
        type: "register",
        payload: { name: "photo", message: "Upload the necessary file" },
      });
    } else if (!fileValidation(form.identity)) {
      identificationRef.current.classList.add("is-invalid");
      dispatch({
        type: "register",
        payload: { name: "identity", message: "Upload the necessary file" },
      });
    } else if (!bankAccountNoValidation(form.bankAccountNo)) {
      bankAccountNoRef.current.classList.add("is-invalid");
      dispatch({
        type: "register",
        payload: {
          name: "bankAccountNo",
          message: "Enter valid bank account no. (11-16) digits",
        },
      });
    } else if (!ifscCodeValidation(form.ifscNo)) {
      ifscNoRef.current.classList.add("is-invalid");
      dispatch({
        type: "register",
        payload: { name: "ifscNo", message: "Enter valid 11 digit ifsc code" },
      });
    } else {
      const formData = new FormData();
      // make the API call and receive the result
      formData.append("email",state.form.email);
      formData.append("password", state.form.password);
      formData.append("firstName", form.firstName);
      formData.append("lastName", form.lastName);
      formData.append("dob", form.dob);
      formData.append("photo", form.photo);
      formData.append("identification", form.identity);
      formData.append("bankAccountNo", form.bankAccountNo);
      formData.append("ifscCode", form.ifscNo);
      formData.append("phoneNo", form.phoneNo);
      const result = await register2(formData);
      if (result["status"] === "success") {
        toast.success("Successfully registered an author");
        navigate("/login");
      } else {
        console.log(result["error"]);
        alert("Failed to register the user");
      }
    }
  };

  return (
    <div>
      <section className="py-5" style={{ backgroundColor: "#c4dbbd" }}>
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-xl-6">
              <div className="card bg-light" style={{ borderRadius: "15px" }}>
                <div className="card-body">
                  <h2 className="mb-1 text-center">Author Details</h2>
                  <div className="d-flex justify-content-center row align-items-center pt-4 pb-3">
                    <div className="col-md-9 pe-5">
                      <form onSubmit={(e) => e.preventDefault()}>
                        <FormComponent
                          name={"firstName"}
                          refs={firstNameRef}
                          type={"text"}
                          validationFunction={lengthValidation}
                          labelName={"First name"}
                          state={form}
                          dispatch={dispatch}
                        />
                        <FormComponent
                          name={"lastName"}
                          refs={lastNameRef}
                          type={"text"}
                          validationFunction={lengthValidation}
                          labelName={"Last name"}
                          state={form}
                          dispatch={dispatch}
                        />
                        <FormComponent
                          name={"phoneNo"}
                          refs={phoneNoRef}
                          type={"tel"}
                          validationFunction={phoneNoValidation}
                          labelName={"Phone Number"}
                          state={form}
                          dispatch={dispatch}
                        />
                        <FormComponent
                          name={"dob"}
                          refs={dobRef}
                          type={"date"}
                          validationFunction={dobValidation}
                          labelName={"Date of Birth"}
                          state={form}
                          dispatch={dispatch}
                        />
                        <FormComponent
                          name={"photo"}
                          refs={photoRef}
                          type={"file"}
                          validationFunction={fileValidation}
                          labelName={"Photo"}
                          state={form}
                          dispatch={dispatch}
                        />
                        <FormComponent
                          name={"identity"}
                          refs={identificationRef}
                          type={"file"}
                          validationFunction={fileValidation}
                          labelName={"Identification"}
                          state={form}
                          dispatch={dispatch}
                        />
                        <FormComponent
                          name={"bankAccountNo"}
                          refs={bankAccountNoRef}
                          type={"text"}
                          validationFunction={bankAccountNoValidation}
                          labelName={"Bank Account No"}
                          state={form}
                          dispatch={dispatch}
                        />

                        <FormComponent
                          name={"ifscNo"}
                          refs={ifscNoRef}
                          type={"text"}
                          validationFunction={ifscCodeValidation}
                          labelName={"IFSC Code"}
                          state={form}
                          dispatch={dispatch}
                        />
                        <div className="d-flex justify-content-center">
                        <button
                          onClick={onRegister}
                          className="btn btn-success"
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

export default RegisterAuthor2;
