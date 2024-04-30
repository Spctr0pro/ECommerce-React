import { useState, useEffect } from "react";
import { getFirestore, getDoc, doc } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { ItemDetail } from "./ItemDetail";
import BeatLoader from "react-spinners/ClipLoader";

export const ItemDetailContainer = () => {
    const [product, setProduct] = useState(null);
    const { id } = useParams();
    
    useEffect(() => {
        const db = getFirestore();
        const documento = doc(db, "Items", id); // ID DOCUMENTO FIREBASE
        getDoc(documento).then((data) => {
            setProduct(
                { id: data.id, ...data.data() } // agrega el id de la colección
            )
        })
    }, [id]);

    if (!product) return <div className="container texto-loading"><BeatLoader color="#36d7b7" /> Cargando...</div>;

    return (
        <ItemDetail product={product}/>
    );
};
