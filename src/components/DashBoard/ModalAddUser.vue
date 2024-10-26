<script setup>
import { onMounted, onBeforeUnmount, reactive } from 'vue';
import { HoverButton } from '..';
import { Account } from '../icons';
import { useAuthStore } from '@/stores';

const authStore = useAuthStore();
// eslint-disable-next-line no-unused-vars
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

const handleEscapeKey = (event) => {
    if (event.key === 'Escape') {
        closeModal();
    }
};

onMounted(() => {
    window.addEventListener('keydown', handleEscapeKey);
});

onBeforeUnmount(() => {
    window.removeEventListener('keydown', handleEscapeKey);
});

const closeOnBackdrop = (event) => {
    if (event.target === event.currentTarget) {
        closeModal();
    }
};
</script>

<template>
    <main v-if="isOpen" @click="closeOnBackdrop">
        <section>
            <div style="display: flex; justify-content: space-between; flex-direction: column; gap: 1.5rem;">
                <div class="text">
                    <div class="title">
                        <span>
                            <Account :size="30" />
                            <h2 style="font-size: 1rem;">Adicionar Boneco</h2>
                        </span>
                        <button class="close" @click="closeModal">X</button>
                    </div>
                    <div class="subtitle">
                        <p>Você está prestes a cadastrar um usuário. Por favor, adicione os detalhes abaixo.</p>
                    </div>
                </div>
                <div class="info">
                    <p>Username: <span>
                            <input type="text" v-model="dataUser.name">
                        </span></p>
                    <p>Email: <span>
                            <input type="text" v-model="dataUser.email">
                        </span></p>
                    <p>Senha: <span>
                            <input type="password" v-model="dataUser.password">
                        </span></p>
                </div>
            </div>
            <div class="buttons">
                <!-- <HoverButton text="Excluir" color="red" hoverTextColor="white"
                    @click="tagsStore.deleteTags(props.objectSelected?.id)" /> -->

                <HoverButton :text="'Cadastrar'" :color="props.objectSelected?.valid ? 'red' : 'green'"
                    hoverTextColor="white" @click="authStore.register(dataUser)" />
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
</style>
