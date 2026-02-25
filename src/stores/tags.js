import { reactive, computed, ref, watch } from 'vue'
import { defineStore } from 'pinia'
import { TagsService } from '@/services'
import router from '@/router'
import { toast } from 'vue3-toastify'

export const useTagsStore = defineStore('tags', () => {
  const state = reactive({
    tags: [],
    myTags: [],
    loading: ref(false),
    error: null
  })

  const countTags = computed(() => (state.tags[0] ? state.tags.length : 0))

  watch(
    () => state.error,
    (value) => {
      if (value) {
        toast.error(value)
      }
    }
  )

  const isLoading = computed(() => state.loading)

  const getTags = async () => {
    state.loading = true
    try {
      const response = await TagsService.getTags()
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
      const response = await TagsService.getTags()
      const myTags = response.data.filter((tag) => tag.user_id === myId)
      state.myTags = myTags || []
    } catch (error) {
      state.error = error
    } finally {
      state.loading = false
    }
  }

  const assignTag = async (data) => {
    try {
      const response = await TagsService.assignTag(data)
      return response.data
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
        state.tags[index] = await TagsService.updateTags(tag.id, tag)
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
      await TagsService.deleteTags(id)
      router.go(0)
    } catch (error) {
      state.error = error
    } finally {
      state.loading = false
    }
  }

  const verifyTag = async (tagId) => {
    state.loading = true
    try {
      const response = await TagsService.verifyTag(tagId)
      router.go(0)
      return response.data
    } catch (error) {
      state.error = error
    } finally {
      state.loading = false
    }
  }

  const unassignTag = async (id) => {
    state.loading = true
    try {
      const response = await TagsService.unassignTag(id)
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
    assignTag,
    unassignTag
  }
})
