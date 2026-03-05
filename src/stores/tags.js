import { reactive, computed, ref, watch } from 'vue'
import { defineStore } from 'pinia'
import { TagsService } from '@/services'
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
      await TagsService.deleteTags(id)
      const index = state.tags.findIndex((s) => s.id === id)
      if (index !== -1) {
        state.tags.splice(index, 1)
      }
      toast.success('Tag removida com sucesso!')
    } catch (error) {
      const message =
        error?.response?.data?.message || error?.response?.data?.error || 'Erro ao remover tag'
      toast.error(message)
    } finally {
      state.loading = false
    }
  }

  const verifyTag = async (tagId) => {
    state.loading = true
    try {
      await TagsService.verifyTag(tagId)
      const index = state.tags.findIndex((t) => t.id === tagId)
      if (index !== -1) {
        state.tags[index] = { ...state.tags[index], valid: !state.tags[index].valid }
      }
      toast.success('Status da tag atualizado!')
      await getTags()
    } catch (error) {
      const message =
        error?.response?.data?.message || error?.response?.data?.error || 'Erro ao atualizar tag'
      toast.error(message)
    } finally {
      state.loading = false
    }
  }

  const unassignTag = async ({ id, rfid, userId }) => {
    state.loading = true
    try {
      await TagsService.unassignTag({ rfid, userId })
      const index = state.tags.findIndex((t) => t.id === id)
      if (index !== -1) {
        state.tags[index] = { ...state.tags[index], user_id: null, user: null }
      }
      state.myTags = state.myTags.filter((t) => t.id !== id)
      toast.success('Tag desvinculada com sucesso!')
      await getTags()
    } catch (error) {
      const message =
        error?.response?.data?.message || error?.response?.data?.error || 'Erro ao desvincular tag'
      toast.error(message)
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
