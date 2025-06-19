<script setup>
import { useAuthStore, useDoorStore } from '@/stores';
import { OpenDoor } from '..';
import { debounce } from 'lodash';
import { ref, computed } from 'vue';

const authStore = useAuthStore();
const doorStore = useDoorStore();

const usageLevel = computed(() => {
    const usedTimes = 1; // Substitua pelo valor real
    if (usedTimes <= 50) return { text: 'Iniciante', color: 'info' };
    if (usedTimes <= 100) return { text: 'Regular', color: 'primary' };
    if (usedTimes <= 150) return { text: 'Frequente', color: 'success' };
    if (usedTimes <= 200) return { text: 'Assíduo', color: 'success' };
    if (usedTimes <= 300) return { text: 'Veterano', color: 'warning' };
    if (usedTimes <= 400) return { text: 'Expert', color: 'warning' };
    return { text: 'Master', color: 'error' };
});

const handleOpenDoor = debounce(() => {
    doorStore.openDoor(authStore.$state.authUser.token);
}, 200);
</script>

<template>
    <div class="d-flex flex-column flex-sm-row align-center gap-4">
        <v-avatar size="120" class="border">
            <v-img src="https://door-api.fexcompany.me/avatar/mcquen.jpg" alt="User Picture" />
        </v-avatar>

        <div class="flex-grow-1 text-center text-sm-start">
            <div class="d-flex flex-column gap-2">
                <h2 class="text-h5 font-weight-bold mb-1">
                    {{ authStore.$state.authUser.user.name }}
                </h2>

                <p class="text-body-1 text-medium-emphasis">
                    {{ authStore.$state.authUser.user.email }}
                </p>

                <div class="d-flex gap-2 justify-center justify-sm-start flex-wrap">
                    <v-chip v-if="authStore.$state.authUser.user.isSuper" color="primary" size="small" label>
                        Admin
                    </v-chip>

                    <v-chip :color="usageLevel.color" size="small" label>
                        {{ usageLevel.text }}
                    </v-chip>
                </div>
            </div>
        </div>

        <div class="d-flex align-center">
            <OpenDoor @click="handleOpenDoor" />
        </div>
    </div>
</template>

<style scoped>
article {
    display: grid;
    width: 95%;
    grid-template-columns: 2fr 5fr;
}

.align {
    display: flex;
    gap: 1rem;
    flex-direction: column;

}

.photo {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.info {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;

}

.photo img {
    width: 8rem;
    height: 8rem;
    object-fit: cover;
    border-radius: 50%;
    border: 1px solid #ccc;
}

.admin {
    border: 1px solid #ccc;
    padding: 0.25rem;
    font-size: 70%;
    border-radius: 20px;
}

.tags {
    display: flex;
    gap: 0.5rem;
}

.tag {
    background-color: transparent;
    border: 1px solid #ccc;
    padding: 0.25rem;
    font-size: 70%;
    border-radius: 20px;
}

@media screen and (max-width: 1024px) {
    article {
        display: flex;
        flex-direction: column;
        margin: auto;
    }

    .photo {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: auto;
    }

    .photo img {
        width: 10rem;
        height: 10rem;
    }

    .info {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        align-items: center;
        margin: auto;
    }

    .tags {
        justify-content: center;
    }

    .align {
        align-items: center;
        justify-content: center;
        margin-top: 10px;
    }

}
</style>