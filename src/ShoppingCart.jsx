import { useCart } from "./CartStore";

export default function ShoppingCart() {
    const { cart, getCartTotal } = useCart();

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
                                    <li className="list-group-item d-flex justify-content-between align-items-center">
                                        <img src={cartItem.imageUrl} />
                                        <div>
                                            <h5>{cartItem.name}</h5>
                                            <p>Quantity: {cartItem.quantity}</p>
                                        </div>
                                        <span>${cartItem.price.toFixed(2)}</span>
                                    </li>
                                ))
                            }



                        </ul>
                        <div className="mt-3 mb-3 text-end">
                            <h4>Total: ${getCartTotal().toFixed(2)}</h4>
                        </div>
                    </>
                )
            }

        </div>
    )
}