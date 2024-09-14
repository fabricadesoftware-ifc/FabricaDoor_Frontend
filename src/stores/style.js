import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'

export const useStyleStore = defineStore('style', () => {
  const localUser = useStorage('localUser', {
    textColor: 'black',
    backgroundColor: '#131316'
  })

  const darkMode = () => {
    try {
      localUser.value.textColor = 'white'
      localUser.value.backgroundColor = '#131316'
      console.log(localUser.value)
    } catch (error) {
      console.error(error)
    }
  }

  const whiteMode = () => {
    try {
      localUser.value.textColor = '#131316'
      localUser.value.backgroundColor = 'white'
      console.log(localUser.value)
    } catch (error) {
      console.error(error)
    }
  }

  return {
    localUser,
    darkMode,
    whiteMode
  }
})
