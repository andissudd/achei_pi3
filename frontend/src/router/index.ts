import { createWebHistory, createRouter } from 'vue-router'
import { useUserStore } from '../store/userStore';

import MainPage from '../pages/MainPage.vue';
import LoginForm from '../pages/LoginPage.vue';

import ItemDetails from '../pages/items/ItemDetails.vue';
import SearchItems from '../pages/items/SearchItems.vue';
import CreateItem from '../pages/items/CreateItem.vue';
import SearchBooking from '../pages/booking/SearchBooking.vue';

const routes =[
    // main routes
    {path: '/', name: 'home', component: MainPage, meta: {requiresAuth: false,title: 'Achei!'}},
    {path: '/login', name: 'Login', component: LoginForm, meta: {requiresAuth: false,title: 'Achei! Login'}},
    {path: '/login', name: 'Logout', component: LoginForm, meta: {requiresAuth: false,title: 'Achei! Login'}},


    // // Item routes
    {path: '/item/:code', component: ItemDetails, meta: {requiresAuth: false,title: 'Achei!'}},
    {path: '/search', component: SearchItems, meta: {requiresAuth: false,title: 'Achei! Pesquisar'}},
    {path: '/item-register', component: CreateItem, meta: {requiresAuth: true,title: 'Achei! Cadastrar item perdido'}},
    // 
    {path: '/bookings', component: SearchBooking, meta: {requiresAuth: true,title: 'Achei! Agendamentos'}},
]

export const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach((to, from, next) => {
  const userStore = useUserStore();
  const title = to.meta.title
  const titleFromParams = to.params.pageTitle;

  if (to.meta.requiresAuth && !userStore.isAuthenticated) {
    return '/login'
  }
  
  // if( to.meta.requiresAuth && !userStore.isAuthenticated ) {
  //   next('/login') 
  // } else {
  //   if (title) {
  //     document.title = title.toString()
  //   }
  //   if (titleFromParams) {
  //     document.title = `${titleFromParams} - ${document.title}`;
  //   }
  //   next()
  // }


})