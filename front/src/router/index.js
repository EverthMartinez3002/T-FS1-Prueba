import { createRouter, createWebHistory } from 'vue-router'
import RegisterView from '../views/RegisterView.vue'
import LoginView from '../views/LoginView.vue'
import CategoriasView from '../views/CategoriasView.vue'
import ProveedorView from '../views/ProveedorView.vue'
//import ListadoProveedores from '../components/ListadoProveedores.vue'

const routes = [
  { path: '/register' , component: RegisterView, name: 'register' },
  { path: '/login' , component: LoginView, name: 'login' },
  { path: '/categorias',   component: CategoriasView, name: 'categorias' },
  { path: '/proveedores', component: ProveedorView, name: 'proveedores' },
 // { path: '/productos',     component: ListadoProductos,  name: 'productos' },
]

export const router = createRouter({
  history: createWebHistory(), 
  routes,
})
