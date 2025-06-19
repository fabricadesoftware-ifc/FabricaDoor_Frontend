<script setup>
import { ref, onMounted } from 'vue';
import { SideBar } from '@/components';
import { LockOpenOutline, LockOutline } from '@/components/icons';
import { useAuthStore } from '@/stores';
import { useTheme } from 'vuetify';

const theme = useTheme();
const authStore = useAuthStore();
const isMobile = ref(false);
const isHovered = ref(false);
const drawer = ref(false);

const handleMouseEnter = () => {
    isHovered.value = true;
};

const handleMouseLeave = () => {
    isHovered.value = false;
};

const updateIsMobile = () => {
    isMobile.value = window.innerWidth <= 1024;
};

const toggleTheme = () => {
    theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark';
};

onMounted(() => {
    updateIsMobile();
    window.addEventListener('resize', updateIsMobile);
});
</script>

<template>
    <div>
        <v-app-bar class="px-4" color="surface-dark">
            <v-app-bar-nav-icon v-if="isMobile" @click="drawer = !drawer"></v-app-bar-nav-icon>

            <div class="d-flex align-center" @mouseover="handleMouseEnter" @mouseleave="handleMouseLeave">
                <component :is="isHovered ? LockOpenOutline : LockOutline" :size="48" class="mr-2" />
                <v-app-bar-title class="text-h5 font-weight-bold">
                    FabricaDoor
                </v-app-bar-title>
            </div>

            <v-spacer></v-spacer>

            <template v-if="!isMobile">
                <v-btn icon @click="toggleTheme" class="mr-2">
                    <v-icon>{{ theme.global.current.value.dark ? 'mdi-weather-sunny' : 'mdi-weather-night' }}</v-icon>
                </v-btn>

                <v-btn v-if="authStore.authUser.user.isSuper" to="/dashboard" variant="text" class="mx-2">
                    Dashboard
                </v-btn>

                <v-btn v-if="authStore.authUser.isLogged" to="/profile" variant="text" class="mx-2">
                    Perfil
                </v-btn>

                <v-btn v-if="authStore.authUser.isLogged" @click="authStore.logout" color="error" variant="text"
                    class="mx-2" prepend-icon="mdi-logout">
                    Logout
                </v-btn>
            </template>
        </v-app-bar>

        <v-navigation-drawer v-if="isMobile" v-model="drawer" temporary>
            <SideBar />
        </v-navigation-drawer>
    </div>
</template>

<style scoped>
@tailwind utilities;
</style>
