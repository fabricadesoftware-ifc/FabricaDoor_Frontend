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
            <v-col cols="11" sm="6" md="5" lg="3">
                <v-card class="mx-auto pa-5 rounded-xl" elevation="4" max-width="380">
                    <div class="d-flex flex-column align-center mb-5">
                        <div class="d-flex align-center" @mouseover="handleMouseEnter" @mouseleave="handleMouseLeave">
                            <component :is="isHovered ? LockOpenOutline : LockOutline" :size="36" />
                            <h1 class="text-h5 font-weight-bold ml-2">FabricaDoor</h1>
                        </div>
                        <p class="text-body-2 text-medium-emphasis mt-1">
                            Entre para gerenciar o sistema de acesso
                        </p>
                    </div>

                    <v-form v-model="valid" @submit.prevent="handleLogin" @keydown="handleKeydown">
                        <v-text-field v-model="dataUser.email" :rules="emailRules" label="E-mail"
                            prepend-inner-icon="mdi-email" variant="outlined" density="comfortable"
                            name="email" type="email" autocomplete="email"
                            required></v-text-field>

                        <v-text-field v-model="dataUser.password" :rules="passwordRules"
                            :type="showPassword ? 'text' : 'password'" label="Senha" prepend-inner-icon="mdi-lock"
                            :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'" variant="outlined"
                            density="comfortable" name="password" autocomplete="current-password"
                            required
                            @click:append-inner="showPassword = !showPassword"></v-text-field>

                        <v-btn block color="primary" type="submit" :loading="loading" :disabled="!valid"
                            class="mt-3">
                            Entrar
                        </v-btn>
                    </v-form>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<style scoped>
</style>
