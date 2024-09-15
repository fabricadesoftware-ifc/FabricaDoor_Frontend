<script setup>
import { reactive, ref } from 'vue';
import LockOutline from 'vue-material-design-icons/LockOutline.vue';
import LockOpenOutline from 'vue-material-design-icons/LockOpenOutline.vue';
import { useAuthStore } from '@/stores';

const isHovered = ref(false);
const authStore = useAuthStore();

const dataUser = reactive({
    email: '',
    password: '',
});

const handleMouseEnter = () => {
    isHovered.value = true;
};

const handleMouseLeave = () => {
    isHovered.value = false;
};</script>

<template>
    <main>
        <section>
            <div class="title">
                <div style="display: flex; align-items: center;">
                    <div class="logo">
                        <component :is="isHovered ? LockOpenOutline : LockOutline" :size="60"
                            @mouseover="handleMouseEnter" @mouseleave="handleMouseLeave" />
                        <h2 to="/" class="title" @mouseover="handleMouseEnter" @mouseleave="handleMouseLeave">
                            FabricaDoor</h2>
                    </div>
                </div>
                <div>
                    <p>Entre para gerenciar o sistema de acesso</p>
                </div>
            </div>
            <div class="form">
                <form @submit.prevent>
                    <div class="input">
                        <label for="email">Email:</label>
                        <input type="email" id="email" v-model="dataUser.email" />
                    </div>
                    <div class="input">
                        <label for="password">Senha:</label>
                        <input type="password" id="password" v-model="dataUser.password" />
                    </div>
                    <div class="button">
                        <button @click="authStore.login(dataUser)">Entrar</button>
                    </div>
                </form>
            </div>
        </section>
    </main>
</template>

<style scoped>
main {
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    /* background-color: #f1f1f1; */
}

section {
    width: 20%;
    height: 60vh;
    background-color: white;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 15px;
    padding: 3% 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
    justify-content: space-around;
    border: 1px solid #ccc;
}

.title {
    display: flex;
    flex-direction: column;
    gap: .5rem;
    align-items: center;
    width: 80%;
    text-align: center;
}

h1 {
    font-size: 2rem;
    font-weight: 600;
}

div>p {
    font-size: 1rem;
    color: #6d6d6d;
}

input {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 5px;
}

button {
    padding: 0.75rem 1.5rem;
    border: none;
    width: 100%;
    background-color: #000;
    color: white;
    border-radius: 5px;
    cursor: pointer;
    transition: 0.3s ease-in-out;
}

button:hover {
    background-color: #333;
}

.logo {
    display: flex;
    align-items: center;
    gap: .5rem;
}

.form {
    width: 80%;
}

form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}


h2 {
    text-decoration: none;
    position: relative;
    transition: color 0.3s ease-in-out;
}

h2::after {
    content: '';
    position: absolute;
    right: 0;
    bottom: -3px;
    width: 0;
    height: 2px;
    background-color: #6d6d6d;
    transition: width 0.3s ease-in-out;
}

h2:hover {
    color: #6d6d6d;
}

h2:hover::after {
    width: 100%;
}
</style>
