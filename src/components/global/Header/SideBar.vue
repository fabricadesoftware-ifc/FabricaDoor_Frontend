<script setup>
import { ViewDashboard, Cog, Account } from '@/components/icons';
import { useAuthStore } from '@/stores';

const authStore = useAuthStore();

</script>

<template>
    <aside>
        <ul>
            <li v-if="authStore.$state.authUser.user.isSuper">
                <router-link to="/dashboard">
                    <component :is="ViewDashboard" :size="30" />
                    Dashboard
                </router-link>
            </li>
            <li>
                <router-link to="/profile">
                    <component :is="Account" :size="30" />
                    Perfil
                </router-link>
            </li>
            <li>
                <router-link to="/config">
                    <component :is="Cog" :size="30" />
                    Configurações
                </router-link>
            </li>
            <li v-if="authStore.authUser.isLogged">
                <span to="/login" @click="authStore.logout" class="logout">
                    <img src="/public/logout.svg" alt="">
                    Logout
                </span>
            </li>
        </ul>
        <!-- <ToggleMode /> -->
    </aside>
</template>

<style scoped>
aside {
    position: fixed;
    top: 0;
    left: 0;
    width: 200px;
    height: 100%;
    border: 1px solid #ccc;
    z-index: 1;
}

ul {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
    list-style: none;
}

a {
    text-decoration: none;
    display: flex;
    gap: .5rem;
    align-items: center;
}

li {
    display: flex;
    align-items: center;
}

span {
    display: flex;
    align-items: center;
    color: red;
    gap: .5rem;
    cursor: pointer;
}

img {
    width: 30px;
}
</style>