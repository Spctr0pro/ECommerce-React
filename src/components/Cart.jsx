import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../contexts/CartContext";
import { addDoc, collection, getFirestore, doc, updateDoc } from "firebase/firestore";
import Swal from 'sweetalert2';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

const initialValues = {
    name: "",
    phone: "",
    email: ""
}

export const Cart = () => {
    const [values, setValues] = useState(initialValues);
    const [success, showSuccess] = useState(false);
    const { items, removeItem, clear } = useContext(CartContext);

    const total = () => items.reduce((almacena, item) => almacena + item.quantity * item.price, 0);
    // const handleChange = (evento) => {
    //     setValues((prev) => {
    //         return {
    //             ...prev,
    //             [evento.target.name]: evento.target.value,
    //         };
    //     });
    // };

    const updateStock = () => {
        const db = getFirestore();
        items.map((i) => {
            updateDoc(doc(db, "Items", i.id), { stock: i.stock - i.quantity });
        })
    };

    const handleSubmit = () => {
        (async () => {
            const { value: formValues } = await Swal.fire({
                title: "Ingresa tus datos",
                html: `
                <input id="swal-input1" class="swal2-input" placeholder='Nombre'>
                <input id="swal-input2" type="number" class="swal2-input" placeholder='Celular'>
                <input id="swal-input3" type="email" class="swal2-input" placeholder='Email'>
                `,
                focusConfirm: false,
                showCancelButton: true,
                preConfirm: () => {
                    if (document.getElementById('swal-input1').value &&
                        document.getElementById('swal-input2').value &&
                        document.getElementById('swal-input3').value) {
                        return [
                            document.getElementById("swal-input1").value,
                            document.getElementById("swal-input2").value,
                            document.getElementById("swal-input3").value
                        ];
                    } else {
                        Swal.showValidationMessage('Todos los campos son requeridos')
                    }
                }
            });
            if (formValues) {
                setValues(() => {
                    return [values.name = formValues[0],
                    values.phone = formValues[1],
                    values.email = formValues[2]]
                });

                const order = {
                    buyer: values,
                    items: items.map(s => ({ id: s.id, title: s.title, price: s.price, quantity: s.quantity })),
                    date: new Date().toLocaleString('es-CL'),
                    total: total(),
                };

                const db = getFirestore();
                const orderCollection = collection(db, "orders");
                addDoc(orderCollection, order).then(({ id }) => {
                    if (id) {
                        Swal.fire("Felicidades", "Su orden " + id + " se ha realizado con exito!", "success");
                        updateStock();
                        showSuccess(true);
                    }
                }).finally(() => {
                    clear();
                })
            }
        })()
    }

    const handleRemove = (id) => {
        Swal.fire({
            title: "¿Estás seguro que deseas eliminar este producto?",
            text: "",
            icon: "warning",
            showCancelButton: true,
            cancelButtonColor: "#d33",
            confirmButtonText: "Aceptar",
            cancelButtonText: "Cancelar"
        }).then((result) => {
            if (result.isConfirmed) {
                removeItem(id);
                toast.success("Producto eliminado!", {
                    autoClose: 1000, // milliseconds
                    position: "bottom-right"
                });
            }
        });
    }

    const handleClear = (id) => {
        Swal.fire({
            title: "¿Estás seguro que deseas vaciar el carrito?",
            text: "",
            icon: "warning",
            showCancelButton: true,
            cancelButtonColor: "#d33",
            confirmButtonText: "Aceptar",
            cancelButtonText: "Cancelar"
        }).then((result) => {
            if (result.isConfirmed) {
                clear();
                toast.success("Carrito vaciado!", {
                    autoClose: 1000, // milliseconds
                    position: "bottom-right"
                });
            }
        });
    }

    return <div>
        {items?.length > 0 && !success &&
            <>
                <h1 className="texto-centrado">Productos en tú carrito</h1><div className="detalle-carrito" id="divDetalleCarrito">
                    <div className="detalle-carrito-div">
                        <table className="tabla-carrito">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Producto</th>
                                    <th>Cantidad</th>
                                    <th>Valor</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {items.map((i) => {
                                    return (
                                        <tr key={i.title}>
                                            <td align="center"><Link to={`/item/${ i.id }`}><img src={i.pictureUrl} alt="detalle del producto" className="img-producto"></img></Link></td>
                                            <td>{i.title}</td>
                                            <td>{i.quantity}</td>
                                            <td className="texto-derecha">$ {i.price}</td>
                                            <td><button className="button-eliminar" type="button" onClick={() => handleRemove(i.id)}>Eliminar</button></td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td className="expande-columna">Total a Pagar</td>
                                    <td className="expande-columna" colSpan="2">Total: {total()}</td>
                                    <td></td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                    <div>
                        <button id="btnComprarCarrito" className="button-comprar-carrito" type="button" onClick={handleSubmit}>🛒 Comprar carrito</button>
                        <button type="button" onClick={handleClear} className="button-comprar-carrito">Limpiar</button>
                        <Link to={"/"}>
                            <button className="button-sigue-comprando" type="button">Seguir comprando</button>
                        </Link>
                    </div>
                </div>
            </>
        }
        {
            items?.length == 0 && !success &&
            <div className="detalle-vacio">
                <div className="div-card-error">
                    <div><img src="/src/images/not-found.png" className="img-not-found" /></div>
                    <div className="leyenda-error">Ups no encontramos productos en tú carrito</div>
                    <div className="leyenda-intento">Agrega productos a tú carrito para poder visualizarlos.</div>
                    <div><Link to={"/"}>
                        <button className="button-sigue-comprando" type="button">Seguir comprando</button>
                    </Link></div>
                </div>
            </div>
        }
        {
            items?.length == 0 && success &&
            <div className="detalle-vacio">
                <div className="div-card-exito">
                    <div><img src="/src/images/success.png" className="img-not-found" /></div>
                    <div className="leyenda-error">Felicidades tú compra se efectuo con exito</div>
                    <div className="leyenda-intento">Pulsa el botón seguir comprando para volver a la página principal.</div>
                    <div><Link to={"/"}>
                        <button className="button-sigue-comprando" type="button">Seguir comprando</button>
                    </Link></div>
                </div>
            </div>
        }
        <ToastContainer />
    </div>
}