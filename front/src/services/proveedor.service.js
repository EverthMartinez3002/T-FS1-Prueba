import apiClient from "./network.services";

const getAllProveedores = async () => {
    return await apiClient.get('/proveedores');
}

const createProveedor = async (proveedor) => {
    return await apiClient.post('/proveedores', proveedor);
}

const updateProveedor = async (id, proveedor) => {
    return await apiClient.put(`/proveedores/${id}`, proveedor);
}

const deleteProveedor = async (id) => {
    return await apiClient.delete(`/proveedores/${id}`);
}

export default {
    getAllProveedores,
    createProveedor,
    updateProveedor,
    deleteProveedor
}