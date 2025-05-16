import { describe, it, expect, vi, beforeEach } from 'vitest'
import apiClient from '../../src/services/network.services'
import proveedorService from '../../src/services/proveedor.service'

// Mockeamos el apiClient por defecto
vi.mock('../../src/services/network.services', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  }
}))

describe('proveedor.service', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('getAllProveedores → GET /proveedores', () => {
    proveedorService.getAllProveedores()
    expect(apiClient.get).toHaveBeenCalledWith('/proveedores')
  })

  it('createProveedor(data) → POST /proveedores', () => {
    const data = { nombre: 'Acme', contacto: 'Juan' }
    proveedorService.createProveedor(data)
    expect(apiClient.post).toHaveBeenCalledWith('/proveedores', data)
  })

  it('updateProveedor(id, data) → PUT /proveedores/:id', () => {
    const data = { nombre: 'Nueva', contacto: 'Ana' }
    proveedorService.updateProveedor(5, data)
    expect(apiClient.put).toHaveBeenCalledWith('/proveedores/5', data)
  })

  it('deleteProveedor(id) → DELETE /proveedores/:id', () => {
    proveedorService.deleteProveedor(7)
    expect(apiClient.delete).toHaveBeenCalledWith('/proveedores/7')
  })
})