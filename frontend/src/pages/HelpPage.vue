<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'


</script>

    
<template>
    <div id="help">
        <img src="../assets/images/triste.png">
        <div>
            <H1> Centro de ajuda </H1> <br>
            <h3> Perguntas recentes</h3>
            <ul>
                <li><a>Esqueci minha senha</a></li>
                <li><a>Não sei qual é meu login</a></li>
                <li><a>Não achei meu item</a></li>
                <li><a>Agendamento deu errado</a></li>
            </ul>
        </div>
    </div>


</template>

<style scoped>

    #help {
    width: 100%;
    height: calc(100vh - 80px);
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    color: var(--text-color)
    }
    
    img {
    width: 400px;
    height: 400px;
    }

    h1 {
    margin-bottom: 20px;
    color: var(--text-color);
    font-weight: bolder;
    }
    
    h3 {
    margin-bottom: 10px;
    color: var(--text-color)
    }

    a {
    margin-bottom: 10px;
    color: var(--text-color);
    cursor: pointer
    }


</style>
