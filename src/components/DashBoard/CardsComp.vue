<script setup>
import CardUtils from '../global/Cards/CardUtils.vue';

import TagMultipleOutline from 'vue-material-design-icons/TagMultipleOutline.vue';
import Account from 'vue-material-design-icons/Account.vue';
import DoorOpen from 'vue-material-design-icons/DoorOpen.vue';
</script>

<template>
    <section>
        <div class="title">
            Dashboard
        </div>
        <div class="cards">
            <CardUtils :icon="TagMultipleOutline" title="Tags" number="10" />
            <CardUtils :icon="Account" title="Usuários Ativos" number="10" />
            <CardUtils :icon="DoorOpen" title="Acessos Hoje" number="10" />
        </div>
    </section>
</template>

<style scoped>
section {
    width: 80%;
    margin: 3rem auto;
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.title {
    font-size: 2rem;
    font-weight: 600;
}

.cards {
    width: 100%;
    display: flex;
    gap: 1rem;
    justify-content: space-between;
}
</style>