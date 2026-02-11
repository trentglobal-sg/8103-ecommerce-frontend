import { atom, useAtom } from "jotai";

const initialCart = [
    {
        "id": 1,
        "product_id": 1,
        "quantity": 10,
        "name": "Organic Green Tea",
        "price": 12.99,
        "imageUrl": "https://picsum.photos/id/225/300/200",
        "description": "Premium ocha"
    },
    {
        "id": 2,
        "product_id": 1,
        "quantity": 10,
        "name": "Organic Black  Tea",
        "price": 12.99,
        "imageUrl": "https://picsum.photos/id/225/300/200",
        "description": "Premium ocha"
    }
]

const cartAtom = atom(initialCart);

// what functionality should a jotai hook
// - one function to add to the atom
// - one function remove from the atom
// - one function to update the atom
// - utility or common used features
export const useCart = () => {

    const [cart, setCart] = useAtom(cartAtom);

    const getCartTotal = () => {
        const total = cart.reduce((currentTotal, currentCartItem) => {
            return currentTotal + currentCartItem.price
        }, 0)
        return total;
    }

    // first parameter: the Product object
    const addToCart = (product) => {

        // findIndex will return -1 if the item is not found
        const existingItemIndex = cart.findIndex(cartItem => cartItem.product_id === product.id);

        // if the item does not exists, create new one
        if (existingItemIndex == -1) {
            const newCartItem = {
                id: Math.floor(Math.random() * 10000 + 1),
                name: product.name,
                price: product.price,
                imageUrl: product.imageUrl,
                product_id: product.id,
                description: product.description,
                quantity: 1
            }

            const modifiedCart = [...cart, newCartItem];
            setCart(modifiedCart);
        } else {
            // item already exists in the shopping cart
            const existingItem = cart[existingItemIndex];
            const clonedItem = {...existingItem, quantity: existingItem.quantity + 1};
            const modifiedCart = cart.with(existingItemIndex, clonedItem);
            setCart(modifiedCart)
        }


    }

    return {
        cart,
        getCartTotal,
        addToCart
    }

}