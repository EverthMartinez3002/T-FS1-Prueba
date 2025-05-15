import apiClient from "./network.services";

const getAllCategorias = async () => {
    return await apiClient.get('/categorias');
}

const getCategoriaById = async (id) => {
    return await apiClient.get(`/categorias/${id}`);
}

const createCategoria = async (categoria) => {
    return await apiClient.post('/categorias', categoria);
}

const updateCategoria = async (id, categoria) => {
    return await apiClient.put(`/categorias/${id}`, categoria);
}

const deleteCategoria = async (id) => {
    return await apiClient.delete(`/categorias/${id}`);
}

export default {
    getAllCategorias,
    getCategoriaById,
    createCategoria,
    updateCategoria,
    deleteCategoria
};