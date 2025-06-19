<script setup>
import { InfoProfile, MyTags } from '..';
import { useTagsStore } from '@/stores';

const tagsStore = useTagsStore();
</script>

<template>
    <v-container class="py-8">
        <v-row justify="center">
            <v-col cols="12" md="8">
                <v-card class="rounded-lg">
                    <v-card-text>
                        <InfoProfile />
                        <v-divider class="my-4"></v-divider>
                        <MyTags />
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<style scoped>
main {
    width: 50%;
    margin: 30px auto;
    border: 1px solid #ccc;
    height: 40vh;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    padding: 1rem;
}

@media screen and (max-width: 1024px) {
    main {
        width: 90%;
        height: 90vh;
    }
}
</style>