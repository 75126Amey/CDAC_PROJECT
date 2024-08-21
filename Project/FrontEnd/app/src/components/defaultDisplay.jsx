import { useNavigate } from 'react-router-dom';
import '../css/book.css';
import CryptoJS from 'crypto-js';
export default function DefaultDisplay({bookData}){
    const navigate = useNavigate();
    return(
        <div class="container">
    <h1 class="text-center my-4">Book Collection</h1>
    <div class="row">
        {
            bookData.map((book, index) => (
                <div class="col-md-4" key={index} onClick={()=>{
                    const encrypted = btoa(JSON.stringify(book.id));
                    navigate(`/book/display/${encrypted}`)
                }}>
                    <div class="card book-card">
                        <img src={`http://localhost:8080/covers/${book.coverImage}`} class="card-img-top" alt={book.bookTitle}/>
                        <div class="card-body">
                            <h5 class="card-title">{book.bookTitle}</h5>
                        </div>
                    </div>
                </div>
            ))
        }
    </div>
</div>
    )
}