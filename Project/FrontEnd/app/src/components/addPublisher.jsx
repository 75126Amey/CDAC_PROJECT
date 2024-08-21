import { useNavigate } from "react-router-dom";
import FormComponent from "./formComponent";
import { toast } from "react-toastify";
import { useReducer, useRef } from "react";
import { dobValidation, emailValidation, fileValidation, lengthValidation, noValidation } from "../services/validation";
import reducer from "../reducers/register";
import { addAuthor } from "../services/author";

const initialState = {
  email: "",
  password: "",
  phoneNo:"",
  name:"",
  description:"",
  descriptionValid:"\xa0",
  nameValid:"\xa0",
  emailValid: "\xa0",
  passwordValid: "\xa0",
  phoneNoValid: "\xa0",
  };
export default function AddPublisher({change,dashboard}){
    const [form, dispatch] = useReducer(reducer, initialState);
    const navigate = useNavigate();
    //Ref values
    const emailRef = useRef();
    const passwordRef = useRef();
    const phoneNoRef = useRef();
    const nameRef = useRef();
    const descriptionRef = useRef();
    const onRegister = async () => {
      console.log(form);
      if (!emailValidation(form.email)) {
        firstNameRef.current.classList.add("is-invalid");
        dispatch({
          type: "register",
          payload: { name: "firstName", message: "Enter first name" },
        });
      }
        else {
        const formData = new FormData();
        // make the API call and receive the result
        formData.append("email",form.email);
        formData.append("firstName", form.firstName);
        formData.append("lastName", form.lastName);
        formData.append("dob", form.dob);
        formData.append("photo", form.photo);
        formData.append("aboutAuthor", form.aboutAuthor);
        formData.append("website", form.website); 
        const result = await ad(formData);
        console.log(formData);
        if (result["status"] === "success") {
          toast.success("Sucessfully added author");
          change(dashboard,1);
        } else {
          console.log(result["error"]);
          alert("Failed to register the user");
        }
      }
    };
  
    return (
      <div>
        <section className="py-5">
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
                          name="email"
                          validationFunction={emailValidation}
                          refs={emailRef}
                          labelName="Email"
                          type="email"
                          state={form}
                          dispatch={dispatch}
                        />
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
                        name="aboutAuthor"
                        validationFunction={noValidation}
                        labelName="Short Description"
                        type="textarea"
                        state={form}
                        dispatch={dispatch}
                      />
                       <FormComponent
                            name={"website"}
                            refs={websiteRef}
                            type={"text"}
                            validationFunction={lengthValidation}
                            labelName={"Website"}
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
    )
}




  

