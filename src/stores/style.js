import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'

export const useStyleStore = defineStore('style', () => {
  const localUser = useStorage('localUser', {
    textColor: 'black',
    backgroundColor: 'white',
    image: '/public/loadingLight.gif'
  })

  const darkMode = () => {
    try {
      localUser.value.textColor = 'white'
      localUser.value.backgroundColor = '#131316'
      localUser.value.image = '/public/loadingDark.gif'
    } catch (error) {
      console.error(error)
    }
  }

  const whiteMode = () => {
    try {
      localUser.value.textColor = '#131316'
      localUser.value.backgroundColor = 'white'
      localUser.value.image = '/public/loadingLight.gif'
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
