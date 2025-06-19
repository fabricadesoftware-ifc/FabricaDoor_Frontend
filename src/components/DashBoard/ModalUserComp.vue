<script setup>
import { ref, watch } from "vue";
import { useUsersStore } from "@/stores";
import { Account } from "../icons";

const usersStore = useUsersStore();

const props = defineProps({
    isOpen: Boolean,
    objectSelected: Object,
});

const emit = defineEmits(["update:isOpen"]);

// Criar estado local para armazenar os dados do objeto selecionado
const localObject = ref({ ...props.objectSelected });

// Atualizar estado local quando a prop mudar
watch(() => props.objectSelected, (newObject) => {
    localObject.value = { ...newObject };
});

const closeModal = () => {
    emit("update:isOpen", false);
};

const valid = ref(true);

const nameRules = [
    v => !!v || 'Nome é obrigatório',
    v => v.length >= 3 || 'Nome deve ter no mínimo 3 caracteres',
];

const emailRules = [
    v => !!v || 'E-mail é obrigatório',
    v => /.+@.+\..+/.test(v) || 'E-mail deve ser válido',
];

const handleSubmit = async () => {
    if (!valid.value) return;
    await usersStore.updateUser(localObject.value);
    closeModal();
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
                        Editar Usuário
                    </v-card-title>
                    <v-spacer></v-spacer>
                    <v-btn icon variant="text" @click="closeModal">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </div>

                <v-card-subtitle class="text-center pb-0">
                    Edite as informações do usuário abaixo.
                </v-card-subtitle>

                <v-card-text class="pt-4">
                    <v-form v-model="valid">
                        <v-text-field v-model="localObject.name" :rules="nameRules" label="Nome"
                            prepend-inner-icon="mdi-account" variant="outlined" required class="mb-3"></v-text-field>

                        <v-text-field v-model="localObject.email" :rules="emailRules" label="E-mail"
                            prepend-inner-icon="mdi-email" variant="outlined" required class="mb-3"></v-text-field>

                        <v-switch v-model="localObject.isSuper" label="Super Usuário" color="primary" hide-details
                            class="mb-3"></v-switch>

                        <v-switch v-model="localObject.isVerified" label="Verificado" color="success"
                            hide-details></v-switch>
                    </v-form>
                </v-card-text>
            </v-card-item>

            <v-divider></v-divider>

            <v-card-actions class="pa-4">
                <v-spacer></v-spacer>
                <v-btn color="error" variant="tonal" prepend-icon="mdi-delete"
                    @click="usersStore.deleteUser(Number(localObject.id))" class="text-none mr-2">
                    Excluir
                </v-btn>
                <v-btn color="primary" :disabled="!valid" @click="handleSubmit" class="text-none"
                    prepend-icon="mdi-content-save">
                    Salvar
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

input.showData {
    border: 0;
    width: 60%;
}

input.showData:focus {
    outline: none;
    border-bottom: 2px solid #6d6d6d;
}

input.showData::placeholder {
    color: black;
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
    gap: 1rem;
}

.title>span {
    display: flex;
    align-items: center;
    gap: 1rem;
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
    width: 100%;
}

.info>p {
    display: flex;
    gap: 1rem;
    align-items: center;
    font-weight: 500;
    width: 100%;
    height: 30px;
}

p>span {
    font-weight: 400;
    width: 100%;
    display: flex;
    justify-content: start;
}

@media screen and (max-width: 1024px) {
    section {
        width: 80%;
        height: 55%;
    }

    .showData {
        width: 100%;
    }

    .showData p {
        width: 100%;
    }

    .showData>p>span {
        width: 100%;
    }

    input.showData {
        width: 100%;
    }

}
</style>
