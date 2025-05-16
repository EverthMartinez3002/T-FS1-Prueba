import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import RegisterView from '../views/RegisterView.vue'
import LoginView from '../views/LoginView.vue'
import CategoriasView from '../views/CategoriasView.vue'
import ProveedorView from '../views/ProveedorView.vue'
import ProductoView from '../views/ProductoView.vue'
import HomeView from '../views/HomeView.vue'

const routes = [
  {path: '/', component: HomeView, name: 'home'},
  { path: '/register' , component: RegisterView, name: 'register' },
  { path: '/login' , component: LoginView, name: 'login' },
  { path: '/categorias',   component: CategoriasView, name: 'categorias', meta: { requiresAuth: true } },
  { path: '/proveedores', component: ProveedorView, name: 'proveedores', meta: { requiresAuth: true } },
  { path: '/productos' , component: ProductoView, name: 'productos', meta: { requiresAuth: true } },
]

export const router = createRouter({
  history: createWebHistory(), 
  routes,
})

router.beforeEach(async (to, from) => {
  const auth = useAuthStore()

  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    return { name: 'login' }
  }

  if ((to.name === 'login' || to.name === 'register') && auth.isAuthenticated) {
    return { name: 'categorias' }
  }
})
