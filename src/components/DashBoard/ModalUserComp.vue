<script setup>
import { ref, watch } from "vue";
import { HoverButton } from "..";
import { useUsersStore } from "@/stores";
import { AlertOutline } from "../icons";

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

// Fechar modal
const closeModal = () => {
    emit("update:isOpen", false);
};

// Atualizar dados do usuário no backend
// const updateUser = async () => {
//     try {
//         await usersStore.updateUser(localObject.value.id, localObject.value);
//         closeModal(); // Fechar modal após a atualização
//     } catch (error) {
//         console.error("Erro ao atualizar usuário:", error);
//     }
// };
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
                    <p>Id: <span>{{ localObject.id }}</span></p>
                    <p>Usuário: 
                        <span>
                            <input v-model="localObject.name" type="text" :placeholder="objectSelected.name" class="showData">
                        </span>
                    </p>
                    <p>Email: 
                        <span>
                            <input v-model="localObject.email" type="text" :placeholder="objectSelected.email" class="showData">
                        </span>
                    </p>
                    <p>isSuper: 
                        <span>
                            <input v-model="localObject.isSuper" type="checkbox" />
                        </span>
                    </p>
                    <p>isVerified: 
                        <span>
                            <input v-model="localObject.isVerified" type="checkbox" />
                        </span>
                    </p>
                </div>
            </div>
            <div class="buttons">
                <HoverButton text="EXCLUIR" color="red" hoverTextColor="white"
                    @click="closeModal, usersStore.deleteUser(Number(objectSelected.id))" />
                <HoverButton text="ATUALIZAR" color="green" hoverTextColor="white" @click="usersStore.updateUser(localObject)" />
            
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

input.showData{
    border: 0;
    width: 60%;
}

input.showData:focus{
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

    .showData> p > span {
        width: 100%;
    }
    input.showData {
        width: 100%;
    }
    
}
</style>
