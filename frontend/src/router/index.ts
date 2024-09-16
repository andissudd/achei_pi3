import { createWebHistory, createRouter } from 'vue-router'

import MainPage from '../pages/MainPage.vue';
import LoginForm from '../pages/LoginPage.vue';

import ItemDetails from '../pages/items/ItemDetails.vue';
import SearchItems from '../pages/items/SearchItems.vue';
import CreateItem from '../pages/items/CreateItem.vue';

import SearchBooking from '../pages/booking/SearchBooking.vue';

const routes =[
    // main routes
    {path: '/', name: 'home', component: MainPage, meta: {title: 'Achei!'}},
    {path: '/login', name: 'Login', component: LoginForm, meta: {title: 'Achei! Login'}},

    // // Item routes
    {path: '/item/:code', component: ItemDetails, meta: {title: 'Achei!'}},
    {path: '/search', component: SearchItems, meta: {title: 'Achei! Pesquisar'}},
    {path: '/item-register', component: CreateItem, meta: {title: 'Achei! Cadastrar item perdido'}},
    // 
    {path: '/bookings', component: SearchBooking, meta: {title: 'Achei! Agendamentos'}},
]

export const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach((to, from, next) => {
  const title = to.meta.title
  const titleFromParams = to.params.pageTitle;
  if (title) {
    document.title = title.toString()
  }
  if (titleFromParams) {
    document.title = `${titleFromParams} - ${document.title}`;
  }
  next()
})