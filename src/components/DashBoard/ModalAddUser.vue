<script setup>
import { reactive, ref } from 'vue';
import { Account } from '../icons';
import { useAuthStore } from '@/stores';

const authStore = useAuthStore();
const showPassword = ref(false);
const loading = ref(false);
const valid = ref(true);

const props = defineProps({
    isOpen: Boolean,
});

const dataUser = reactive({
    name: '',
    email: '',
    password: '',
});

const emit = defineEmits(["update:isOpen"]);

const closeModal = () => {
    emit("update:isOpen", false);
};

const nameRules = [
    v => !!v || 'Nome é obrigatório',
    v => v.length >= 3 || 'Nome deve ter no mínimo 3 caracteres',
];

const emailRules = [
    v => !!v || 'E-mail é obrigatório',
    v => /.+@.+\..+/.test(v) || 'E-mail deve ser válido',
];

const passwordRules = [
    v => !!v || 'Senha é obrigatória',
    v => v.length >= 6 || 'Senha deve ter no mínimo 6 caracteres',
];

const handleSubmit = async () => {
    if (!valid.value) return;

    loading.value = true;
    try {
        await authStore.register(dataUser);
        closeModal();
    } finally {
        loading.value = false;
    }
};

const handleKeydown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSubmit();
    }
};
</script>

<template>
    <v-dialog :model-value="isOpen" @update:model-value="emit('update:isOpen', $event)" max-width="500"
        transition="dialog-bottom-transition" persistent>
        <v-card class="rounded-lg">
            <v-card-item>
                <div class="d-flex align-center mb-4">
                    <v-avatar color="primary" class="mr-4">
                        <Account :size="24" color="white" />
                    </v-avatar>
                    <v-card-title class="text-h6">
                        Adicionar Usuário
                    </v-card-title>
                    <v-spacer></v-spacer>
                    <v-btn icon variant="text" @click="closeModal">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </div>

                <v-card-subtitle class="text-center pb-0">
                    Você está prestes a cadastrar um usuário. Por favor, preencha os detalhes abaixo.
                </v-card-subtitle>

                <v-card-text class="pt-4">
                    <v-form v-model="valid" @submit.prevent="handleSubmit" @keydown="handleKeydown">
                        <v-text-field v-model="dataUser.name" :rules="nameRules" label="Nome"
                            prepend-inner-icon="mdi-account" variant="outlined" required class="mb-3"></v-text-field>

                        <v-text-field v-model="dataUser.email" :rules="emailRules" label="E-mail"
                            prepend-inner-icon="mdi-email" variant="outlined" required class="mb-3"></v-text-field>

                        <v-text-field v-model="dataUser.password" :rules="passwordRules"
                            :type="showPassword ? 'text' : 'password'" label="Senha" prepend-inner-icon="mdi-lock"
                            :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'" variant="outlined" required
                            @click:append-inner="showPassword = !showPassword"></v-text-field>
                    </v-form>
                </v-card-text>
            </v-card-item>

            <v-divider></v-divider>

            <v-card-actions class="pa-4">
                <v-spacer></v-spacer>
                <v-btn color="error" variant="tonal" @click="closeModal" class="text-none mr-2">
                    Cancelar
                </v-btn>
                <v-btn color="primary" :loading="loading" :disabled="!valid" @click="handleSubmit" class="text-none">
                    Cadastrar
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<style scoped>
main {
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #00000083;
    top: 0;
    left: 0;
    position: fixed;
    z-index: 200 !important;
    backdrop-filter: blur(5px);
}

section {
    width: 30%;
    height: 50%;
    background-color: white;
    border-radius: 15px;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    justify-content: space-between;
    box-shadow: 0 0 10px 0 #00000083;
    z-index: 300;

}


button.close {
    width: 10%;
    border: 0;
    background-color: transparent;
    font-size: 1.5rem;
    color: #6d6d6d;
    cursor: pointer;
}

.subtitle {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #6d6d6d;
}

.text {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
}

.title {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

span {
    display: flex;
    justify-content: center;
    align-items: center;
}

.buttons {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: end;
    gap: 1rem;
}

.info {
    display: flex;
    flex-direction: column;
    gap: .5rem;
}

.info>p {
    display: grid;
    grid-template-columns: 20% 80%;
    gap: 1rem;
    align-items: center;
    font-weight: 500;
}

.info>p>span {
    display: flex;
    gap: 1rem;
    align-items: start;
    justify-content: start;
}

.info>p>span>input {
    width: 100%;
    padding: .5rem;
    border: 1px solid #ccc;
    border-radius: 5px;
}

p>span {
    font-weight: 400;
}

@media screen and (max-width: 1024px) {
    section {
        width: 90%;
        height: 65%;
    }

    .info>p {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

}
</style>
