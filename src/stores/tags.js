import { reactive, computed, ref, watch } from 'vue'
import { defineStore } from 'pinia'
import { TagsService } from '@/services'
import { useAuthStore } from './auth'
import router from '@/router'
import { toast } from 'vue3-toastify'

export const useTagsStore = defineStore('tags', () => {
  const state = reactive({
    tags: [],
    myTags: [],
    loading: ref(false),
    error: null
  })
  const store = useAuthStore()
  const token = store.authUser.token
  const countTags = computed(() => state.tags[0] ? state.tags.length : 0)

  watch(
    () => state.error,
    (value) => {
      if (value) {
        toast.error(value) // Exibe a mensagem de erro no toast
      }
    }
  )

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

  const assignTag = async (data) => {
    try{
      console.log(data)
      const response = await TagsService.assignTag(token, data)
      console.log(response.data)
      return response.data
    }
    catch (error) {
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
      router.go(0)
    } catch (error) {
      state.error = error
    } finally {
      state.loading = false
    }
  }

  const verifyTag = async (tagId) =>{
    state.loading = true
    try {
      const response = await TagsService.verifyTag(token, tagId)
      router.go(0)
      return response.data
    } catch (error) {
      state.error = error
    } finally {
      state.loading = false
    }
  }

  return {
    state,
    isLoading,
    countTags,
    verifyTag,
    getTags,
    getMyTags,
    updateTags,
    deleteTags,
    assignTag
  }
})
