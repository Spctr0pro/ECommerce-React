import { createContext, useState } from "react";
export const CartContext = createContext();

export const Provider = ({ children }) => {
    const [items, setItems] = useState([]);
    const clear = () => setItems([]);
    const removeItem = (id) => {
        const filtered = items.filter((item) => item.id !== id);
        setItems(filtered);
    };

    const addItem = (item, quantity) => {
        const isInCart = items.some((i) => i.id === item.id);
        if (isInCart) {
            const updateItems = items.map((itemToFind) => {
                if (itemToFind.id === item.id) {
                    return {
                        ...itemToFind,
                        quantity: itemToFind.quantity + quantity,
                    };
                } else return itemToFind;
            });
            setItems(updateItems);
        }
        else {
            setItems([...items, { ...item, quantity }]);
        };
    };


    return (
        <CartContext.Provider value={{ items, addItem, clear, removeItem, setItems }} >
            {children}
        </CartContext.Provider>
    );
}