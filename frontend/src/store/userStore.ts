import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { User } from '../types'

export const useUserStore = defineStore('user', ()=> {
  
  const user = ref<Omit<User, 'password'>>({
    id: Number(localStorage.getItem('id')),
    name: localStorage.getItem('name') || "",
    register: localStorage.getItem('register') || "",
    email: localStorage.getItem('email') || "",
    role: {
      id: Number(localStorage.getItem('roleId')),
      name: localStorage.getItem('role') || ""
    }
  })

  const jwt = ref(localStorage.getItem('jwt') || "");

  const role = computed(() => user.value.role.name)
  const register = computed(() => user.value.register)
  const isAuthenticated = computed(() => jwt.value !== "")

  function authenticated(authUser: User, token: string){
    user.value = authUser
    jwt.value = token

    localStorage.setItem('id', user.value.id.toString())
    localStorage.setItem('name', user.value.name)
    localStorage.setItem('register', user.value.register)
    localStorage.setItem('email', user.value.email)
    localStorage.setItem('role', user.value.role.name)
    localStorage.setItem('jwt', token)
  }

  function logout(){

    jwt.value = ""
    user.value = {} as User
    localStorage.clear()
  }
  
  return {
    user,
    register,
    jwt, 
    role,
    isAuthenticated,
    authenticated,
    logout,
  }
})







