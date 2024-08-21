import '../css/multiCategory.css';
export default function KeywordButton({keyword,inputs,setInputs,keywordId,keywords,setKeywords}){
    return(
        <div className='mutliVal' key={keywordId}>
           <button type="button" className="btn btn-primary">
            {keyword} <span style={{cursor:'pointer'}} className="badge badge-light"
            onClick={()=>{
                setInputs(inputs.filter(input=>input.keywordId!==keywordId));
                setKeywords(keywords.filter(keyword=>keyword!==keywordId));
            }}
            >X</span>
            </button>  
        </div>
    )
}