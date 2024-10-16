<script setup>
import { onMounted, onBeforeUnmount } from "vue";
import AlertOutline from "vue-material-design-icons/AlertOutline.vue";
import HoverButton from "../global/Buttons/HoverButton.vue";
import { useUsersStore } from "@/stores";
const usersStore = useUsersStore();

// eslint-disable-next-line no-unused-vars
const props = defineProps({
    isOpen: Boolean,
    objectSelected: Object,
});

const emit = defineEmits(["update:isOpen"]);

const closeModal = () => {
    emit("update:isOpen", false);
};

// Fecha o modal ao clicar fora dele
const handleClickOutside = (event) => {
    if (event.target.classList.contains("modal-background")) {
        closeModal();
    }
};

// Fecha o modal ao pressionar Esc
const handleKeydown = (event) => {
    if (event.key === "Escape") {
        closeModal();
    }
};

onMounted(() => {
    document.addEventListener("keydown", handleKeydown);
    document.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
    document.removeEventListener("keydown", handleKeydown);
    document.removeEventListener("click", handleClickOutside);
});
</script>

<template>
    <main v-if="isOpen" class="modal-background">
        <section>
            <div style="display: flex; justify-content: space-between; flex-direction: column; gap: 1.5rem;">
                <div class="text">
                    <div class="title">
                        <span>
                            <AlertOutline :size="30" />
                            <h2 style="font-size: 1.5rem;">Dados do Usuário</h2>
                        </span>
                        <button class="close" @click="closeModal">X</button>
                    </div>
                    <div class="subtitle">
                        <p>Por favor, confirme os detalhes abaixo.</p>
                    </div>
                </div>
                <div class="info">
                    <p>Id: <span>{{ objectSelected.id }}</span></p>
                    <p>Usuário: <span>{{ objectSelected.name }}</span></p>
                    <p>Email: <span>{{ objectSelected.email }}</span></p>
                    <p>isSuper: <span>{{ objectSelected.isSuper }}</span></p>
                    <p>isVerified: <span>{{ objectSelected.isVerified }}</span></p>
                </div>
            </div>
            <div class="buttons">
                <HoverButton text="EXCLUIR" color="red" hoverTextColor="white"
                    @click="closeModal, usersStore.deleteUser(Number(objectSelected.id))" />
                <HoverButton text="VERIFICAR" color="green" hoverTextColor="white" v-if="!objectSelected.isVerified" />
                <HoverButton text="ADMIN" color="blue" hoverTextColor="white" v-if="!objectSelected.isSuper" />
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
    display: flex;
    gap: 1rem;
    align-items: center;
    font-weight: 500;
}

p>span {
    font-weight: 400;
}
</style>
