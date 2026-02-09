import React, { useState, useEffect } from 'react';
import axios from 'axios';

import ProductCard from './ProductCard';

export default function MainPage() {

    const [featuredProducts, setFeaturedProducts] = useState([]);

    useEffect(() => {
        const fetchFeaturedProducts = async () => {
            const response = await axios.get("/featured.json");
            setFeaturedProducts(response.data);
        }
        fetchFeaturedProducts();
    }, []);

    const renderFeaturedProducts = () => {
        const jsxElements = [];
        for (let product of featuredProducts) {
            jsxElements.push(<div className="col-md-3 mb-4" key={product.id}>
                <ProductCard
                    id={product.id}
                    name={product.name}
                    price={product.price}
                    imageUrl={product.imageUrl}
                />
            </div>)
        }
        return jsxElements;
    }

    return (<>
        <header className="bg-primary text-white text-center py-5">
            <div className="container">
                <h1 className="display-4">Welcome to E-Shop</h1>
                <p className="lead">Discover amazing products at unbeatable prices!</p>
                <a href="#" className="btn btn-light btn-lg">Shop Now</a>
            </div>
        </header>

        <main className="container my-5">
            <h2 className="text-center mb-4">Featured Products</h2>
            <div className="row">
                {renderFeaturedProducts()}
            </div>
        </main>
    </>)
}