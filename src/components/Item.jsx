import { Link } from "react-router-dom"
export const Item = ({product}) => {
    return (
    <>
        <div className="div-card">
            <div><img src={product.pictureUrl} className="img" /></div>
            <div className="producto">{product.title}</div>
            <div className="importe">$ {product.price}</div>
            <Link to={`/item/${ product.id }`}>
            <button id={product.id} className="add-to-cart">Ver detalle</button>
            </Link>
        </div>
    </>
    )
    }