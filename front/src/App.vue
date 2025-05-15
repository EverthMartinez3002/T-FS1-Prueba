<template>
  <v-app>
    <!-- App Bar superior -->
    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon @click="drawer = !drawer" />
      <v-toolbar-title>Inventario de Repuestos</v-toolbar-title>
      <v-spacer />
      <v-btn text to="/login">Ingresar</v-btn>
      <v-btn text to="/register">Registrarse</v-btn>
    </v-app-bar>

    <!-- Drawer lateral -->
    <v-navigation-drawer
      v-model="drawer"
      app
      color="grey lighten-4"
      permanent
      width="220"
    >
      <v-list nav dense>
        <v-list-item-group v-model="group" active-class="primary--text">
          <v-list-item to="/categorias">
            <v-list-item-icon><v-icon>mdi-format-list-bulleted</v-icon></v-list-item-icon>
            <v-list-item-title>Categorías</v-list-item-title>
          </v-list-item>
          <v-list-item to="/productos">
            <v-list-item-icon><v-icon>mdi-cart</v-icon></v-list-item-icon>
            <v-list-item-title>Productos</v-list-item-title>
          </v-list-item>
          <v-list-item to="/proveedores">
            <v-list-item-icon><v-icon>mdi-truck</v-icon></v-list-item-icon>
            <v-list-item-title>Proveedores</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <!-- Contenido principal -->
    <v-main>
      <v-container fluid class="pa-6">
        <router-view />
      </v-container>
    </v-main>

    <!-- Footer -->
    <v-footer app padless color="primary" dark>
      <v-col class="text-center" cols="12">
        © {{ new Date().getFullYear() }} Inventario de Repuestos
      </v-col>
    </v-footer>
  </v-app>
</template>

<script setup>
import { ref } from 'vue'

const drawer = ref(false)
const group = ref(null)
</script>

<style scoped>
/* Ajustes adicionales si los necesitas */
</style>
