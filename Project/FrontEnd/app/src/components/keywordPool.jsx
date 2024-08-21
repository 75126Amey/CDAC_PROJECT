import { getCategories } from "../services/category";
import { useEffect, useState } from "react";

import MultiCategory from "./multiCategory";
import { getKeywords } from "../services/book";
import KeywordButton from "./keywordButton";
export default function AddingKeywords({
  name,
  labelName,
  state,
  dispatch,
  refs,
  keywordsdata
}) {
  const validKey = name + "Valid";

  const [inputs, setInputs] = useState([]);
  const [searchVal, setSearchVal] = useState("");
  const[keywords, setKeywords] = useState([])
  useEffect(() => {
    dispatch({type:"keywords",
      payload:{
        name:name,
        value:keywords
      }
    });
  },[keywords]);
  return (
    <div>
      <div>
        <div>
          <div className="border categoryBox" ref={refs}>
            {inputs}
            <input
              type="text"
              className="form-control border-0"
              onChange={(e) => {
                setSearchVal(e.target.value);
              }}
            /> 
          </div>
          <select
          className="form-select"
          style={{appearance:"none"}}
            onClick={(e) => {
              setInputs([
                ...inputs,
                KeywordButton({
                  keyword: e.target.options[e.target.selectedIndex].text,
                  setInputs,
                  keywordId:parseInt(e.target.value),
                  inputs,
                  keywords,
                  setKeywords,
                }),
              ]);
              setKeywords(prevKeywords=>[...prevKeywords,parseInt(e.target.value)]);
            }}
          >
            {keywordsdata
              .filter((keyword) =>
                keyword.keyword.toLowerCase().includes(searchVal)
              ).filter(keyword=>!keywords.includes(keyword.id))
            .map((keyword) => {
                return (
                  keyword &&
                  <option
                    key={keyword.id}
                    value={keyword.id}
                  >
                    {keyword.keyword}
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
