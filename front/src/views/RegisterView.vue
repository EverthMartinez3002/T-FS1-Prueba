<template>
  <v-container fluid class="register-container">
    <v-row align="center" justify="center" class="fill-height">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-card elevation="14" class="pa-6 rounded-xl register-card">
          <v-card-title class="text-h5 justify-center font-weight-bold mb-2">
            Registrarse
          </v-card-title>
          <v-card-text>
            <v-form ref="formRef" @submit.prevent="onSubmit" lazy-validation>
              <v-text-field
                v-model="form.name"
                label="Nombre"
                :rules="[v => !!v || 'El nombre es obligatorio']"
                required
                prepend-inner-icon="mdi-account"
              />
              <v-text-field
                v-model="form.email"
                label="Correo electrónico"
                :rules="emailRules"
                required
                prepend-inner-icon="mdi-email"
              />
              <v-text-field
                v-model="form.password"
                label="Contraseña"
                type="password"
                :rules="passwordRules"
                required
                prepend-inner-icon="mdi-lock"
              />
              <v-text-field
                v-model="form.password_confirmation"
                label="Confirmar contraseña"
                type="password"
                :rules="[v => v === form.password || 'Las contraseñas no coinciden']"
                required
                prepend-inner-icon="mdi-lock-check"
              />

              <v-btn
                :loading="loading"
                type="submit"
                color="primary"
                class="mt-6"
                block
                rounded
                size="large"
              >
                {{ loading ? 'Procesando…' : 'Registrarse' }}
              </v-btn>
            </v-form>
          </v-card-text>
          <v-card-actions class="justify-center">
            <span class="text-caption">¿Ya tienes cuenta?</span>
            <RouterLink to="/login" class="text-caption text--primary ml-1">
              Iniciar sesión
            </RouterLink>
          </v-card-actions>
        </v-card>
        <!-- v-snackbar eliminado -->
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import authService from '../services/auth.service'
import { useLoaderStore } from '../stores/loader'
import { useToast } from 'vue-toastification'

const router = useRouter()
const formRef = ref(null)
const loading = ref(false)
const loader = useLoaderStore()
const toast = useToast()

const form = reactive({
  name: '',
  email: '',
  password: '',
  password_confirmation: '',
  terms: false,
})

const emailRules = [
  v => !!v || 'El email es obligatorio',
  v => /.+@.+\..+/.test(v) || 'Email inválido',
]

const passwordRules = [
  v => !!v || 'La contraseña es obligatoria',
  v => v.length >= 6 || 'Mínimo 6 caracteres',
]

async function onSubmit() {
  const valid = await formRef.value.validate()
  if (!valid) return

  loading.value = true
  try {
    loader.show()
    const { data } = await authService.register(form)
    localStorage.setItem('token', data.token)
    toast.success('Registro exitoso')
    setTimeout(() => router.push('/login'), 800)
  } catch (e) {
    if (e.response?.status === 422) {
      Object.values(e.response.data.errors).flat()
        .forEach(msg => toast.error(msg))
    } else {
      toast.error('Error en el registro')
    }
  } finally {
    loader.hide()
    loading.value = false
  }
}
</script>

<style scoped>
.register-container {
  min-height: 70vh;
}

.register-card {
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.15);
  border: 1px solid #e0e7ff;
  background: #fff;
}

a {
  text-decoration: none;
}
</style>