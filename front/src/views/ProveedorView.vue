<template>
  <v-container fluid>
    <v-row align="center" justify="space-between" class="mb-4">
      <v-col><h2 class="text-h5">Proveedores</h2></v-col>
      <v-col cols="auto">
        <v-btn color="primary" @click="openDialog()">Nuevo proveedor</v-btn>
      </v-col>
    </v-row>

    <v-card>
      <v-data-table
        :headers="headers"
        :items="proveedores"
        class="elevation-1"
        header-class="bg-indigo-600 text-white"
      >
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

    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="text-h6">{{ form.id ? 'Editar' : 'Nuevo' }} proveedor</span>
        </v-card-title>
        <v-card-text>
          <v-form ref="formRef" lazy-validation>
            <v-text-field
              v-model="form.nombre"
              label="Nombre"
              :rules="nombreRules"
              required
            />
            <v-text-field
              v-model="form.contacto"
              label="Contacto"
              :rules="contactoRules"
              required
            />
            <v-text-field
              v-model="form.telefono"
              label="Teléfono"
              :rules="telefonoRules"
              required
            />
            <v-text-field
              v-model="form.direccion"
              label="Dirección"
              :rules="direccionRules"
              required
            />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn text @click="closeDialog()">Cancelar</v-btn>
          <v-btn color="primary" @click="save()">Guardar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="deleteDialog" max-width="400px">
      <v-card>
        <v-card-title>Confirmar eliminación</v-card-title>
        <v-card-text>¿Eliminar proveedor “{{ toDelete.nombre }}”?</v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn text @click="deleteDialog = false">Cancelar</v-btn>
          <v-btn color="red" @click="deleteItem()">Eliminar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { ref, reactive, onMounted, nextTick } from 'vue'
import proveedorService from '../services/proveedor.service'
import { useToast } from 'vue-toastification'
import { useLoaderStore } from '../stores/loader'

const toast = useToast()
const proveedores = ref([])

const headers = [
  { title: 'ID',        key: 'id' },
  { title: 'Nombre',    key: 'nombre' },
  { title: 'Contacto',  key: 'contacto' },
  { title: 'Teléfono',  key: 'telefono' },
  { title: 'Dirección', key: 'direccion' },
  { title: 'Acciones',  key: 'actions', sortable: false },
]

const dialog       = ref(false)
const deleteDialog = ref(false)
const formRef      = ref(null)
const loader = useLoaderStore()

const form = reactive({
  id: null,
  nombre: '',
  contacto: '',
  telefono: '',
  direccion: '',
})

const toDelete = reactive({
  id: null,
  nombre: '',
})

const nombreRules = [
  v => !!v || 'El nombre es obligatorio',
  v => v.length >= 3 || 'Mínimo 3 caracteres',
]
const contactoRules = [
  v => !!v || 'El contacto es obligatorio',
  v => v.length >= 3 || 'Mínimo 3 caracteres',
]
const telefonoRules = [
  v => !!v || 'El teléfono es obligatorio',
  v => /^\d+$/.test(v) || 'Solo dígitos',
  v => v.length >= 7 || 'Mínimo 7 dígitos',
]
const direccionRules = [
  v => !!v || 'La dirección es obligatoria',
  v => v.length >= 5 || 'Mínimo 5 caracteres',
]

async function fetchProveedores() {
  loader.show()
  const { data } = await proveedorService.getAllProveedores()
  proveedores.value = data
  loader.hide()
}

function openDialog(item = null) {
  if (item) {
    Object.assign(form, item)
  } else {
    form.id = null
    form.nombre = ''
    form.contacto = ''
    form.telefono = ''
    form.direccion = ''
  }
  dialog.value = true

  nextTick(() => {
    formRef.value?.resetValidation()
  })
}

function closeDialog() {
  dialog.value = false

  nextTick(() => {
    formRef.value?.resetValidation()
  })
}

async function save() {
  const valid = await formRef.value.validate()
  if (!valid) {
    toast.error('Corrige los errores antes de guardar.')
    return
  }
  try {
    loader.show()
    if (form.id) {
      await proveedorService.updateProveedor(form.id, form)
      toast.success('Proveedor actualizado')
    } else {
      await proveedorService.createProveedor(form)
      toast.success('Proveedor creado')
    }
    dialog.value = false
    await fetchProveedores()
  } catch {
    toast.error('Error al guardar proveedor')
  }
  finally {
    loader.hide()
  }
}

function confirmDelete(item) {
  toDelete.id     = item.id
  toDelete.nombre = item.nombre
  deleteDialog.value = true
}

async function deleteItem() {
  try {
    loader.show()
    await proveedorService.deleteProveedor(toDelete.id)
    toast.success('Proveedor eliminado')
    deleteDialog.value = false
    await fetchProveedores()
  } catch {
    toast.error('Error al eliminar proveedor')
  }
  finally {
    loader.hide()
  }
}

onMounted(fetchProveedores)
</script>

<style scoped>
</style>