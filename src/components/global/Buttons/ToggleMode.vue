<style scoped>
.container {
    color: hsl(0, 0%, 30%);
    font-weight: 900;
    font-size: 1.5rem;
    display: flex;
    align-items: center;
}

.toggle {
    width: 100px;
    /* Alterado para largura maior */
    height: 30px;
    /* Alterado para altura menor */
    background-color: hsl(0, 0%, 80%);
    border-radius: 1rem;
    padding: 0 0.15rem;
    /* Alterado para padding horizontal */
    cursor: pointer;
    display: flex;
    align-items: center;
    /* Alinha o círculo verticalmente */
    transition: background-color 300ms;
}

.toggle__circle {
    width: 20px;
    height: 20px;
    background-color: hsl(0, 0%, 95%);
    border-radius: 50%;
    margin-left: 0;
    /* Inicialmente à esquerda */
    transition: margin 300ms ease-in-out;
}

.toggle-text {
    display: flex;
    padding: 0 .5rem;
    /* flex-direction: column; */
    line-height: 1;
    margin-top: 0.5rem;
    /* Espaço entre o toggle e o texto */
    text-align: center;
    gap: 20px;
}

#check:checked+.toggle>.toggle__circle {
    margin-left: calc(60px - (0.15rem * 2) - 20px);
    /* Move o círculo para a direita */
}

#check:checked+.toggle {
    background-color: #41a63c;
}
</style>

<template>
    <div class="container" @click="doorStore.toggleMode">
        <div class="toggle-text">
            <span>CA</span>
        </div>
        <input hidden id="check" name="check" type="checkbox">
        <label class="toggle" for="check">
            <div class="toggle__circle"></div>
        </label>
        <div class="toggle-text">
            <span>OP</span>
        </div>
    </div>
</template>

<script setup>
import { useDoorStore } from '@/stores';

const doorStore = useDoorStore();
</script>