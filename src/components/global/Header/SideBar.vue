<script setup>
import { ref } from 'vue';
import { ViewDashboard, Account, DoorOpen } from '@/components/icons';
import { useAuthStore, useDoorStore } from '@/stores';
import { toast } from 'vue3-toastify';
import { useHaptic } from '@/composables/useHaptic';

const authStore = useAuthStore();
const doorStore = useDoorStore();
const haptic = useHaptic();
const isDoorOpening = ref(false);
const doorCooldown = ref(false);

const handleOpenDoor = async () => {
    if (doorCooldown.value) return;
    haptic.tapHeavy();
    isDoorOpening.value = true;
    doorCooldown.value = true;
    try {
        await doorStore.openDoor();
        haptic.doorOpen();
        toast.success('Porta aberta com sucesso!');
    } catch {
        haptic.error();
        toast.error('Erro ao abrir a porta');
    } finally {
        isDoorOpening.value = false;
        setTimeout(() => {
            doorCooldown.value = false;
        }, 5000);
    }
};
</script>

<template>
    <nav>
        <ul>
            <li v-if="authStore.$state.authUser.isLogged">
                <a @click="handleOpenDoor" :class="{ 'door-disabled': doorCooldown }" class="door-link">
                    <component :is="DoorOpen" :size="30" />
                    <span>{{ doorCooldown ? 'Aguarde...' : 'Abrir Porta' }}</span>
                </a>
            </li>
            <li v-if="authStore.$state.authUser.user.isSuper">
                <router-link to="/dashboard">
                    <component :is="ViewDashboard" :size="30" />
                    <span>Dashboard</span>
                </router-link>
            </li>
            <li>
                <router-link to="/profile">
                    <component :is="Account" :size="30" />
                    <span>Perfil</span>
                </router-link>
            </li>
        </ul>
    </nav>
</template>

<style scoped>
nav {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 1rem 0;
    border-top: 1px solid #ccc;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;
}

ul {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    margin: 0;
    list-style: none;
}

li {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

a,
span {
    text-decoration: none;
    color: inherit;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.25rem;
    font-size: 0.9rem;
}

img {
    width: 30px;
}

.logout {
    cursor: pointer;
    color: red;
}

.door-link {
    cursor: pointer;
}

.door-disabled {
    opacity: 0.5;
    pointer-events: none;
}
</style>