import '../css/multiCategory.css';
export default function MultiCategory({keyword,inputs,setInputs,categoryId,bookCategories,setBookCategories}){
    return(
        <div className='mutliVal' key={categoryId}>
           <button type="button" class="btn btn-primary">
            {keyword} <span class="badge badge-light">4</span>
</button>
            <button className="btn btn-primary px-5 align-middle p-0" ></button>
            <button className="btn btn-danger p-0" onClick={()=>{
                
                setInputs(inputs.filter(input=>input.categoryId!==categoryId));
                setBookCategories(bookCategories.filter(bookCategory=>bookCategory!==categoryId));
            }}>X</button>
           
        </div>
    )
}