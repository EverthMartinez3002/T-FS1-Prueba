<template>
  <v-container fluid class="login-container">
    <v-row align="center" justify="center" class="fill-height">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-card elevation="14" class="pa-6 rounded-xl login-card">
          <v-card-title class="text-h5 justify-center font-weight-bold mb-2">
            Iniciar sesión
          </v-card-title>
          <v-card-text>
            <v-form ref="formRef" @submit.prevent="onSubmit" lazy-validation>
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

              <v-btn
                :loading="loading"
                type="submit"
                color="primary"
                class="mt-6"
                block
                rounded
                size="large"
              >
                {{ loading ? 'Procesando…' : 'Iniciar sesión' }}
              </v-btn>
            </v-form>
          </v-card-text>
          <v-card-actions class="justify-center">
            <span class="text-caption">¿No tienes cuenta?</span>
            <RouterLink to="/register" class="text-caption text--primary ml-1">
              Crear cuenta
            </RouterLink>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import authService from '../services/auth.service'

const router = useRouter()
const toast = useToast()
const formRef = ref(null)
const loading = ref(false)

const form = reactive({
  email: '',
  password: '',
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
    const { data } = await authService.login(form)
    localStorage.setItem('token', data.token)
    toast.success('Inicio de sesión exitoso')
    setTimeout(() => {
      window.location.reload()
    }, 2000)  
  } catch (e) {
    if (e.response?.status === 422) {
      const messages = Object.values(e.response.data.errors).flat()
      messages.forEach(msg => toast.error(msg))
    } else {
      toast.error('Error al iniciar sesión')
    }
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-container {
  min-height: 60vh;
}

.login-card {
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.15);
  border: 1px solid #e0e7ff;
  background: #fff;
}

a {
  text-decoration: none;
}
</style>
