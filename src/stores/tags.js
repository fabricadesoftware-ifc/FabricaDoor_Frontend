import { reactive, computed } from 'vue'
import { defineStore } from 'pinia'
import { TagsService } from '@/services'

export const useTagsStore = defineStore('tags', () => {
  const state = reactive({
    tags: [],
    loading: false,
    error: null
  })
  const isLoading = computed(() => state.loading)

  const getTags = async () => {
    state.loading = true
    try {
      state.tags = await TagsService.getTags()
    } catch (error) {
      state.error = error
    } finally {
      state.loading = false
    }
  }

  const createTags = async (newTag) => {
    state.loading = true
    try {
      state.tags.push(await TagsService.createTags(newTag))
    } catch (error) {
      state.error = error
    } finally {
      state.loading = false
    }
  }

  const updateTags = async (tag) => {
    state.loading = true
    try {
      const index = state.tags.results.findIndex((s) => s.id === tag.id)
      state.tags[index] = await TagsService.updateTags(tag)
    } catch (error) {
      state.error = error
    } finally {
      state.loading = false
    }
  }

  const deleteTags = async (id) => {
    state.loading = true
    try {
      const index = state.stock.findIndex((s) => s.id === id)
      state.tags.splice(index, 1)
      const result = await TagsService.deleteTags(id)
      console.log(result)
    } catch (error) {
      state.error = error
    } finally {
      state.loading = false
    }
  }

  return {
    state,
    isLoading,
    getTags,
    createTags,
    updateTags,
    deleteTags
  }
})
