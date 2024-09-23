<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { api } from '../../api'
import type { Item } from '../../types';

import { useUserStore } from '../../store/userStore'

const item = ref({} as Item)
const user_found = ref('');
const error = ref<Error>()
const loading = ref(true)
const success = ref(false)

const deleteRequest = ref(false)

const route = useRoute()    
const router = useRouter()    
const userStore = useUserStore()

function deleteToggle(){
    deleteRequest.value = !deleteRequest.value
}

async function bookItem(){
try {
    const res = await api.post(`/bookings/`,{
        item_code: route.params.code,
        user_recovered: userStore.user.register
    }, {
        headers: {
        Authorization: `Bearer ${userStore.jwt}`
      }
    })
    success.value = true;
  } catch (e) {
    error.value = e as Error
  }
};

async function itemDelete(){
    deleteToggle();
try {
    const res = await api.delete(`/items/${route.params.code}`,{
        headers: {
        Authorization: `Bearer ${userStore.jwt}`
      }
    }, )
    router.push('/')
  } catch (e) {
    error.value = e as Error
  } finally{
    
  }
};

onMounted(async () => {
  try {
    const res = await api.get(`/items/${route.params.code}`)
    item.value = res.data.data.item
    user_found.value = res.data.data.user_found
  } catch (e) {
    error.value = e as Error
  } finally {
    loading.value = false
  }
})



</script>

<template>
  <div>
        <div class="item-register-form" v-if="item ">
            <div>
                <div id="photoInputContainer">
                    <div id="fakePhotoContainer">
                        <!-- <img id="fakePhotoInput" v-bind:src="`${item.photo}`"> -->
                        <img id="fakePhotoInput" src="../../assets/images/foto.jpg">
                    </div>
                    <label>Descrição: <br>  {{ item.desc }}</label>
                </div>
            </div>

            <div>
                <div v-if="success" class="alert success" role="alert">
                    <h2>Agendamento confirmado!</h2>
                    <p></p>
                </div>
                <div v-if="error" class="alert danger" role="alert">
                    {{ error.message }}
                    <button @click="error=undefined" type="button" class="btn-close" aria-label="Close">x</button>
                </div>
                <div class="infos-container">

                    <h1 for="itemName">{{ item.name }}</h1>

                    
                    <p for="category">Categoria: <span>{{ item.category }}</span></p>
                    <p for="color">Cor: <span>{{ item.color }}</span></p>
                    <p for="size">Tamanho: <span>{{ item.size }}</span></p>
                </div>


                <div class="formButtonsContainer" v-if="userStore.user.id">
                    <form @submit.prevent="bookItem">
                        <p for="date">Data do encontro: <span>{{ item.date_created }}</span></p><br>
                       <br> <p>Encontrado por {{user_found}}</p>
                        <input v-if="userStore.role == 'Admin'" @click="deleteToggle" value="Deletar item"  type="button">
                        <input value="Agendar resgate" type="submit">
                    </form>
                </div><div class="formButtonsContainer" v-else>
                    <a href="/login" >Entrar na minha conta</a>
                </div>

            </div>

        </div>
        <div v-else>
            <p>Este item não existe...</p>
        </div>
    </div>

    <div class="modals" v-if="deleteRequest">
    <div>
        <form v-if="deleteRequest">
            <h2>Deletar item</h2>
            <p>Tem certeza que deseja finalizar o resgate do item: {{ item.name }}</p>
            
            <div>
                <button @click="itemDelete" class="confirm">Deletar</button> <button @click="deleteToggle()">Cancelar</button>
            </div>  
        </form>
    </div>
</div>

</template>

<style scoped>
  body{
    background-color: #FEF5E2;
}

.item-register-form{
    margin-top: 20px;
    display: flex;
    padding: 30px 20px; 
    box-sizing: border-box;
    overflow: hidden;
}
.item-register-form label{
    text-decoration: none;
    margin-left: 20px;
    display: flex;
    align-self: flex-start;
}
.infos-container{
    border-radius: 10px;
    background-color: white;
    margin-top: 20px;
    flex: 9;
    padding: 20px;
    box-sizing: border-box;
}
.infos-container h1{
    margin-bottom: 10px;
}
.infos-container p{
    margin-bottom: 09px;
}
.item-register-form >div:first-child {
    
    width: 40%;
}

.item-register-form > div {
    
    width: 50%;
}

.item-register-form label{
    
    display: block;
    font-weight: 500;
    margin-top: 15px;
}

.item-register-form input[type="text"], .item-register-form input[type="date"], .item-register-form textarea{
   
    width: 100%;
    background-color: whitesmoke;
    padding: 12px 20px;
    display: block;
    border: 1px solid #ccc;
    border-radius: 7px;
    box-sizing: border-box;
    margin-bottom: 20px;
    margin-top: 5px;
}

.selectInputsContainer{
    
    box-sizing: border-box;
    display: flex;
    width: 80%;
    gap: 20px;
}

.selectInputsContainer select{
    width: 100%;
    background-color: whitesmoke;
    padding: 12px 20px;
    display: block;
    border: 1px solid #ccc;
    border-radius: 7px;
    box-sizing: border-box;
    margin-top: 5px;
}

#photoInputContainer{
    
    background-color: white;
    flex-direction: column;
    width: 80%;
    aspect-ratio: 1/1;
    margin: 15px auto;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    border-radius: 20px;
    cursor: pointer;
    padding: 30px;
}

#fakePhotoContainer{
    background-color: #D9D9D9;
    width: 90%;
    aspect-ratio: 1/1;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
}

#fakePhotoContainer span{
    font-size: 10em;
    font-weight: 100;
    color: gray;
}

#fakePhotoInput{
    width: 100%;
    object-fit: cover;
}

#photo{
    display: none;
}

.formButtonsContainer{
    margin-top: 20px;

    flex: 1;
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
    padding: 20px 0px;
    box-sizing: border-box;
}

.formButtonsContainer > form{
    margin-top: 20px;

    width: 100%;
    display: flex;
    justify-content: space-between;
}

.formButtonsContainer input[type="button"], .formButtonsContainer input[type="submit"] {
    
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    color: white;
    cursor: pointer;
    margin-left: 10px;
    font-weight: 600;
    font-size: 1em;
}

.formButtonsContainer input[type="button"] {
    
    margin-left: 40%;
    background-color: #D25836;
}

.formButtonsContainer input[type="submit"] {
    
    background-color: #2D9C71;
}

.modals {
    
    background-color: rgba(0, 0, 0, 0.5);
    position: absolute;
    top: 0;
    z-index: 1;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.modals form{
    background-color: white;
    border-radius: 20px;
    padding: 2em;
    display: flex;
    flex-direction: column;
}

.modals form div{
    
    margin-top: 1em;
    width: 100%;
    display: flex;
    justify-content: space-around;
}

.modals form div button {
    
    padding: 1em;
    border: none;
    border-radius: 10px;
    font-weight: 500;
    cursor: pointer;
}

.confirm {
    
    background-color: #B14D30;
    color: white;
}

.alert{
    padding: 10px;
    border-radius: 10px;
}

.success{
    background-color: #3de4a4;
    border: 1px solid #2D9C71;
    color: white;
}

.danger{
    background-color: #fd504d;
    border: 1px solid #D25836;
    color: white;
}
.danger button{
    color: white;
    background-color: #D25836;
    border: none;
}
</style>
