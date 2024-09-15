import { reactive, computed } from 'vue';
import { defineStore } from 'pinia';
import { TagsService } from '@/services';

export const useTagsStore = defineStore('tags', () => {
  const state = reactive({
    tags: [],  // Deve ser um array
    loading: false,
    error: null
  });

  const isLoading = computed(() => state.loading);

  const getTags = async () => {
    state.loading = true;
    try {
      // Assumindo que TagsService.getTags retorna um objeto com uma propriedade 'data' que é um array
      const response = await TagsService.getTags();
      state.tags = response.data || []; // Garanta que seja um array
    } catch (error) {
      state.error = error;
    } finally {
      state.loading = false;
    }
  };

  const createTags = async (newTag) => {
    state.loading = true;
    try {
      const createdTag = await TagsService.createTags(newTag);
      state.tags.push(createdTag);  // Adiciona diretamente ao array de tags
    } catch (error) {
      state.error = error;
    } finally {
      state.loading = false;
    }
  };

  const updateTags = async (tag) => {
    state.loading = true;
    try {
      const index = state.tags.findIndex((s) => s.id === tag.id); // Corrige para usar `state.tags`
      if (index !== -1) {
        state.tags[index] = await TagsService.updateTags(tag);
      }
    } catch (error) {
      state.error = error;
    } finally {
      state.loading = false;
    }
  };

  const deleteTags = async (id) => {
    state.loading = true;
    try {
      const index = state.tags.findIndex((s) => s.id === id); // Corrige para usar `state.tags`
      if (index !== -1) {
        state.tags.splice(index, 1); // Remove do array
      }
      await TagsService.deleteTags(id);
    } catch (error) {
      state.error = error;
    } finally {
      state.loading = false;
    }
  };

  return {
    state,
    isLoading,
    getTags,
    createTags,
    updateTags,
    deleteTags
  };
});
