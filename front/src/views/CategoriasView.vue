<template>
  <v-container>
    <v-row justify="space-between" class="mb-4">
      <v-col cols="auto">
        <h2 class="text-h5">Categorías</h2>
      </v-col>
      <v-col cols="auto">
        <v-btn color="primary" @click="openForm">Nueva Categoría</v-btn>
      </v-col>
    </v-row>

    <v-data-table
      :headers="headers"
      :items="categorias"
      class="elevation-1 custom-header"
    >
      <template #item.actions="{ item }">
        <v-icon small class="mr-2" @click="editCategoria(item)">mdi-pencil</v-icon>
        <v-icon small @click="confirmDelete(item)">mdi-delete</v-icon>
      </template>
    </v-data-table>

    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>
          {{ form.id ? 'Editar Categoría' : 'Nueva Categoría' }}
        </v-card-title>
        <v-card-text>
          <v-form ref="formRef" v-model="formValid">
            <v-text-field
              v-model="form.nombre"
              label="Nombre"
              :rules="[rules.required]"
              required
            />
            <v-textarea
              v-model="form.descripcion"
              label="Descripción"
            />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn text @click="closeForm">Cancelar</v-btn>
          <v-btn
            color="primary"
            :loading="loading"
            @click="saveCategoria"
            :disabled="!formValid"
          >
            Guardar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="deleteDialog" max-width="400px">
      <v-card>
        <v-card-title>Confirmar eliminación</v-card-title>
        <v-card-text>
          ¿Seguro que deseas eliminar la categoría "<strong>{{ toDelete?.nombre }}</strong>"?
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn text @click="deleteDialog = false">Cancelar</v-btn>
          <v-btn color="red" @click="deleteCategoria(toDelete.id)">Eliminar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useToast } from 'vue-toastification'
import categoriaService from '../services/categoria.service'

const toast = useToast()
const categorias = ref([])
const headers = [
  { title: 'ID', value: 'id' },
  { title: 'Nombre', value: 'nombre' },
  { title: 'Descripción', value: 'descripcion' },
  { title: 'Acciones', value: 'actions', sortable: false },
]

const dialog = ref(false)
const deleteDialog = ref(false)
const toDelete = ref(null)
const formRef = ref(null)
const formValid = ref(false)
const loading = ref(false)
const form = reactive({ id: null, nombre: '', descripcion: '' })

const rules = {
  required: v => !!v || 'Este campo es obligatorio',
}

async function fetchCategorias() {
  try {
    const { data } = await categoriaService.getAllCategorias()
    categorias.value = data
  } catch {
    toast.error('Error cargando categorías')
  }
}

function openForm() {
  form.id = null
  form.nombre = ''
  form.descripcion = ''
  dialog.value = true
}

function editCategoria(item) {
  form.id = item.id
  form.nombre = item.nombre
  form.descripcion = item.descripcion
  dialog.value = true
}

function closeForm() {
  dialog.value = false
}

async function saveCategoria() {
  const valid = await formRef.value.validate()
  if (!valid) return
  loading.value = true
  try {
    if (form.id) {
      await categoriaService.updateCategoria(form.id, { nombre: form.nombre, descripcion: form.descripcion })
      toast.success('Categoría actualizada')
    } else {
      await categoriaService.createCategoria({ nombre: form.nombre, descripcion: form.descripcion })
      toast.success('Categoría creada')
    }
    dialog.value = false
    await fetchCategorias()
  } catch {
    toast.error('Error al guardar categoría')
  } finally {
    loading.value = false
  }
}

function confirmDelete(item) {
  toDelete.value = item
  deleteDialog.value = true
}

async function deleteCategoria(id) {
  try {
    await categoriaService.deleteCategoria(id)
    toast.success('Categoría eliminada')
    deleteDialog.value = false
    await fetchCategorias()
  } catch {
    toast.error('Error al eliminar categoría')
  }
}

onMounted(fetchCategorias)
</script>

<style scoped>
.custom-header .v-data-table-header th {
  background-color: #4f46e5;
  color: #fff;
}
</style>