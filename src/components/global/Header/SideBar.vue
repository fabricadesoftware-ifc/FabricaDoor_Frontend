<script setup>
import { ViewDashboard, Cog, Account } from '@/components/icons';
import { useAuthStore } from '@/stores';

const authStore = useAuthStore();
</script>

<template>
    <nav>
        <ul>
            <li v-if="authStore.$state.authUser.user.isSuper">
                <router-link to="/dashboard">
                    <component :is="ViewDashboard" :size="30" />
                    <span>Dashboard</span>
                </router-link>
            </li>
            <li>
                <router-link to="/profile">
                    <component :is="Account" :size="30" />
                    <span>Perfil</span>
                </router-link>
            </li>
            <!-- <li>
                <router-link to="/config">
                    <component :is="Cog" :size="30" />
                    <span>Configurações</span>
                </router-link>
            </li> -->
            <!-- <li v-if="authStore.authUser.isLogged">
                <span @click="authStore.logout" class="logout">
                    <img src="/public/logout.svg" alt="Logout" />
                    <span>Logout</span>
                </span>
            </li> -->
        </ul>
    </nav>
</template>

<style scoped>
nav {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 1rem 0;
    border-top: 1px solid #ccc;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;
}

ul {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    margin: 0;
    list-style: none;
}

li {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

a,
span {
    text-decoration: none;
    color: inherit;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.25rem;
    font-size: 0.9rem;
}

img {
    width: 30px;
}

.logout {
    cursor: pointer;
    color: red;
}
</style>