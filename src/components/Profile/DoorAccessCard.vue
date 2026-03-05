<script setup>
import { ref } from 'vue';
import { useDoorStore } from '@/stores';
import { toast } from 'vue3-toastify';
import { useHaptic } from '@/composables/useHaptic';

const doorStore = useDoorStore();
const haptic = useHaptic();
const isOpening = ref(false);
const doorCooldown = ref(false);
const doorSuccess = ref(false);

const handleOpenDoor = async () => {
    if (doorCooldown.value) return;

    haptic.tapHeavy();
    isOpening.value = true;
    doorCooldown.value = true;
    doorSuccess.value = false;

    try {
        await doorStore.openDoor();
        doorSuccess.value = true;
        haptic.doorOpen();
        toast.success('Porta aberta com sucesso!');

        setTimeout(() => {
            doorSuccess.value = false;
        }, 3000);
    } catch {
        haptic.error();
        toast.error('Erro ao abrir a porta');
    } finally {
        isOpening.value = false;
        setTimeout(() => {
            doorCooldown.value = false;
        }, 5000);
    }
};
</script>

<template>
    <v-card class="door-access-card overflow-hidden" :class="{ 'door-success': doorSuccess }">
        <div class="door-bg-pattern"></div>

        <v-card-text class="d-flex flex-column align-center justify-center pa-8 position-relative">
            <div class="door-icon-wrapper mb-4" :class="{ 'pulse-animation': !doorCooldown }">
                <v-avatar :color="doorSuccess ? 'success' : doorCooldown ? 'grey' : 'primary'" size="88"
                    class="elevation-4">
                    <v-icon size="44" color="white">
                        {{ doorSuccess ? 'mdi-check-circle' : 'mdi-door-open' }}
                    </v-icon>
                </v-avatar>
            </div>

            <h3 class="text-h5 font-weight-bold mb-1">Abrir Porta</h3>
            <p class="text-body-2 text-medium-emphasis mb-5 text-center">
                {{ doorCooldown ? 'Aguarde o cooldown...' : 'Toque para destravar o acesso' }}
            </p>

            <v-btn :loading="isOpening" :disabled="doorCooldown" :color="doorSuccess ? 'success' : 'primary'"
                size="x-large" rounded="pill" class="open-btn px-12" elevation="4" @click="handleOpenDoor"
                min-width="220">
                <v-icon start size="24">
                    {{ doorSuccess ? 'mdi-check' : doorCooldown ? 'mdi-timer-sand' : 'mdi-lock-open-variant' }}
                </v-icon>
                {{ doorSuccess ? 'Aberta!' : doorCooldown ? 'Aguarde (5s)' : 'Abrir Porta' }}
            </v-btn>

            <p v-if="doorCooldown && !doorSuccess" class="text-caption text-medium-emphasis mt-3">
                <v-icon size="14" class="mr-1">mdi-information-outline</v-icon>
                Cooldown de segurança ativo
            </p>
        </v-card-text>
    </v-card>
</template>

<style scoped>
.door-access-card {
    position: relative;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    border: 2px solid transparent;
}

.door-access-card:hover {
    border-color: rgba(var(--v-theme-primary), 0.2);
}

.door-success {
    border-color: rgba(var(--v-theme-success), 0.4) !important;
}

.door-bg-pattern {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 0.03;
    background-image: radial-gradient(circle at 20% 50%, rgba(var(--v-theme-primary), 1) 1px, transparent 1px),
        radial-gradient(circle at 80% 20%, rgba(var(--v-theme-primary), 1) 1px, transparent 1px),
        radial-gradient(circle at 60% 80%, rgba(var(--v-theme-primary), 1) 1px, transparent 1px);
    background-size: 60px 60px;
    pointer-events: none;
}

.door-icon-wrapper {
    transition: transform 0.3s ease;
}

.door-icon-wrapper:hover {
    transform: scale(1.05);
}

.pulse-animation {
    animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {

    0%,
    100% {
        transform: scale(1);
    }

    50% {
        transform: scale(1.06);
    }
}

.open-btn {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    letter-spacing: 0.5px;
    font-weight: 600;
}

.open-btn:not(:disabled):hover {
    transform: scale(1.04);
    box-shadow: 0 8px 25px rgba(var(--v-theme-primary), 0.35) !important;
}

.open-btn:active {
    transform: scale(0.97);
}
</style>
