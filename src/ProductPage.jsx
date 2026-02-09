import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';

export default function ProductPage() {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await axios.get("/products.json");
            setProducts(response.data);
        }
        fetchProducts();
    }, [])

    return (<div className="container">
        <h1>Product Page</h1>
        <div className="row">
            {
                products.map(product => {
                    return (
                        <div key={product.id} className="col-md-4 mb-4">
                            <ProductCard id={product.id} 
                                         name={product.name}
                                         price={product.price}
                                         imageUrl={product.imageUrl}

                            />
                        </div>
                    )
                })
            }
        </div>
    </div>)
}