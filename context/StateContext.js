import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
const Context = createContext();

export const StateContext = ({ children }) => {
    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, settotalPrice] = useState();
    const [totalQty, settotalQty] = useState(0);
    const [qty, setQty] = useState(1);

    // To Check the Cart and Add More Products to It
    const onAdd = (product, quantity) => {
        const checkProductInCart = cartItems.find((item) => item._id === product._id)
        settotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);
        settotalQty((prevTotalQuantity) => prevTotalQuantity + quantity);

        if (checkProductInCart) {
            const updatedCartItems = cartItems.map((cartProduct) => {
                if (cartProduct._id == product._id) return {
                    ...cartProduct,
                    quantity: cartProduct.quantity + quantity
                }
            });
            setCartItems(updatedCartItems);
            toast.success(`${qty} ${product.name} added to cart.`);
        }
        else {
            product.quantity = quantity;
            setCartItems([
                ...cartItems,
                {...product}
            ]);
            toast.success(`${qty} ${product.name} added to cart.`);

        }

    }
    // to increase quantity of an item
    const incQty = () => {
        setQty((prevQty) => prevQty + 1);
    }
    // to decrease quantity of an item
    const decQty = () => {
        setQty((prevQty) => {

            if (prevQty - 1 < 1) return 1;

            return prevQty - 1;


        });
    }
    return (
        <Context.Provider value={{
            showCart,
            cartItems,
            totalPrice,
            totalQty,
            qty,
            incQty,
            decQty,
            onAdd,
            setShowCart
        }}>
            {children}
        </Context.Provider >
    );
}
export const useStateContext = () => useContext(Context);