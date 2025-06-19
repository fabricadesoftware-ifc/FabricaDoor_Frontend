<script setup>
import { reactive, ref } from 'vue';
import { LockOutline, LockOpenOutline } from '../icons';
import { useAuthStore } from '@/stores';

const isHovered = ref(false);
const authStore = useAuthStore();
const showPassword = ref(false);
const loading = ref(false);
const valid = ref(true);

const dataUser = reactive({
    email: '',
    password: '',
});

const handleMouseEnter = () => {
    isHovered.value = true;
};

const handleMouseLeave = () => {
    isHovered.value = false;
};

const emailRules = [
    v => !!v || 'E-mail é obrigatório',
    v => /.+@.+\..+/.test(v) || 'E-mail deve ser válido',
];

const passwordRules = [
    v => !!v || 'Senha é obrigatória',
    v => v.length >= 6 || 'Senha deve ter no mínimo 6 caracteres',
];

const handleLogin = async () => {
    if (!valid.value) return;
    loading.value = true;
    try {
        await authStore.login(dataUser);
    } finally {
        loading.value = false;
    }
};

const handleKeydown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleLogin();
    }
};
</script>

<template>
    <v-container fluid class="fill-height bg-surface-variant">
        <v-row align="center" justify="center">
            <v-col cols="12" sm="8" md="6" lg="4">
                <v-card class="mx-auto pa-6 rounded-xl" elevation="8">
                    <div class="d-flex flex-column align-center mb-6">
                        <div class="d-flex align-center" @mouseover="handleMouseEnter" @mouseleave="handleMouseLeave">
                            <component :is="isHovered ? LockOpenOutline : LockOutline" :size="60" class="mb-2" />
                            <h1 class="text-h4 font-weight-bold ml-2">FabricaDoor</h1>
                        </div>
                        <p class="text-subtitle-1 text-medium-emphasis mt-1">
                            Entre para gerenciar o sistema de acesso
                        </p>
                    </div>

                    <v-form v-model="valid" @submit.prevent="handleLogin" @keydown="handleKeydown">
                        <v-text-field v-model="dataUser.email" :rules="emailRules" label="E-mail"
                            prepend-inner-icon="mdi-email" variant="outlined" required></v-text-field>

                        <v-text-field v-model="dataUser.password" :rules="passwordRules"
                            :type="showPassword ? 'text' : 'password'" label="Senha" prepend-inner-icon="mdi-lock"
                            :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'" variant="outlined" required
                            @click:append-inner="showPassword = !showPassword"></v-text-field>

                        <v-btn block color="primary" size="large" type="submit" :loading="loading" :disabled="!valid"
                            class="mt-2">
                            Entrar
                        </v-btn>
                    </v-form>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
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

@media screen and (max-width: 1024px) {
    section {
        width: 80%;
    }

}
</style>
