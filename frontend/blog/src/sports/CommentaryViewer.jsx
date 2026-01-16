import { useEffect, useState } from "react";

const CommentaryComponent = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch("https://fakestoreapi.com/products")
          .then((res) => res.json())
          .then((data) => setProducts(data))
          .catch((err) => console.error("Error:", err));
      }, []);

  return (
    <div className="container mt-4">
    <div className="container my-5">
      <h2 className="text-center mb-4">🛒 Fake Store Products</h2>
      <div className="row g-4">
        {products.map((product) => (
          <div key={product.id} className="col-md-4 col-lg-3">
            <div className="card h-100 shadow-sm">
              <img
                src={product.image}
                className="card-img-top p-3"
                alt={product.title}
                style={{ height: "250px", objectFit: "contain" }}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{product.title.slice(0, 40)}...</h5>
                <p className="card-text text-muted">
                  {product.description.slice(0, 60)}...
                </p>
                <p className="mt-auto fw-bold">₹ {product.price}</p>
                <span className="badge bg-warning text-dark">
                  ⭐ {product.rating.rate} ({product.rating.count})
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default CommentaryComponent;
