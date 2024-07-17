import { LOCALHOST } from "../constants/url.js";

const productosList = () => {
    return fetch(`${LOCALHOST}/productos`,{
        method: "GET",})
        .then((res) => res.json())
        .catch((err) => console.log(err));
};

const createProductos = (Nombre, Precio, image) => {
    return fetch(`${LOCALHOST}/productos`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            Nombre,
            Precio,
            image,
        })
    }).then((res) => res.json()).catch((err) => console.log(err));
};

const deleteProducto = (id) => {
    return fetch(`${LOCALHOST}/productos/${id}`, {
        method: "DELETE",
    }).catch((err) => console.log(err));
};


export const servicesProductos = {
    productosList,
    createProductos,
    deleteProducto,
};
