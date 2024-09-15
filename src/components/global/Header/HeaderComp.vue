<script setup>
import { ref } from 'vue';
import LockOutline from 'vue-material-design-icons/LockOutline.vue';
import LockOpenOutline from 'vue-material-design-icons/LockOpenOutline.vue';
import { useAuthStore } from '@/stores';

const authStore = useAuthStore();

const isHovered = ref(false);

const handleMouseEnter = () => {
    isHovered.value = true;
};

const handleMouseLeave = () => {
    isHovered.value = false;
};
</script>

<template>
    <header>
        <div class="container">
            <div class="logo" @mouseover="handleMouseEnter" @mouseleave="handleMouseLeave">
                <!-- Alterna entre os dois componentes de ícone com base no estado de hover -->
                <component :is="isHovered ? LockOpenOutline : LockOutline" :size="60" />
                <router-link to="/" class="title">FabricaDoor</router-link>
            </div>
            <nav>
                <ul>
                    <li>
                        <router-link to="/dashboard">Dashboard</router-link>
                    </li>
                    <li>
                        <router-link to="/">Tags</router-link>
                    </li>
                    <li>
                        <router-link to="/">Logs</router-link>
                    </li>
                    <li>
                        <router-link to="/">Configurações</router-link>
                    </li>
                    <li v-if="authStore.authUser.isLogged">
                        <span to="/login" @click="authStore.logout" class="logout">
                            <img src="/public/logout.svg" alt="">
                            Logout
                        </span>
                    </li>
                </ul>
            </nav>
        </div>
    </header>
</template>

<style scoped>
header {
    display: flex;
    width: 100%;
    padding: .75rem 1.5rem;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ccc;
}

.container {
    display: flex;
    justify-content: space-between;
    width: 80%;
    margin: 0 auto;
}

nav {
    display: flex;
    gap: 1.5rem;
}

.logo {
    display: flex;
    align-items: center;
    cursor: pointer;
}

a.title {
    font-size: 2rem;
    font-weight: 600;
}

ul {
    display: flex;
    list-style: none;
    gap: 1.5rem;
}

a {
    text-decoration: none;
    position: relative;
    transition: color 0.3s ease-in-out;
}

a::after {
    content: '';
    position: absolute;
    right: 0;
    bottom: -3px;
    width: 0;
    height: 2px;
    background-color: #6d6d6d;
    transition: width 0.3s ease-in-out;
}

a:hover {
    color: #6d6d6d;
}

a:hover::after {
    width: 100%;
}

li {
    display: flex;
    align-items: center;
    justify-content: center;
}

.logout {
    color: red;
    display: flex;
    gap: .5rem;
    align-items: center;
    cursor: pointer;
}

.logout img {
    width: 20px;
    height: 20px;
}

</style>
