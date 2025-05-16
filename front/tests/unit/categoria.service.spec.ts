import categoriaService from '../../src/services/categoria.service'
import apiClient from '../../src/services/network.services'
import { describe, expect, it, vi } from 'vitest'

vi.mock('../../src/services/network.services')

describe('categoria.service', () => {
  it('getAllCategorias hace GET /categorias', async () => {
    await categoriaService.getAllCategorias()
    expect(apiClient.get).toHaveBeenCalledWith('/categorias')
  })

  it('createCategoria hace POST /categorias con el payload', async () => {
    const payload = { nombre: 'X', descripcion: 'Y' }
    await categoriaService.createCategoria(payload)
    expect(apiClient.post).toHaveBeenCalledWith('/categorias', payload)
  })
})
