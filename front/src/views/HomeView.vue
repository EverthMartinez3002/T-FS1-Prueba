<template>
  <v-container fluid class="home-container">
    <v-row class="fill-height" align="center" justify="center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-card elevation="16" class="pa-8 text-center home-card">
          <v-avatar size="80" class="mx-auto mb-4" color="primary">
            <v-icon size="48" color="white">mdi-warehouse</v-icon>
          </v-avatar>
          <v-card-title class="text-h4 font-weight-bold mb-2">
            ¡Bienvenido!
          </v-card-title>
          <v-card-subtitle class="mb-4 text-dark">
            Inventario de Repuestos
          </v-card-subtitle>
          <v-card-text class="mb-6">
            Gestiona tus <span class="font-weight-bold text-primary">categorías</span>, <span class="font-weight-bold text-primary">productos</span> y <span class="font-weight-bold text-primary">proveedores</span> de forma sencilla y eficiente.
          </v-card-text>
          <v-btn
            large
            color="primary"
            class="mr-4 mb-2"
            to="/login"
            elevation="2"
          >
            <v-icon left>mdi-login</v-icon>
            Iniciar sesión
          </v-btn>
          <v-btn
            large
            outlined
            color="primary"
            class="mr-4 mb-2"
            to="/register"
            elevation="2"
          >
            <v-icon left>mdi-account-plus</v-icon>
            Registrarse
          </v-btn>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
</script>

<style scoped>
.home-container {
  min-height: 70vh;
}
.home-card {
  border-radius: 24px;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.15);
  background: #fff;
}
.fill-height {
  height: 100vh;
}
</style>