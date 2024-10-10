import { reactive, computed } from 'vue'
import { defineStore } from 'pinia'
import { TagsService } from '@/services'
import { useAuthStore } from './auth'

const store = useAuthStore()
const token = store.authUser.token

export const useTagsStore = defineStore('tags', () => {
  const state = reactive({
    tags: [],
    myTags: [],
    loading: false,
    error: null
  })

  const isLoading = computed(() => state.loading)

  const getTags = async () => {
    state.loading = true
    try {
      const response = await TagsService.getTags(token)
      state.tags = response.data || []
    } catch (error) {
      state.error = error
    } finally {
      state.loading = false
    }
  }

  const getMyTags = async (myId) => {
    state.loading = true
    console.log('aoba')
    console.log(myId)
    try {
      const response = await TagsService.getTags(token)
      console.log(response.data)

      const myTags = response.data.filter((tag) => tag.user_id === myId)
      console.log(myTags)
      state.myTags = myTags || []
    } catch (error) {
      state.error = error
    } finally {
      state.loading = false
    }
  }

  const createTags = async (newTag) => {
    state.loading = true
    try {
      const createdTag = await TagsService.createTags(token, newTag)
      state.tags.push(createdTag)
    } catch (error) {
      state.error = error
    } finally {
      state.loading = false
    }
  }

  const updateTags = async (tag) => {
    state.loading = true
    try {
      const index = state.tags.findIndex((s) => s.id === tag.id)
      if (index !== -1) {
        state.tags[index] = await TagsService.updateTags(token, tag)
      }
    } catch (error) {
      state.error = error
    } finally {
      state.loading = false
    }
  }

  const deleteTags = async (id) => {
    state.loading = true
    try {
      const index = state.tags.findIndex((s) => s.id === id) 
      if (index !== -1) {
        state.tags.splice(index, 1) 
      }
      await TagsService.deleteTags(token, id)
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
    getMyTags,
    createTags,
    updateTags,
    deleteTags
  }
})
