import { useState, useEffect } from "react";
;
import data from "../data/products.json";
import { useParams } from "react-router-dom";

export const ItemDetailContainer = () => {
    const [product, setProduct] = useState(null);
    const {id} = useParams();
    useEffect(() => {
        new Promise((resolve, reject) => {
            setTimeout(() => resolve(data), 2000);
        }).then((data) => {
            const filter = data.find(p => p.id === Number(id));
            setProduct(filter);
        });
    }, [id]);

    if(!product) return <div>Cargando...</div>;

    return (
        <div className="container">
            {/* <ItemList products={ products } /> */}
            <h1>{product.title}</h1>
            <img src={product.pictureUrl} alt="detalle del producto" ></img>
            <h2> { product.description } </h2> 
            <h3> Precio: $ { product.price} </h3>
        </div>
    );
};
