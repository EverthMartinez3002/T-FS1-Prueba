import apiClient from "./network.services";

const getAllProductos = async () => {
    return await apiClient.get('/productos');
}

const createProducto = async (producto) => {
    return await apiClient.post('/productos', producto);
}

const updateProducto = async (id, producto) => {
    return await apiClient.put(`/productos/${id}`, producto);
}

const deleteProducto = async (id) => {
    return await apiClient.delete(`/productos/${id}`);
}

export default {
    getAllProductos,
    createProducto,
    updateProducto,
    deleteProducto
}