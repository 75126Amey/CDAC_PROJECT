import { useReducer, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUserRole, loginUser } from "../services/user";
import { toast } from "react-toastify";
import { emailValidation, passwordValidation } from "../services/validation";
import FormComponent from "../components/formComponent";
import { getBooksPurchasedByCustomer, getBooksRentedByCustomer, getCustomerName, getCustomerOccupation } from "../services/customer";
import { useDispatch } from "react-redux";
import { removeAllCommonsFromCartAction, updateDiscountInCartAction } from "../features/cartSlice";
import { loginAction, setUserName } from "../features/userSlice";

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
  if (action.type == "login") {
    const validKey = action.payload.name + "Valid";
    return { ...state, [validKey]: action.payload.message };
  }
};

function LoginUser() {
  //State variables
  const [login, dispatch] = useReducer(reducer, initialState);
  const emailRef = useRef();
  const passwordRef = useRef();
  const dispatch2 = useDispatch()
  const navigate = useNavigate();
  const onLogin = async () => {
    if (!emailValidation(login.email)) {
      emailRef.current.classList.add("is-invalid");
      dispatch({
        type: "login",
        payload: { name: "email", message: "Enter valid email" },
      });
    } else if (!passwordValidation(login.password)) {
      passwordRef.current.classList.add("is-invalid");
      dispatch({
        type: "login",
        payload: { name: "password", message: "Enter valid password" },
      });
    } else {
      const result = await loginUser(login.email, login.password);
      console.log(result);
      if (result["status"] === "success") {
        const token = result["token"];
        sessionStorage.setItem("token", token);
        toast.success("welcome to the application");
        const role = (await getUserRole()).data;
        console.log(role);
        if (role === "ADMIN") {
          navigate("/admin");
        } else if (role === "CUSTOMER") {
          dispatch2(loginAction())
          const response1 = await getBooksPurchasedByCustomer();
          const response2 = await getBooksRentedByCustomer();
          const response3  = await getCustomerName();
          dispatch2(removeAllCommonsFromCartAction([...response1.data,...response2.data])) //remove common elements from cart
          dispatch2(setUserName(response3.data));
          const response4 = await getCustomerOccupation();
          
          if(response4.data=="STUDENT"||response4.data=="TEACHER"){
          dispatch2(updateDiscountInCartAction())
          }
          navigate("/");
        } else if (role == "PUBLISHER") {
          navigate("/publisher");
        } else if (role == "AUTHOR") {
          navigate("/author");
        }
      } else {
        dispatch({
          type: "login",
          payload: { name: "email", message: "Invalid username/password" },
        });
        dispatch({
          type: "login",
          payload: { name: "password", message: "Invalid username/password" },
        });
        emailRef.current.classList.add("is-invalid");
        passwordRef.current.classList.add("is-invalid");
      }
    }
  };

  return (
    <div>
      <section
        className="vh-100"
        style={{
          backgroundColor: "#dce3e6",
          backgroundImage: "url(" + "/images/register_background1.jpg" + ")",
          backgroundRepeat: "no-repeat",
          backgroundSize: "1600px",
        }}
      >
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-6">
              <div className="card bg-light" style={{ borderRadius: "1rem" }} >
                <div className="row g-0 justify-content-center align-items-center">
                  <div className="col-md-8 col-lg-8 d-none d-block">
                    <img
                      src="https://i.ibb.co/WBGS0jH/login-image.jpg"
                      alt="login form"
                      className="img-fluid"
                      style={{ borderRadius: "1rem 0 0 1rem" }}
                    />
                  </div>
                  <div className="col-10 d-flex align-items-center">
                    <div className="card-body p-4 p-lg-5 text-black">
                      <div className="d-flex flex-column justify-content-center align-items-center mb-3 pb-1">
                      <img
                      src="/images/logo-color.png"
                      alt="logo"
                      className="img-fluid"
                    />
                        <h5
                        className="fw-normal mb-2 pb-2"
                        style={{ letterSpacing: "1px" }}
                      >
                        Sign into your account
                      </h5>
                      </div>
                      <form
                        onSubmit={(e) => e.preventDefault()}
                        noValidate
                        name="login"
                      >
                        <FormComponent
                          name="email"
                          validationFunction={emailValidation}
                          refs={emailRef}
                          labelName="Email"
                          type="email"
                          state={login}
                          dispatch={dispatch}
                        />
                         <FormComponent
                          name="password"
                          validationFunction={passwordValidation}
                          refs={passwordRef}
                          labelName="Password"
                          type="password"
                          state={login}
                          dispatch={dispatch}
                        />
                        

                        <div className="d-flex pt-1 mb-4 justify-content-center">
                          <button
                            className="btn btn-lg btn-block btn-dark border-0"
                            onClick={onLogin}
                            style={{backgroundColor:"#63855A"}}
                          >
                            Login
                          </button>
                        </div>
                        <p
                          className="mb-2 pb-lg-2"
                          style={{ color: "#393f81" }}
                        >
                          Don't have an account?
                          <Link to="/customer/register">Register here</Link>
                        </p>
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

export default LoginUser;
