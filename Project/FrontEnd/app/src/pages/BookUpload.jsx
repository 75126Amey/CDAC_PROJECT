import { useEffect, useReducer, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios, { CanceledError } from "axios";
import reducer from "../reducers/bookUpload";
import { lengthValidation, noValidation, selectValidation } from "../services/validation";
import FormComponent from "../components/formComponent";
import MultiAuthor from "../components/multiAuthor";
import RadioComponent from "../components/radioComponent";
import config from "../config";
import { getCategories } from "../services/category";
import SelectComponent from "../components/selectComponent";
import AddingKeywords from "../components/keywordPool";
import { addBook, getKeywords } from "../services/book";
const initialState = {
  isbn: " ",
  title: " ",
  bookSubtitle: " ",
  price: 0.0,
  isRentable: "No",
  longDesc: "",
  shortDesc: "",
  publisherToken: null,
  authorTokens: [],
  keywords: [],
  parentcategoryId: 0,
  categoryId: 0,
  coverImage: null,
  manuscript: null,
  rentPerDay:0,
  pages: 0,
  publishDate: "",
  titleValid: "\xa0",
  priceValid: "\xa0",
  coverImageValid: "\xa0",
  publisherTokenValid: "\xa0",
  authorTokensValid: "\xa0",
  parentcategoryIdValid: "\xa0",
  categoryIdValid:"\xa0",
  keywords: [],
  keywordsValid:"\xa0"
};
export default function BookUpload({change,dashboard}) {
  const [form, dispatch] = useReducer(reducer, initialState);
  const [categories,setCategories] = useState([]);
  const [keywordsdata, setKeywordsData] = useState([]);
  let formData = new FormData();
  const navigate = useNavigate();
  const titleRef = useRef();
  const publisherIdRef = useRef();
  const authorIdRef = useRef();
  const categoriesIdRef = useRef();
  useEffect(()=>{
    const func1 = async()=>{
      const response = await getCategories();
      setCategories(response.data);
      const keywordsResponse = await getKeywords();
      setKeywordsData(keywordsResponse.data); 
    }
    func1();
  },[])
  const onRegister = async () => {
    if (
      form.authorTokens.length == 0 ||
      form.authorTokens.every((e) => e === 0)
    ) {
      console.log("Please select a publisher");
      dispatch({
        type: "register",
        payload: { name: "authorTokens", message: "Enter atleast one author" },
      });
    } else if (form.publisherToken == null) {
      dispatch({
        type: "register",
        payload: { name: "publisherToken", message: "Enter publisher" },
      });
      console.log(form);
    } else if (form.publishDate.length == 0) {
      dispatch({
        type: "register",
        payload: { name: "publishDate", message: "Enter publish date" },
      });
    } else if (form.categoryId === 0) {
      dispatch({
        type: "register",
        payload: { name: "categories", message: "Choose atleast one category" },
      });
    }
    else {
      formData.append("bookTitle", form.title);
      formData.append("isbn", form.isbn);
      formData.append("bookSubtitle", form.bookSubtitle);
      formData.append("basePrice", form.price);
      formData.append("coverImage", form.coverImage);
      formData.append("manuscript", form.manuscript);
      let rentable = (form.isRentable === "No") ? false : true;
      formData.append("isRentable", rentable);
      formData.append("pages", form.pages);
      formData.append("longDesc", form.longDesc);
      formData.append("shortDesc", form.shortDesc);
      formData.append("datePublished", form.publishDate);
      formData.append("publisherId", form.publisherToken);
      formData.append("authorIds", form.authorTokens);
      formData.append("categoryId", form.categoryId);
      formData.append("keywords", form.keywords);
      formData.append("rentPerDay", form.rentPerDay);
      console.log(form);
      async function createResponse(){
      const response = await addBook(formData);
      formData = new FormData();
      if (response.status === "error") {
        console.log(response.error);
        if (response.error=== "INV_PUB") {
          dispatch({
            type: "register",
            payload: {
              name: "publisherToken",
              message: "Enter valid publisher id",
            },
          });
          if (response.error=== "INV_AUTH") {
            dispatch({
              type: "register",
              payload: {
                name: "authorTokens",
                message: "Enter valid author id",
              },
            });
          }
          if(response.error=== "INV_TITLE"){
            dispatch({
              type: "register",
              payload: {
                name: "title",
                message: "Title already exists",
              },
            });
          }
        }
        {
        }
      } else {
        toast.success("Sucessfully added book");
        change(dashboard,1);
        console.log(response.data);
        
      }
    }
    createResponse();
  }
  };

  return (
    <div>
      <section className="py-5" style={{ backgroundColor: "#ffffff" }}>
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-xl-6">
              <div className="card bg-light" style={{ borderRadius: "15px" }}>
                <div className="card-body">
                  <div className="d-flex justify-content-center row align-items-center pt-4 pb-3">
                    <div className="col-md-9 pe-5">
                      <FormComponent
                        name="title"
                        validationFunction={lengthValidation}
                        refs={titleRef}
                        labelName="Book Title"
                        type="text"
                        state={form}
                        dispatch={dispatch}
                      />
                      <FormComponent
                        name="isbn"
                        validationFunction={noValidation}
                        labelName="ISBN"
                        type="text"
                        state={form}
                        dispatch={dispatch}
                      />

                      <FormComponent
                        name="bookSubtitle"
                        validationFunction={noValidation}
                        labelName="Book SubTitle"
                        type="text"
                        state={form}
                        dispatch={dispatch}
                      />

                      <FormComponent
                        name="price"
                        validationFunction={noValidation}
                        labelName="Base Price"
                        type="Number"
                        state={form}
                        dispatch={dispatch}
                      />

                      <FormComponent
                        name="coverImage"
                        validationFunction={noValidation}
                        labelName="Cover Image"
                        type="file"
                        state={form}
                        dispatch={dispatch}
                      />
                      <FormComponent
                        name="manuscript"
                        validationFunction={noValidation}
                        labelName="File"
                        type="file"
                        state={form}
                        dispatch={dispatch}
                      />

                      <FormComponent
                        name="pages"
                        validationFunction={noValidation}
                        labelName="No. of Pages"
                        type="number"
                        state={form}
                        dispatch={dispatch}
                      />

                      <MultiAuthor
                        name="authorTokens"
                        validationFunction={noValidation}
                        labelName="Author id"
                        type="number"
                        state={form}
                        dispatch={dispatch}
                        refs={authorIdRef}
                      />

                      <RadioComponent
                        name="isRentable"
                        labelName="Is Rentable"
                        state={form}
                        dispatch={dispatch}
                        options={[
                          { id: 1, value: "Yes" },
                          { id: 2, value: "No" },
                        ]}
                      />
                      {form.isRentable==="Yes"&&
                      <FormComponent
                        name="rentPerDay"
                        validationFunction={noValidation}
                        labelName="Rent Price"
                        type="number"
                        state={form}
                        dispatch={dispatch}
                      />
}
                      <FormComponent
                        name="longDesc"
                        validationFunction={noValidation}
                        labelName="Long Description"
                        type="textarea"
                        state={form}
                        dispatch={dispatch}
                      />

                      <FormComponent
                        name="shortDesc"
                        validationFunction={noValidation}
                        labelName="Short Description"
                        type="textarea"
                        state={form}
                        dispatch={dispatch}
                      />
                      <FormComponent
                        name="publishDate"
                        validationFunction={noValidation}
                        labelName="Publish Date"
                        type="date"
                        state={form}
                        dispatch={dispatch}
                      />
                      <FormComponent
                        name="publisherToken"
                        validationFunction={noValidation}
                        labelName="Publisher Id"
                        type="number"
                        state={form}
                        dispatch={dispatch}
                        refs={publisherIdRef}
                      />
                      <SelectComponent
                          name={"parentcategoryId"}
                          refs={categoriesIdRef}
                          labelName="Category"
                          validationFunction={selectValidation}
                          state={form}
                          dispatch={dispatch}
                          options={categories.filter(category=>category.parentId===null)
                            .map(category=>({...category,value:category.id}))}
                        />
                        {
                          form.parentcategoryId>0 &&
                       <SelectComponent
                          name={"categoryId"}
                          refs={categoriesIdRef}
                          labelName="Category"
                          validationFunction={selectValidation}
                          state={form}
                          dispatch={dispatch}
                          options={categories.filter(category=>category.parentId==form.parentcategoryId).map(category=>({...category,value:category.id}))}
                        />
                        }
                        {form.parentcategoryId==1&&<div>
                      <label>Keywords:</label>
                      <AddingKeywords
                        dispatch={dispatch}
                        name="keywords"
                        refs={categoriesIdRef}
                        state={form}
                        keywordsdata={keywordsdata}
                      />
                      </div>
                        }
                      <button onClick={onRegister} className="btn btn-success">
                        Upload
                      </button>
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
