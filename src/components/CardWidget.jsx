import CarIcon from '../assets/carrito.png';

export const CardWidget = () => {
    return (
        <div id="carrito">
            <img src={CarIcon} alt="Carrito" width={50} />
            <span>10+</span>
        </div>
    );
}