import { atom, useAtom } from "jotai";

const initialCart = [
    {
        "id": 1,
        "product_id": 1,
        "quantity": 10,
        "name": "Organic Green Tea",
        "price": 12.99,
        "imageUrl":"https://picsum.photos/id/225/300/200",
        "description":"Premium ocha"
    },
    {
        "id": 2,
        "product_id": 1,
        "quantity": 10,
        "name": "Organic Black  Tea",
        "price": 12.99,
        "imageUrl":"https://picsum.photos/id/225/300/200",
        "description":"Premium ocha"
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
        const total = cart.reduce( (currentTotal, currentCartItem)=>{
            return currentTotal + currentCartItem.price
        }, 0)
        return total;
    }

    return {
        cart,
        getCartTotal
    }

}