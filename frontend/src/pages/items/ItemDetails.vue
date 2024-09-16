<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { api } from '../../api'
import type { Item } from '../../types';
import { categories, colors, sizes } from '../../types';

const data = ref({});
const item = ref({} as Item)
const user_found = ref('');
const error = ref<Error>()
const loading = ref(true)
const success = ref(false)

const route = useRoute()    

async function bookItem(){
try {
    const res = await api.post(`/bookings/`,{
        item_code: route.params.code,
        user_recovered: "Adeêmi"
    })
    success.value = true;
  } catch (e) {
    error.value = e as Error
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
        <div class="item-register-form">

            <div>
                <div id="photoInputContainer">
                    <div id="fakePhotoContainer">
                        <img id="fakePhotoInput" v-bind:src="`${item.photo}`">
                    </div>
                    <label>Descrição: {{ item.desc }}</label>
                </div>
            </div>

            <div>
                <div v-if="success" class="alert alert-danger alert-dismissible" role="alert">
                    <h2>Agendamento confirmado!</h2>
                    <p></p>
                </div>
                <div v-if="error" class="alert alert-danger alert-dismissible" role="alert">
                    {{ error.message }}
                    <button @click="error=undefined" type="button" class="btn-close" aria-label="Close"></button>
                </div>
                <div class="infos-container">

                    <h1 for="itemName">{{ item.name }}</h1>

                    <p for="date">Data do encontro: <span>{{ item.date_created }}</span></p>
                    <p for="category">Categoria: <span>{{ item.category }}</span></p>
                    <p for="color">Cor: <span>{{ item.color }}</span></p>
                    <p for="size">Tamanho: <span>{{ item.size }}</span></p>
                </div>


                <div class="formButtonsContainer">
                    <form @submit.prevent="bookItem">
                        <p>Encontrado por {{user_found}}</p>
                        <input value="Agendar resgate" type="submit">
                    </form>
                </div>
            </div>

        </div>
    </div>

</template>

<style scoped>
  body{
    background-color: #FEF5E2;
}

.item-register-form{
    display: flex;
    padding: 30px 20px; 
    box-sizing: border-box;
    overflow: hidden;
}

.infos-container{
    flex: 9;
    padding: 10px 0px;
    box-sizing: border-box;
    background-color: w
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
    flex: 1;
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
    padding: 20px 0px;
    box-sizing: border-box;
}

.formButtonsContainer > form{
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
    background-color: #D25836;
}

.formButtonsContainer input[type="submit"] {
    background-color: #2D9C71;
}
</style>
