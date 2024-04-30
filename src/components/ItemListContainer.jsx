import { useState, useEffect } from "react";
import { getFirestore, collection, getDocs, query, where } from "firebase/firestore"

import { ItemList } from "./ItemList";
import { useParams } from "react-router-dom";
import BeatLoader from "react-spinners/ClipLoader";

export const ItemListContainer = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const { id } = useParams();
    useEffect(() => {
        const db = getFirestore();
        let refCollection;
        if (!id) {
            refCollection = collection(db, "Items");
            getDocs(refCollection).then((data) => {

                setProducts(data.docs.map((doc) => {
                    return { id: doc.id, ...doc.data() };
                }))
            }).then(() => setLoading(false))
        }
        else {
            refCollection = query(
                collection(db, "Items"),
                where("category", "==", id)
            );
            getDocs(refCollection).then((data) => {
                if (data.size === 0) { setProducts([]); }
                else {
                    setProducts(
                        data.docs.map((doc) => {
                            return { id: doc.id, ...doc.data() }; // agrega el id de la colección
                            // ... es para quitar las llaves del objeto
                        })
                    )
                }
            }).then(() => setLoading(false))
        }
    }, [id]);
    if (loading) return <div className="container texto-loading"><BeatLoader color="#36d7b7" /> Cargando...</div>;
    return (
        <>
            <div className="container">
                <ItemList products={products} />
            </div>
        </>
    );
};
