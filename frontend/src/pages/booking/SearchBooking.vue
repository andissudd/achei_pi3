<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { api } from '../../api'

import type {Booking, Item} from "../../types";
import {categories, colors, sizes} from "../../types";

const bookings = ref([] as Booking[])
const error = ref<Error>()
const loading = ref(true)
const claimSuccess = ref(false)
const deleteSuccess = ref(false)

const bookingToClaim = ref({} as Booking)
const bookingToDelete = ref({} as Booking)

const claimRequest = ref(false)
const deleteRequest = ref(false)
const confirmColor = ref("")

async function loadBookings(){
    try {
    const res = await api.get('/bookings/active');
    bookings.value = res.data.data;  
  } catch (e) {
    error.value = e as Error
  } finally {
    loading.value = false
  }
};

function askToClaim(code:string) {
    let toClaim = bookings.value.findIndex(b=> code === b.code);
    bookingToClaim.value = bookings.value[toClaim]
    console.log(bookingToClaim.value)
    claimRequest.value = true;
    deleteRequest.value = false;
    confirmColor.value = "#2D9C71"
};

function askToDelete(code:string) {
    let toDelete = bookings.value.findIndex(b=> code === b.code);
    bookingToDelete.value = bookings.value[toDelete]

    deleteRequest.value = true;
    claimRequest.value = false;
    confirmColor.value = "#B14D30"
};

function closeModal() {
    claimRequest.value = false;
    deleteRequest.value = false;
}

function closeAlerts(){
    claimSuccess.value = false;
    deleteSuccess.value = false;
}

async function confirmClaim(){
    try {
    await api.put(`/bookings/${bookingToClaim.value.code}`);
    await api.put(`/items/${bookingToClaim.value.code}`);
    let claimed = bookings.value.findIndex(b=> bookingToClaim.value.code === b.code);
    bookings.value.splice(claimed, 1)
    claimSuccess.value = true;
  } catch (e) {
        error.value = e as Error
  } finally {
    
  }
}

async function confirmDelete(){
    try {
    await api.delete(`/bookings/${bookingToClaim.value.code}`);
        let deleted = bookings.value.findIndex(b=> bookingToDelete.value.code === b.code);
        bookings.value.splice(deleted, 1)
        deleteSuccess.value = true;
    } catch (e) {
        error.value = e as Error
    } finally{
        
    }
}


onMounted(async () => {
    loadBookings();
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

    <div class="booking-search-grid">
        
        <div v-if="error" class="alert alert-danger alert-dismissible" role="alert">
            {{ error.message }}
            <button @click="error=undefined" type="button" class="btn-close" aria-label="Close"></button>
        </div>

        <div v-if="claimSuccess || deleteSuccess" class="alert alert-success alert-dismissible" role=
        "alert">
        <h2> {{ claimSuccess ? "Resgate concluído com sucesso!": "Item deletado com sucesso." }} </h2>
            <button @click="closeAlerts" type="button" class="btn-close" aria-label="Close"></button>
        </div>

        <div v-if="loading" class="d-flex justify-content-center">
            <div class="spinner-grow" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>

        <div v-else class="booking-grid">
            
            <a v-for="booking in bookings" :key="booking.id" class="card booking-card">
                <div class="item-img">
                    <img v-bind:src="`${booking.item.photo}`">
                </div>
                <div class="item-details">
                    <h3>{{booking.item.name}} <span>{{booking.item.category}}, {{booking.item.color}}, {{booking.item.size}}</span></h3>
                    <p>{{booking.item.desc}}</p>
                </div>
                <div class="user-details">
                    <p>Resgate agendado por: <span>{{ booking.user_booked.name }}</span> Matrícula: <span>{{ booking.user_booked.register }}</span></p>
                </div>
                <div class="booking-actions">
                    <button @click="askToClaim(booking.code)"type="submit">Finalizar</button>
                    <button @click="askToDelete(booking.code)" >Deletar</button>
                </div>
            </a>

        </div>
    
    </div>


</div>
<div class="modals" v-if="claimRequest || deleteRequest" @click="closeModal">
    <div>
        <form v-if="claimRequest" @submit.prevent="">
            <h2>Finalizar resgate</h2>
            <p>Tem certeza que deseja finalizar o resgate do item?</p>
            
            <div>
                <button @click="confirmClaim" class="confirm">Confirmar</button> <button @click="closeModal">Cancelar</button>
            </div>  
        </form>
        <form v-if="deleteRequest" @submit.prevent="confirmDelete">
            <h2>Deletar agendamento</h2>
            <p>Tem certeza que deseja finalizar o resgate do item:</p>
            
            <div>
                <button @click="confirmDelete" class="confirm">Deletar</button> <button @click="closeModal">Cancelar</button>
            </div>  
        </form>
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



.booking-search-grid{
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


.booking-grid{
    padding: 0 0 var(--main-padding) 0;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    row-gap: var(--artwork-grid-gaps);
    align-items: space-between;
}

.card{
    box-sizing: border-box;
    
    background-color: whitesmoke;
    box-sizing: border-box;
    border-radius: var(--card-border-radius);
    overflow: hidden;
    display: flex;
    flex-direction: row;
}

.booking-card{
    background-color: #f8f8f8;
    text-decoration: none;
    border: 1px solid #e4e4e4;
}

.booking-card:hover{
    background-color: white;
}

.booking-card .item-img{
    margin: 1em 0 1em 1em;
    box-sizing: border-box;
    width: 150px;
    aspect-ratio: 1/1;
    overflow: hidden;
    background-color: gray;
    border-radius: 10px;
}

.booking-card .item-img img{
    height: 100%;
}


.booking-card .item-details{
    margin: 1em;
    width: 100%;
}

.booking-card .item-details h3{
    font-weight: 500;
}

.booking-card .item-details span{
    font-size: 0.8em;
    color: gray;
}
.booking-card .item-details p{
    margin-top: 1em;
    width: 80%;
    font-size: 0.9em;
    color: #181818;
}

.booking-card .user-details{
    margin: 1em;
    font-size: 0.9em;
    color: #181818;
}

.booking-card .booking-actions{
    display: flex;
    flex-direction: column;

}
.booking-card .booking-actions button{
    padding: 1em;
    height: 50%;
    width: 100%;
    border: none;
    font-weight: 500;
}

.booking-card .booking-actions button:first-child{
    background-color: #2D9C71;
    color: white;
}

.booking-card .booking-actions button:nth-child(2){
    background-color: #B14D30;
    color: white;
}

.booking-card .booking-actions button:first-child:hover{
    background-color: #1dc585;
    color: white;
}

.booking-card .booking-actions button:nth-child(2):hover{
    background-color: #e93e0e;
    color: white;
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
    background-color: v-bind(confirmColor);
    color: white;
}

</style>
