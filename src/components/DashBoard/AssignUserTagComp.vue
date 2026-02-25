<script setup>
import { reactive, watch } from 'vue';
import { useUsersStore, useTagsStore } from '@/stores';
import { AlertOutline } from '../icons';

const usersStore = useUsersStore();
const tagsStore = useTagsStore();

const props = defineProps({
  isOpen: Boolean,
  objectSelected: Object,
});

const emit = defineEmits(["update:isOpen"]);

const closeModal = () => {
  emit("update:isOpen", false);
};

const data = reactive({
  rfid: null,
  userId: 0,
});

watch(
  () => props.objectSelected,
  (newVal) => {
    data.rfid = String(newVal?.rfid) || null;
    data.userId = 0;
  },
  { immediate: true }
);

const handleAssign = async () => {
  await tagsStore.assignTag(data);
  closeModal();
};
</script>

<template>
  <v-dialog :model-value="isOpen" @update:model-value="emit('update:isOpen', $event)" max-width="500"
    transition="dialog-bottom-transition" persistent>
    <v-card class="rounded-lg">
      <v-card-item>
        <div class="d-flex align-center mb-4">
          <v-avatar color="info" class="mr-4">
            <AlertOutline :size="24" color="white" />
          </v-avatar>
          <v-card-title class="text-h6">
            Atribuir Tag a Usuário
          </v-card-title>
          <v-spacer></v-spacer>
          <v-btn icon variant="text" @click="closeModal">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>

        <v-card-subtitle class="text-center pb-0">
          Selecione o usuário para atribuir esta tag.
        </v-card-subtitle>

        <v-card-text class="pt-4">
          <v-list>
            <v-list-item>
              <template v-slot:prepend>
                <v-icon color="primary" icon="mdi-pound" />
              </template>
              <v-list-item-title>Id da Tag</v-list-item-title>
              <v-list-item-subtitle>{{ objectSelected?.id }}</v-list-item-subtitle>
            </v-list-item>

            <v-list-item>
              <template v-slot:prepend>
                <v-icon color="primary" icon="mdi-card-bulleted" />
              </template>
              <v-list-item-title>RFID</v-list-item-title>
              <v-list-item-subtitle>{{ objectSelected?.rfid }}</v-list-item-subtitle>
            </v-list-item>

            <v-list-item>
              <template v-slot:prepend>
                <v-icon :color="objectSelected?.valid ? 'success' : 'error'"
                  :icon="objectSelected?.valid ? 'mdi-check-circle' : 'mdi-close-circle'" />
              </template>
              <v-list-item-title>Status</v-list-item-title>
              <v-list-item-subtitle>
                <v-chip :color="objectSelected?.valid ? 'success' : 'error'" size="small">
                  {{ objectSelected?.valid ? 'Ativo' : 'Desativado' }}
                </v-chip>
              </v-list-item-subtitle>
            </v-list-item>
          </v-list>

          <v-select v-model="data.userId" :items="usersStore.state.users?.data?.users || []" item-title="name"
            item-value="id" label="Selecionar Usuário" prepend-inner-icon="mdi-account" variant="outlined"
            class="mt-4" />
        </v-card-text>
      </v-card-item>

      <v-divider></v-divider>

      <v-card-actions class="pa-4">
        <v-spacer></v-spacer>
        <v-btn color="warning" variant="tonal" prepend-icon="mdi-account-remove"
          @click="tagsStore.unassignTag(props.objectSelected?.id)" class="text-none">
          Desvincular
        </v-btn>
        <v-btn color="primary" :disabled="!data.userId" @click="handleAssign" class="text-none"
          prepend-icon="mdi-account-plus">
          Atribuir
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
