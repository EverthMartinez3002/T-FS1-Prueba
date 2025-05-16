<template>
  <v-container fluid>
    <!-- Encabezado + botón Nuevo -->
    <v-row align="center" justify="space-between" class="mb-4">
      <v-col><h2 class="text-h5">Productos</h2></v-col>
      <v-col cols="auto">
        <v-btn color="primary" @click="openDialog()">Nuevo producto</v-btn>
      </v-col>
    </v-row>

    <!-- Tabla de productos -->
    <v-card>
      <v-data-table
        :headers="headers"
        :items="productos"
        class="elevation-1"
        header-class="bg-indigo-600 text-white"
      >
        <template #item.precio="{ item }">
          ${{ item.precio_unitario }}
        </template>
        <template #item.proveedor_id="{ item }">
          {{ proveedoresMap[item.proveedor_id] }}
        </template>
        <template #item.categoria_id="{ item }">
          {{ categoriasMap[item.categoria_id] }}
        </template>
        <template #item.actions="{ item }">
          <v-btn icon @click="openDialog(item)">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <v-btn icon color="red" @click="confirmDelete(item)">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-card>

    <!-- Modal Crear / Editar -->
    <v-dialog v-model="dialog" max-width="600px">
      <v-card>
        <v-card-title>
          <span class="text-h6">{{ form.id ? 'Editar' : 'Nuevo' }} producto</span>
        </v-card-title>
        <v-card-text>
          <v-form ref="formRef" lazy-validation>
            <v-text-field
              v-model="form.nombre"
              label="Nombre"
              :rules="nombreRules"
              required
            />
            <v-textarea
              v-model="form.descripcion"
              label="Descripción"
              :rules="descripcionRules"
              auto-grow
            />
            <v-text-field
              v-model.number="form.precio_unitario"
              label="Precio"
              type="number"
              :rules="precioRules"
              prefix="$"
              required
            />
            <v-select
              v-model="form.proveedor_id"
              :items="proveedores"
              item-title="nombre"
              item-value="id"
              label="Proveedor"
              :rules="requiredRules"
              required
            />
            <v-select
              v-model="form.categoria_id"
              :items="categorias"
              item-title="nombre"
              item-value="id"
              label="Categoría"
              :rules="requiredRules"
              required
            />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer/>
          <v-btn text @click="closeDialog()">Cancelar</v-btn>
          <v-btn color="primary" @click="save()">Guardar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Modal Confirmar Borrado -->
    <v-dialog v-model="deleteDialog" max-width="400px">
      <v-card>
        <v-card-title>Confirmar eliminación</v-card-title>
        <v-card-text>
          ¿Eliminar producto “{{ toDelete.nombre }}”?
        </v-card-text>
        <v-card-actions>
          <v-spacer/>
          <v-btn text @click="deleteDialog = false">Cancelar</v-btn>
          <v-btn color="red" @click="deleteItem()">Eliminar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { ref, reactive, onMounted, nextTick, computed } from 'vue'
import productoService from '../services/producto.service'
import proveedorService from '../services/proveedor.service'
import categoriaService from '../services/categoria.service'
import { useToast } from 'vue-toastification'

const toast = useToast()

// Datos
const productos   = ref([])
const proveedores = ref([])
const categorias  = ref([])

// Mapas rápidos para mostrar nombre
const proveedoresMap = computed(() =>
  proveedores.value.reduce((m, p) => ((m[p.id] = p.nombre), m), {})
)
const categoriasMap = computed(() =>
  categorias.value.reduce((m, c) => ((m[c.id] = c.nombre), m), {})
)

// Configuración de tabla
const headers = [
  { title: 'ID',         key: 'id' },
  { title: 'Nombre',     key: 'nombre' },
  { title: 'Descripción', key: 'descripcion' },
  { title: 'Precio',     key: 'precio' },
  { title: 'Proveedor',  key: 'proveedor_id' },
  { title: 'Categoría',  key: 'categoria_id' },
  { title: 'Acciones',   key: 'actions', sortable: false },
]

// Diálogos y formularios
const dialog       = ref(false)
const deleteDialog = ref(false)
const formRef      = ref(null)
const form = reactive({
  id: null,
  nombre: '',
  descripcion: '',
  precio: null,
  proveedor_id: null,
  categoria_id: null,
})
const toDelete = reactive({ id: null, nombre: '' })

// Reglas de validación
const requiredRules    = [v => !!v || 'Campo obligatorio']
const nombreRules      = [...requiredRules, v => v.length >= 3 || 'Mínimo 3 caracteres']
const descripcionRules = [v => !v || v.length >= 5 || 'Si hay descripción, mínimo 5 caracteres']
const precioRules      = [v => v !== null && v !== '' || 'El precio es obligatorio', v => v > 0 || 'Debe ser mayor a 0']

async function fetchAll() {
  const [p1, p2, p3] = await Promise.all([
    productoService.getAllProductos(),
    proveedorService.getAllProveedores(),
    categoriaService.getAllCategorias(),
  ])
  productos.value   = p1.data
  proveedores.value = p2.data
  categorias.value  = p3.data
}

function openDialog(item = null) {
  if (item) {
    Object.assign(form, item)
  } else {
    form.id = null
    form.nombre = ''
    form.descripcion = ''
    form.precio = null
    form.proveedor_id = null
    form.categoria_id = null
  }
  dialog.value = true
  nextTick(() => formRef.value?.resetValidation())
}

function closeDialog() {
  dialog.value = false
  nextTick(() => formRef.value?.resetValidation())
}

async function save() {
  const valid = await formRef.value.validate()
  if (!valid) {
    toast.error('Corrige los errores antes de guardar.')
    return
  }
  try {
    if (form.id) {
      await productoService.updateProducto(form.id, form)
      toast.success('Producto actualizado')
    } else {
      await productoService.createProducto(form)
      toast.success('Producto creado')
    }
    dialog.value = false
    await fetchAll()
  } catch {
    toast.error('Error al guardar producto')
  }
}

function confirmDelete(item) {
  toDelete.id     = item.id
  toDelete.nombre = item.nombre
  deleteDialog.value = true
}

async function deleteItem() {
  try {
    await productoService.deleteProducto(toDelete.id)
    toast.success('Producto eliminado')
    deleteDialog.value = false
    await fetchAll()
  } catch {
    toast.error('Error al eliminar producto')
  }
}

onMounted(fetchAll)
</script>

<style scoped>
</style>
