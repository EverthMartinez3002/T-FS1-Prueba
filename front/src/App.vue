<template>
  <v-app>
    <template v-if="showNav">
      <v-app-bar app color="primary" dark>
        <v-app-bar-nav-icon @click="drawer = !drawer" />
        <v-toolbar-title>Inventario de Repuestos</v-toolbar-title>
        <v-spacer />

        <template v-if="!auth.isAuthenticated">
          <v-btn text to="/login">Ingresar</v-btn>
          <v-btn text to="/register">Registrarse</v-btn>
        </template>

        <template v-else>
          <v-btn text @click="onLogout">
            <v-icon left>mdi-logout</v-icon>
            Cerrar sesión
          </v-btn>
        </template>
      </v-app-bar>

      <v-navigation-drawer
        v-model="drawer"
        app
        permanent
        width="220"
        color="grey lighten-4"
      >
        <v-list nav dense>
          <v-list-item-group v-model="group" active-class="primary--text">
            <v-list-item to="/categorias">
              <v-list-item-icon>
                <v-icon>mdi-format-list-bulleted</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Categorías</v-list-item-title>
            </v-list-item>
            <v-list-item to="/productos">
              <v-list-item-icon>
                <v-icon>mdi-cart</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Productos</v-list-item-title>
            </v-list-item>
            <v-list-item to="/proveedores">
              <v-list-item-icon>
                <v-icon>mdi-truck</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Proveedores</v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
    </template>

    <v-main>
      <v-container fluid class="pa-6">
        <router-view />
      </v-container>
    </v-main>

    <v-footer
      app
      padless
      color="primary"
      dark
      v-if="showNav"
    >
      <v-col class="text-center" cols="12">
        © {{ new Date().getFullYear() }} Inventario de Repuestos
      </v-col>
    </v-footer>
  </v-app>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from './stores/auth'
import authService from './services/auth.service'

const drawer = ref(false)
const group  = ref(null)

const route   = useRoute()
const showNav = computed(() =>
  !['home', 'login', 'register'].includes(route.name)
)

// Pinia store de auth
const auth   = useAuthStore()
const router = useRouter()

async function onLogout() {
  try {
    await authService.logout()
  } catch (e) {
  }
  auth.clearToken()
  router.push({ name: 'login' })
}
</script>

<style scoped>
</style>
