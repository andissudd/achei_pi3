<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { api } from '../api'
import { useUserStore } from '../store/userStore'

const register = ref('');
const password = ref('');

const error = ref<Error>()
const loading = ref(true)
const success = ref(false)

const router = useRouter()
const userStore = useUserStore()

async function auth(){
    try {
        loading.value = true
        error.value = undefined
        
        const { data } = await api.post('/login', {
            register: register.value,
            password: password.value
        })
            
        const user = data.data.user
        const jwt = data.data.jwt

        userStore.authenticated(user, jwt)

        router.push('/')
  } catch (e) {
    error.value = e as Error
  } finally {
    loading.value = false
  }
};

</script>

<template>
    <div id="form-page-container">
    
        <div id="login-content">
            <img src="../assets/images/acenando.png">

            <div id="form container">
                <div v-if="error">
                    {{ error }}
                </div>
                <form id="login-form" @submit.prevent="auth">
                    <h2>Entrar na minha conta</h2>
                    <!-- <p>Você é um administrador? Clique aqui</p> -->
                    <label for="register">Matrícula:</label><br/>
                    <input type="text" id="register" name="register" v-model="register" required><br/>
                    <label for="password">Senha:</label><br/>
                    <input type="password" id="password" name="password" v-model="password" required><br>
                    <a>Esqueci minha senha</a><br/>

                    <input type="submit" value="Entrar">
                </form>
            </div>

        </div>

    </div>
</template>

<style scoped>

#form-page-container {
    width: 100%;
    height: 100%;
}

#login-content {
    width: 100%;
    height: calc(100vh - 80px);
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
}

#login-form {
    width: 20vw;
    box-sizing: border-box;
    background-color: white;
    padding: 2em;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
}

#login-form h2 {
    font-weight: bold;
}

#login-form p {
    font-size: 0.8em;
    color: #1E1E1E;

    margin-bottom: 1em;
}

#login-form label{
    box-sizing: border-box;
    font-weight: 500;
    
}

#login-form input[type="text"],input[type="email"], #login-form input[type="password"] {
    box-sizing: border-box;
    padding: 1.2em;
    margin-bottom: 20px;
    margin-top: 1em;
    background-color: #ECE6E6;
    border:none;
    border-radius: 10px;
}

#login-form a {
    font-size: 0.8em;
    color: #1E1E1E;
}

#login-form input[type="submit"] {
    box-sizing: border-box;
    background-color: var(--orange-color);
    color: white;
    font-size: 1rem;
    font-weight: 600;
    padding: 10px 20px;
    margin-top: 20px;
    border: none;
    border-radius: 10px;
    margin-left: auto;
    cursor: pointer;
}
</style>