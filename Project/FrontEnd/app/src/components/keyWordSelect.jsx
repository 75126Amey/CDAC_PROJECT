import { getCategories } from "../services/category";
import { useEffect, useState } from "react";

import MultiCategory from "./multiCategory";
export default function CategorySelect({
  name,
  labelName,
  state,
  dispatch,
  refs,
}) {
  const validKey = name + "Valid";
  const [categories, setCategories] = useState([]);
  const [remainingCategories, setRemainingCategories] = useState([]);
  const [mainCategoy, setMainCategoy] = useState(1);
  const [inputs, setInputs] = useState([]);
  const [searchVal, setSearchVal] = useState("");
  const[bookCategories, setBookCategories] = useState([])
  useEffect(() => {
    const func1 = async () => {
      const response = await getCategories();
      setCategories(response.data);
    };
    func1();
  });
  useEffect(() => {
    dispatch({type:"multiCategory",
      payload:{
        name:name,
        value:bookCategories
      }
    });
  },[bookCategories]);
  return (
    <div>
      <div>
        <div>
         
          <select
          className="form-select"
            onChange={(e) => {
              setMainCategoy(e.target.options[e.target.selectedIndex].value);
            }}
          >
            {categories
              .filter((category) => category.parent_id == null)
              .map((category) => {
                return (
                  <option
                    key={category.category_id}
                    value={category.category_id}
                  >
                    {category.category_name}
                  </option>
                );
              })}
          
          </select>
          <div className="border categoryBox" ref={refs}>
            {inputs}
            <input
              type="text"
              className="form-control border-0"
              onChange={(e) => {
                setSearchVal(e.target.value);
              }}
            ></input>
              
          </div>
         
          <select
          className="form-select"
          style={{appearance:"none"}}
            onClick={(e) => {
              setInputs([
                ...inputs,
                MultiCategory({
                  name: e.target.options[e.target.selectedIndex].text,
                  setInputs,
                  categoryId:parseInt(e.target.value),
                  inputs,
                  bookCategories,
                  setBookCategories,
                }),
              ]);
              setBookCategories(prevBookCategories=>[...prevBookCategories,parseInt(e.target.value)]);
            }}
          >
            {categories
              .filter((category) => category.parent_id == mainCategoy)
              .filter((category) =>
                category.category_name.toLowerCase().includes(searchVal)
              ).filter(category=>!bookCategories.includes(category.category_id))
            .map((category) => {
                return (
                  category &&
                  <option
                    key={category.category_id}
                    value={category.category_id}
                  >
                    {category.category_name}
                  </option>
                );
              })}
          </select>
          {state[`${validKey}`] && (
                              <p style={{ color: "red", margin: 0 }}>
                              {state[`${validKey}`]}
                            </p>
                          )}
                           {!state[`${validKey}`] && (
                              <p style={{ color: "red", margin: 0 }}>
                              {"\xa0"}
                            </p>
                          )}
        </div>
      </div>
    </div>
  );
}
