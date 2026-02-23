import { useEffect } from "react";
import { useCart } from "./CartStore";
import axios from "axios";
import { useJwt } from "./UserStore";


export default function ShoppingCart() {
    const { cart, getCartTotal, fetchCart, modifyQuantity, deleteCartItem } = useCart();
    console.log(cart);
    useEffect(()=>{
        fetchCart();
    }, [])
    const {getJwt} = useJwt();

    const handleCheckout = async () => {
        const jwt = getJwt();
        try {
            const response = await axios.post(import.meta.env.VITE_API_URL+"api/checkout",{},{
                headers:{
                    Authorization: `Bearer ${jwt}`
                }
            });
            window.location = response.data.url;
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <div className="container mt-4">
            <h2>Shopping Cart</h2>
            {
                cart.length === 0 ? (
                    <>
                        <p>Your shopping cart is empty at the moment</p>
                    </>
                ) : (
                    <>
                        <ul className="list-group">
                            {
                                cart.map(cartItem => (
                                    <li key={cartItem.id} className="list-group-item d-flex justify-content-between align-items-center">
                                        <img src={cartItem.imageUrl} />
                                        <div>
                                            <h5>{cartItem.name}</h5>
                                            <div className="d-flex align-items-center">
                                                <button 
                                                    className="btn btn-secondary btn-sm me-2"
                                                    onClick={()=>{
                                                        modifyQuantity(cartItem.id, cartItem.quantity - 1 )
                                                    }}
                                                >-</button>
                                                <p className="mb-0">Quantity: {cartItem.quantity}</p>
                                                <button 
                                                    className="btn btn-secondary btn-sm ms-2"
                                                    onClick={()=>{
                                                        modifyQuantity(cartItem.id, cartItem.quantity + 1)
                                                    }}
                                                    >+</button>
                                                <button className="btn btn-danger btn-sm ms-2"
                                                    onClick={()=>{
                                                        deleteCartItem(cartItem.id)
                                                    }}
                                                >Delete</button>
                                            </div>
                                            
                                        </div>
                                        <span>${cartItem.price.toFixed(2)}</span>
                                    </li>
                                ))
                            }



                        </ul>
                        <div className="mt-3 mb-3 text-end">
                            <h4>Total: ${getCartTotal().toFixed(2)}</h4>
                            <button className="btn btn-primary mt-3" onClick={handleCheckout}>Checkout</button>
                        </div>
                    </>
                )
            }

        </div>
    )
}