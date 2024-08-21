import { useEffect, useRef, useState, useReducer } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

import { toast } from "react-toastify";
import { emailValidation, passwordValidation } from "../services/validation";
import FormComponent from "../components/formComponent";
import { checkIfEmailExists, registerUser } from "../services/user";
const initialState = {
  email: "",
  password: "",
  emailValid: "\xa0",
  passwordValid: "\xa0",
};
const reducer = (state, action) => {
  if (action.type === "validation") {
    const target = action.payload.target;
    const validKey = target.name + "Valid";
    
    if (action.payload.validFunc(target.value)) {
      target.classList.remove("is-invalid");
      return { ...state, [validKey]: "\xa0", [target.name]: target.value };
    } else {
      target.classList.add("is-invalid");
      return {
        ...state,
        [validKey]: `Enter valid ${target.name}`,
        [target.name]: target.value,
      };
    }
  }
  if (action.type == "register") {
    const validKey = action.payload.name + "Valid";
    return { ...state, [validKey]: action.payload.message };
  }
};

function Register1() {
  const location = useLocation();
  const navigate = useNavigate();
  const [role, setRole] = useState("");

  const [form, dispatch] = useReducer(reducer, initialState);

  const [confirmPassword, setConfirmPassword] = useState("");
  const [confPassValid, setConfPassValid] = useState("\xa0");
  useEffect(() => {
    if (location.pathname.split("/").includes("customer")) setRole("CUSTOMER");
    else if (location.pathname.split("/").includes("author")) setRole("AUTHOR");
  }, []);

  const emailRef = useRef();
  const passRef = useRef();
  const confPassRef = useRef();

  const onRegister = async () => {
    if (!emailValidation(form.email)) {
      emailRef.current.classList.add("is-invalid");
      dispatch({
        type: "login",
        payload: { name: "email", message: "Enter valid email" },
      });
    } else if (!passwordValidation(form.password)) {
      passRef.current.classList.add("is-invalid");
      dispatch({
        type: "login",
        payload: { name: "password", message: "Enter valid password" },
      });
    } else if (
      confirmPassword !== form.password ||
      confirmPassword.length === 0
    ) {
      confPassRef.current.classList.add("is-invalid");
      setConfPassValid("Password doesn't match");
    } else {
  
      const result = await checkIfEmailExists(form.email);
      
      if (result["status"] === "success" && role === "CUSTOMER") {
       
        navigate("/customer/register/details", {
          state: {form},
        });
      } else if (result["status"] === "success" && role === "AUTHOR") {
     
        navigate("/author/register/details", {
          state: { form },
        });
      } else {
        if (result["error"]==="EMAIL_EXISTS") {
          emailRef.current.classList.add("is-invalid");
          dispatch({
            type: "register",
            payload: { name: "email", message: "Email already exists" },
          });
        }
      }
    }
  };

  return (
    <div>
      <section
        className="vh-100 bg-image"
        style={{
          backgroundImage: "url(" + "/images/register_background1.jpg" + ")",
          backgroundRepeat: "no-repeat",
          backgroundSize: "1600px",
        }}
      >
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-9 col-lg-7 col-xl-6">
              <div className="card" style={{ borderRadius: "15px" }}>
                <div className="card-body p-5">
                  <h2 className="text-uppercase text-center mb-5">
                    Create an account
                  </h2>

                  <form onSubmit={(e) => e.preventDefault()} noValidate>
                   
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
                      name="password"
                      validationFunction={passwordValidation}
                      refs={passRef}
                      labelName="Password"
                      type="password"
                      state={form}
                      dispatch={dispatch}
                    />

                    <div data-mdb-input-init className="form-outline mb-4">
                      <label className="form-label" htmlFor="">
                        Confirm Password
                      </label>
                      <input
                        onChange={(e) => {
                          setConfirmPassword(e.target.value);
                          if (
                            e.target.value !== form.password ||
                            e.target.value.length === 0
                          ) {
                            confPassRef.current.classList.add("is-invalid");
                            setConfPassValid("Password doesn't match");
                          } else {
                            confPassRef.current.classList.remove("is-invalid");
                            setConfPassValid("\xa0");
                          }
                        }}
                        type="password"
                        className="form-control form-control-lg"
                        ref={confPassRef}
                        name="confirmPassword"
                      />
                      <p style={{ color: "red" }}>{confPassValid}</p>
                    </div>
                    <div className="d-flex justify-content-center">
                      <button
                        className="btn btn-success btn-block btn-lg"
                        onClick={onRegister}
                      >
                        Register
                      </button>
                    </div>

                    <p className="text-center text-muted mt-5 mb-0">
                      Have already an account?
                      <Link to="/login">Login here</Link>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Register1;
