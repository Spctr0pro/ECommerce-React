import { useState } from "react"

export const ItemCount = ({ stock, onAdd }) => {
    const [quantity, setQuantity] = useState(1);
    const handleIncrease = () => {
        if (stock > quantity) {
            setQuantity((prev) => prev + 1);
        }
    };
    const handleDecrease = () => {
        if (quantity > 1) {
            setQuantity((prev) => prev - 1);
        }
    };
    const handleAdd = () => {
        onAdd(quantity);
        setQuantity(1);
    };
    return <div className="container">
        {stock > 0 &&
            <><div className="container">
                <div className="row">
                    <div className="col-lg-4 col-md-4 col-sm-4">
                        <button type="button" onClick={handleDecrease} className="button-action">-</button>
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-4">
                        <input type="number" value={quantity} readOnly className="input-center" />
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-4">
                        <button type="button" onClick={handleIncrease} className="button-action">+</button>
                    </div>
                </div>
            </div><button type="button" onClick={handleAdd} className="add-to-cart">Agregar al carrito</button></>
        }
        {stock == 0 &&
            <div>Producto sin Stock</div>
        }
    </div>
}