import { describe, it, expect, vi, beforeEach } from 'vitest'
import apiClient from '../../src/services/network.services'
import productoService from '../../src/services/producto.service'

vi.mock('../../src/services/network.services', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  }
}))

describe('producto.service', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('getAllProductos → GET /productos', () => {
    productoService.getAllProductos()
    expect(apiClient.get).toHaveBeenCalledWith('/productos')
  })

  it('createProducto(data) → POST /productos', () => {
    const data = { nombre: 'Filtro', precio: 10.5 }
    productoService.createProducto(data)
    expect(apiClient.post).toHaveBeenCalledWith('/productos', data)
  })

  it('updateProducto(id, data) → PUT /productos/:id', () => {
    const data = { nombre: 'Aceite', precio: 25 }
    productoService.updateProducto(21, data)
    expect(apiClient.put).toHaveBeenCalledWith('/productos/21', data)
  })

  it('deleteProducto(id) → DELETE /productos/:id', () => {
    productoService.deleteProducto(99)
    expect(apiClient.delete).toHaveBeenCalledWith('/productos/99')
  })
})
