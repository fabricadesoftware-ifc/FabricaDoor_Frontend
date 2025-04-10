<script setup>
import { onMounted, onBeforeUnmount } from 'vue';
import { HoverButton } from '..';
import { AlertOutline } from '../icons';
import { useTagsStore } from '@/stores';

const tagsStore = useTagsStore();
// eslint-disable-next-line no-unused-vars
const props = defineProps({
    isOpen: Boolean,
    objectSelected: Object,
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
                            <AlertOutline :size="30" />
                            <h2 style="font-size: 1rem;">Confirmação de {{ props.objectSelected?.valid ? 'Desativação' : 'Ativação' }} de Tag</h2>
                        </span>
                        <button class="close" @click="closeModal">X</button>
                    </div>
                    <div class="subtitle">
                        <p>Você está prestes a ativar uma tag. Por favor, confirme os detalhes abaixo.</p>
                    </div>
                </div>
                <div class="info">
                    <p>Id da Tag: <span>{{ objectSelected.id }}</span></p>
                    <p>RFID: <span>{{ objectSelected.rfid }}</span></p>
                    <p>Status: <span>{{ objectSelected.valid ? 'Ativo' : 'Desativado' }}</span></p>
                </div>
            </div>
            <div class="buttons">
                <HoverButton text="Excluir" color="red" hoverTextColor="white" @click="tagsStore.deleteTags(props.objectSelected?.id)" />

                <HoverButton :text="props.objectSelected?.valid ? 'Desativar' : 'Ativar'" :color="props.objectSelected?.valid ? 'red' : 'green'" hoverTextColor="white" @click="tagsStore.verifyTag(props.objectSelected?.id)" />
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
    width: 90%;
    max-width: 500px;
    height: auto;
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
    justify-content: space-between;
    gap: 1rem;
    margin-top: 1rem;
}

.info {
    display: flex;
    flex-direction: column;
    gap: .5rem;
}

.info > p {
    display: flex;
    gap: 1rem;
    align-items: center;
    font-weight: 500;
}

p > span {
    font-weight: 400;
}

/* Responsividade para dispositivos móveis */
@media (max-width: 768px) {
    section {
        width: 90%;
        max-width: 100%;
        padding: 1.5rem;
    }

    .buttons {
        flex-direction: column;
        gap: 0.5rem;
    }

    button.close {
        font-size: 1.2rem;
    }

    .title h2 {
        font-size: 1.2rem;
    }
}

@media (max-width: 480px) {
    .text h2 {
        font-size: 1rem;
    }

    .subtitle {
        font-size: 0.875rem;
    }
}


</style>
