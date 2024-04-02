import { useState, useEffect } from "react";

import Container from "react-bootstrap/Container";
import data from "../data/products.json";
import { ItemList } from "./ItemList";
import { useParams } from "react-router-dom";

export const ItemListContainer = () => {
    const [products, setProducts] = useState([]);
    const {id} = useParams();
    useEffect(() => {
        new Promise((resolve, reject) => {
            setTimeout(() => resolve(data), 2000);
        }).then((data) => {
            if(!id) {setProducts(data);}
            else { 
                const filter = data.filter(p => p.category === id);
                setProducts(filter);
            }
        });
    }, [id]);
    if(!products) return <div>Cargando...</div>;
    return (
        <div className="container">
            <ItemList products={ products } />
        </div>
    );
};
