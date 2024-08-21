import { useState } from "react";

export default function AboutBook({ book }) {
    console.log(book);
    const [showLongDescription, setShowLongDescription] = useState(false);
  
    const toggleDescription = () => {
      setShowLongDescription(!showLongDescription);
    };
  
    return (
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-4">
            <img src={book.coverImage} alt={book.title} className="img-fluid" />
          </div>
          <div className="col-md-8">
            <h1>{book.title}</h1>
            <h2 className="text-muted">{book.author}</h2>
            <p><strong>Category:</strong> {book.category}</p>
            <p><strong>Description:</strong> {showLongDescription ? book.longDescription : book.briefDescription}</p>
            <button className="btn btn-link" onClick={toggleDescription}>
              {showLongDescription ? 'Show Less' : 'Show More'}
            </button>
            <p><strong>Price:</strong> </p>
            {book.isRentable && <p><strong>Rent Price:</strong> ${book.rentPrice.toFixed(2)}</p>}
            <button className="btn btn-primary mr-2">Add to Cart</button>
            {book.isRentable && <button className="btn btn-secondary">Rent</button>}
            <p className="mt-3"><strong>Rating:</strong> {book.rating} / 5</p>
            <h3>Reviews:</h3>
            <ul className="list-unstyled">
              {book.reviews.map((review, index) => (
                <li key={index} className="media my-3">
                  <div className="media-body">
                    <h5 className="mt-0 mb-1">{review.reviewer}</h5>
                    <p>{review.comment} ({review.rating} / 5)</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
  