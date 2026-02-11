import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'wouter';

import ProductCard from './ProductCard';
import { useCart } from './CartStore';
import { useFlashMessage } from './FlashMessageStore';

export default function ProductPage() {

    const [products, setProducts] = useState([]);
    const {addToCart} = useCart();
    const [, setLocation] = useLocation();
    const {showMessage} = useFlashMessage();

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
                                         onAddToCart={()=>{
                                            addToCart(product);
                                            setLocation("/cart");
                                            showMessage(product.name + " has been added to the cart", "success")
                                         }}

                            />
                        </div>
                    )
                })
            }
        </div>
    </div>)
}