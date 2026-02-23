import { atom, useAtom } from "jotai";
import { useJwt } from "./UserStore";
import axios from "axios";

const initialCart = [

]

const cartAtom = atom(initialCart);

// what functionality should a jotai hook
// - one function to add to the atom
// - one function remove from the atom
// - one function to update the atom
// - utility or common used features
export const useCart = () => {

    const [cart, setCart] = useAtom(cartAtom);
    const { getJwt } = useJwt();


    const fetchCart = async () => {
        const jwt = getJwt();
        try {
            const response = await axios.get(import.meta.env.VITE_API_URL + 'api/cart', {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            });
            setCart(response.data);
            console.log(response.data);
        } catch (error) {
            console.error("Error loading cart");
        }
    }

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
            updateCart(modifiedCart);
        } else {
            // item already exists in the shopping cart
            const existingItem = cart[existingItemIndex];
            const clonedItem = { ...existingItem, quantity: existingItem.quantity + 1 };
            const modifiedCart = cart.with(existingItemIndex, clonedItem);
            setCart(modifiedCart);
            updateCart(modifiedCart);
        }


    }

    const modifyQuantity = (cartItemId, newQuantity) => {

        if (newQuantity <= 0) {
            return;
        }
        const index = cart.findIndex(item => item.id === cartItemId);
        const clonedItem = { ...cart[index], quantity: newQuantity };
        const clonedCart = cart.with(index, clonedItem);
        setCart(clonedCart);
        updateCart(clonedCart);
    }

    const updateCart = async (updatedCart) => {
        try {
            const jwt = getJwt();
            const cartItems = updatedCart.map(item => ({
                product_id: item.product_id,
                quantity: item.quantity
            }))
            await axios.put(import.meta.env.VITE_API_URL + "api/cart", {cartItems: cartItems}, {
                headers: {
                    Authorization: 'Bearer ' + jwt
                }
            })
        } catch (e) {
            console.error(e)
        }

    }

    const deleteCartItem = (cartItemId) => {
        const index = cart.findIndex(item => item.id === cartItemId);
        const clonedCart = cart.toSpliced(index);
        setCart(clonedCart);
        updateCart(clonedCart);
    }


    return {
        cart,
        getCartTotal,
        addToCart,
        fetchCart,
        modifyQuantity,
        deleteCartItem
    }

}