import { Link } from 'react-router-dom';
import CarIcon from '../assets/carrito.png';
import { CartContext } from '../contexts/CartContext';
import { useContext } from 'react';

export const CardWidget = () => {
const { items } = useContext(CartContext);
const total =  items.reduce((acum, elem) => acum + elem.quantity, 0);
    return (
        <Link to="/cart">
        <div id="carrito">
            <img src={CarIcon} alt="Carrito" width={50} />
            <span>{ total > 10 ? 10 + '+' : total}</span>
        </div>
        </Link>
    );
}