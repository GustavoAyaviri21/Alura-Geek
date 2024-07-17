import { servicesProductos } from "../services/service.js";

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.register__form');
    const listaCard = document.getElementById('productsContainer');

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const price = document.getElementById('price').value;
        const image = document.getElementById('image').value;

        if (name === '' || price === '' || image === '') {
            alert('Por favor, completa todos los campos');
            return;
        }

        servicesProductos.createProductos(name, price, image)
            .then(producto => {
                // Crear la tarjeta del producto y añadirla a la lista
                listaCard.appendChild(createCardProduct(
                    producto.id,
                    producto.Nombre,
                    producto.Precio,
                    producto.image
                ));
            })
            .catch(err => console.log(err));
    });

    const createCardProduct = (id, Nombre, Precio, image) => {
        const card = document.createElement('div');
        card.classList.add('product__card');
        card.innerHTML = `
            <img class="product__image" src="${image}" alt="${Nombre}" />
            <div class="card__title-container">
                <h3 class="product__title">${Nombre}</h3>
            </div>
            <div class="product__footer">
                <span class="product__price">$ ${Precio}</span>
                <button class="delete-button" id="${id}">
                    <img class="product__trash" src="/assets/trash.png" />
                </button>
            </div>
        `;

        const deleteButton = card.querySelector('.delete-button');
        deleteButton.addEventListener('click', () => {
            servicesProductos.deleteProducto(id)
                .then(() => {
                    card.remove();
                })
                .catch(err => console.log(err));
        });

        return card;
    };

    const render = async () => {
        try {
            const listProduc = await servicesProductos.productosList();
            listProduc.forEach(producto => {
                listaCard.appendChild(createCardProduct(
                    producto.id,
                    producto.Nombre,
                    producto.Precio,
                    producto.image
                ));
            });
        } catch (error) {
            console.log(error);
        }
    };

    render();
});
