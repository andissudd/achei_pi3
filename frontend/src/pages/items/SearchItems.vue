<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { api } from '../../api'

import type {Item} from "../../types";
import {categories, colors, sizes} from "../../types";

const items = ref([] as Item[])
const error = ref<Error>()
const loading = ref(true)
const success = ref(false)

async function loadItems(){
    try {
    const res = await api.get('/items/active');
    items.value = res.data.data;
    console.log(items.value)    
  } catch (e) {
    error.value = e as Error
  } finally {
    loading.value = false
  }
};


onMounted(async () => {
    loadItems();
});



</script>

<template>

<div class="search-page-container">
    <div class="search-aside-container">
        <div class="filter-form-container">
                <form>
                    <fieldset>
                        <legend>Categoria</legend>
                        <div v-for="category in categories">
                            <input type="radio" name="category" v-bind:id="`${category}`">
                            <label v-bind:for="`${category}`">{{category}}</label>
                        </div>
                    </fieldset>
                
                    <fieldset class="dateField">
                        <legend>Perdido entre</legend>
                        <div>
                            <input type="date" name="date-start" id="date-start">
                        </div>
                        <div>
                            <input type="date" name="date-end" id="date-end">
                        </div>
                    </fieldset>    

                    <fieldset>
                        <legend>Cor</legend>
                        <div v-for="color in colors">
                            <input type="radio" name="color" v-bind:id="`${color}`">
                            <label v-bind:for="`${color}`">{{color}}</label>
                        </div>
                    </fieldset>

                    <fieldset>
                        <legend>Tamanho</legend>
                        <div v-for="size in sizes">
                            <input type="radio" name="size" v-bind:id="`${size}`">
                            <label v-bind:for="`${size}`">{{size}}</label>
                        </div>
                    </fieldset>

                    <input class="filtrar" type="submit" value="Filtrar">
                </form>
            </div>
    </div>

    <div class="item-search-grid">
        
        <div v-if="error" class="alert alert-danger alert-dismissible" role="alert">
            {{ error.message }}
            <button @click="error=undefined" type="button" class="btn-close" aria-label="Close"></button>
        </div>

        <div v-if="success" class="alert alert-success alert-dismissible" role="alert">
            
            <button @click="success=false" type="button" class="btn-close" aria-label="Close"></button>
        </div>

        <div v-if="loading" class="d-flex justify-content-center">
            <div class="spinner-grow" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>

        <div v-else class="item-grid">
            <a v-bind:href="`/item-register`" class="card register-card">
                <div>
                    <span class="plus">+</span>
                </div><br>
                <span>Cadastrar um item</span>
            </a>
            <!-- <a href="/items/:id" class="card item-card">
                <div class="card-img-container">
                    <img src="https://www.grupoota.com.br/site/wp-content/uploads/2022/04/placeholder.png" alt="Garrafa">
                </div>
                <div class="card-infos-container">
                <p><span>Garrafa tapauer</span></p>
                <p>Categoria, cor, tamanho</p>
                </div>
            </a> -->
            <a v-for="item in items" :key="item.id" v-bind:href="`/item/${ item.code }`" class="card item-card">
                <div class="card-img-container">
                    <img v-bind:src="`${ item.photo}`" v-bind:alt="`${item.name}`">
                </div>
                <div class="card-infos-container">
                <p><span>{{item.name}}</span></p>
                <p>{{item.category}}, {{item.color}}, {{item.size}}</p>
                </div>
            </a>

        </div>
    
    </div>


</div>

</template>

<style scoped>

body{
    background-color: #FEF5E2;
}

.search-page-container{
    height: calc(100vh - 85px);
    overflow: auto;
    width: 100vw;
    box-sizing: border-box;
    padding: 20px;
    padding-top: 30px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;

}

.search-aside-container{
    position: sticky;
    top: 0;
    box-sizing: border-box;
    width: 15vw;
    display: flex;
    flex-direction: column;
    height: fit-content;
    background-color: #ffffff;
    border-radius: 20px;
    padding: 1em;
    margin-right: 20px;
    overflow: auto;
}

.search-aside-container fieldset{
    padding: 10px 0;
    border: none;
    border-bottom: 1px solid #ccc;
    margin-bottom: 20px;
    display: flex;
    flex-wrap: wrap;
}

.search-aside-container fieldset > div{
    margin-bottom: 15px;
}

.search-aside-container legend{
    display: block;
    font-weight: 500;
}

.search-aside-container input[type="radio"]{
    display: none;
}

.search-aside-container label{
    font-size: 0.9em;
    margin-left: 5px;
}

.search-aside-container input[type="radio"]:checked + label {
    background-color: #2D9C71;
    color: white;
}

.search-aside-container input[type="radio"]:checked + label:hover {
    background-color: #2D9C71;
}

.search-aside-container input[type="radio"]:hover + label {
    background-color: #a1a1a1;
}

.search-aside-container input[type="radio"] + label{
    font-size: 0.9em;
    margin-left: 2px;
    padding: 8px;
    border-radius: 10px;
    background-color: #e6e6e6;
}


.search-aside-container .dateField div{
    display: flex;
    justify-content: space-between;
    margin-bottom: 8px;
}

.search-aside-container input[type="date"]{
    background-color: #e6e6e6;
    border: none;
    padding: 8px;
    border-radius: 10px;
}

.search-aside-container input[type="submit"]{
    background-color: #2D9C71;
    width: 100%;
    color: white;
    padding: 10px;
    border: none;
    border-radius: 10px;
    cursor: pointer;
}



.item-search-grid{
    box-sizing: border-box;
    width: calc(90vw - 20px);
    /* background-color: violet */
}

.search-page-search-bar{
    display: flex;
    justify-content: center;
}

.search-page-search-bar form{
    width: 30%;
    background-color: white;
    border-radius: 40px;
    overflow: hidden;
    display: flex;
    justify-content: flex-start;
}

.search-page-search-bar form input{
    border: none;
    padding: 1em;
}

.search-page-search-bar form input[type="text"]{
    width: 100%;
}


.item-grid{
    padding: 0 0 var(--main-padding) 0;
    display: grid;
    box-sizing: border-box;
    grid-template-columns: repeat(6, 1fr);
    column-gap: var(--artwork-grid-gaps);
    row-gap: var(--artwork-grid-gaps);
    align-items: space-between;
    
}

.card{
    box-sizing: border-box;
    padding: 1em;
    aspect-ratio: 1/1.2;
    background-color: whitesmoke;
    box-sizing: border-box;
    position: relative;
    float: left;
    border-radius: var(--card-border-radius);
    overflow: hidden;
    /* background-color: aquamarine; */
    cursor: pointer;
}

.register-card{
    background-color: #2D9C71;
    color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-decoration: none;
}

.register-card span{
    font-size: 1em;
}

.register-card div{
    background-color: rgba(0, 0, 0, 0.1);
    width: 100%;
    aspect-ratio: 1/1;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 1em;
}

.register-card .plus{
    font-size: 10em;
    font-weight: 100;
}

.item-card{
    background-color: #f8f8f8;
    text-decoration: none;
    border: 1px solid #e4e4e4;
}

.item-card:hover{
    background-color: white;
}

.item-card .card-infos-container p {
    text-decoration: none;
    color: #303030;
}

.item-card .card-infos-container p span{
    font-weight: bold;
    color: rgb(20, 20, 20);
}

.item-card .card-img-container{
    box-sizing: border-box;
    width: 100%;
    aspect-ratio: 1/1;
    display: flex;
    align-items: center;
    overflow: hidden;
    margin-bottom: 1em;
}

.item-card .card-img-container img {
   height: 100%;
}



</style>
