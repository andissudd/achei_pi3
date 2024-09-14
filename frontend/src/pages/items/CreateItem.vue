<script setup lang="ts">
import { ref } from 'vue'
import { api } from '../../api'
import type { Item } from '../../types';
import { categories, colors, sizes } from '../../types';

const todayDate = new Date().toISOString().slice(0,10);

const item = ref({} as Item)
const name = ref('')
const category = ref('')
const size = ref('')
const color = ref('')
const date = ref(todayDate)
const desc = ref('')
const photo = ref(File)
const error = ref<Error>()
const success = ref(false)


const hasPhoto = ref(false)

function onPhotoSelected(){
    hasPhoto.value = !hasPhoto.value;
    const photoInput = <HTMLInputElement>document.getElementById('photo');

    const fakePhotoInput = <HTMLInputElement>document.getElementById('fakePhotoInput');
    let photoSelected = photoInput.files && photoInput.files[0];
    
    if (photoSelected){
        fakePhotoInput.style.display = 'block';
        fakePhotoInput.src = URL.createObjectURL(photoSelected);
    }
};

function photoInputClick(){
    const photoInput = <HTMLInputElement>document.getElementById('photo');
    if (!hasPhoto.value){
        photoInput && photoInput.click();
    }

    let photoSelected = photoInput.files && photoInput.files[0];

    if (photoInput.files && photoInput.files[0] && hasPhoto.value == true){
        const fakePhotoInput = <HTMLInputElement>document.getElementById('fakePhotoInput');
        hasPhoto.value = !hasPhoto.value;
        fakePhotoInput.src = "";
        fakePhotoInput.style.display = "none";
        photoInput.files = null;

    }
}



async function createItem(){
try {

    const res = await api.post('/items', {
        name: name.value,
        category: category.value,
        color: color.value,
        size: size.value,
        desc: desc.value,
        date_found: date.value,
        photo: photo
    } );
    item.value = res.data.data;
    success.value = true;
  } catch (e) {
    error.value = e as Error
  }
};

</script>

<template>
    <div>
        <form class="item-register-form" @submit.prevent="createItem">

            <div>
                <div id="photoInputContainer" @click="photoInputClick">
                    <div id="fakePhotoContainer">
                        <span v-if="!hasPhoto" >+</span>
                        <img id="fakePhotoInput">
                    </div>
                    <label for="photo">{{ hasPhoto == false ? "Adicionar foto" : "Remover foto" }}</label>
                    <input type="file" name="photo" id="photo" accept=".jpg, .jpeg, .png" @change="onPhotoSelected" required>
                </div>
            </div>

            <div>
                <div v-if="success" class="alert alert-danger alert-dismissible" role="alert">
                    Item cadastrado
                </div>
                <div v-if="error" class="alert alert-danger alert-dismissible" role="alert">
                    {{ error.message }}
                    <button @click="error=undefined" type="button" class="btn-close" aria-label="Close"></button>
                </div>
                <div style="flex: 9; padding: 10px 0px; box-sizing: border-box;">

                    <label for="itemName">Nome do item:</label>
                    <input type="text" id="name" v-model="name" required/>

                    <label for="date">Data da perda:</label>
                    <input type="date" id="date" v-model="date" v-bind:max="todayDate" required/>

                    <div class="selectInputsContainer">
                        <div>
                            <label for="category">Categoria:</label>
                            <select v-model="category" id="category" required>
                                <option v-for="category in categories" v-bind:value="category" >{{ category }}</option>
                            </select>
                        </div>

                        <div>
                            <label for="color">Cor:</label>
                            <select v-model="color" id="color" required>
                                <option v-for="color in colors" v-bind:value="color" >{{ color }}</option>
                            </select>
                        </div>

                        <div>
                            <label for="size">Tamanho:</label>
                            <select v-model="size" id="size" required>
                                <option v-for="size in sizes" v-bind:value="size" >{{ size }}</option>
                            </select>
                        </div>
        
                    </div>


                    <label for="description" >Descrição:</label>
                    <textarea v-model="desc" id="description" required></textarea>
                </div>


                <div class="formButtonsContainer">
                    <div>
                        <input value="Cancelar" type="button">
                        <input value="Cadastrar item" type="submit">
                    </div>
                </div>
            </div>

        </form>
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
    display: none;
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

.formButtonsContainer > div{
    display: flex;
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
