import { useContext } from "react"

import { ItemCount } from "./ItemCount"
import { CartContext } from '../contexts/CartContext'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

export const ItemDetail = ({ product }) => {
    const { addItem } = useContext(CartContext);
    const addProduct = (quantity) => {
        addItem(product, quantity);
        toast.success("Producto agregado!", {
            autoClose: 1000, // milliseconds
            position: "bottom-right"
        });
    };
    return <>
        <div className="container">
            <div className="div-card-detail">
                <div className="producto">{product.title}</div>
                <img src={product.pictureUrl} alt="detalle del producto" className="imgDetail"></img>
                <div className="producto"> <span>Descripción:</span> {product.description} </div>
                <div className="importe"> Stock: {product.stock} </div>
                <div className="importe"> Precio: $ {product.price} </div>
                <ItemCount stock={product.stock} onAdd={addProduct} />
            </div>
        </div>
        <ToastContainer />
    </>
}