<script setup>
import { Help } from '@/components/icons';
</script>

<template>
    <v-footer class="bg-surface-variant">
        <v-container>
            <v-row align="center" justify="space-between" class="py-2">
                <v-col cols="12" sm="6" class="d-flex align-center justify-center justify-sm-start">
                    <v-img src="/ifcLogoGreen.png" max-width="120" alt="IFC Logo" class="logo-hover" />
                </v-col>

                <v-col cols="12" sm="6" class="d-flex align-center justify-center justify-sm-end">
                    <v-tooltip text="Suporte" location="top">
                        <template v-slot:activator="{ props }">
                            <v-btn v-bind="props" href="https://fabricadesoftware.ifc.edu.br/" target="_blank" icon
                                variant="outlined" color="primary" class="support-btn">
                                <Help :size="24" />
                            </v-btn>
                        </template>
                    </v-tooltip>
                </v-col>
            </v-row>

            <v-row>
                <v-col cols="12" class="text-center pt-0">
                    <p class="text-medium-emphasis text-caption">
                        © {{ new Date().getFullYear() }} FabricaDoor - Desenvolvido no IFC Campus Araquari
                    </p>
                </v-col>
            </v-row>
        </v-container>
    </v-footer>
</template>

<style scoped>
.logo-hover {
    transition: transform 0.3s ease;
}

.logo-hover:hover {
    transform: scale(1.05);
}

.support-btn {
    transition: all 0.3s ease;
}

.support-btn:hover {
    transform: rotate(15deg);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

:deep(.v-footer) {
    border-top: 1px solid var(--v-border-color);
}
</style>