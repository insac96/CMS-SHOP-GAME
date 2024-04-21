import { defineStore } from 'pinia'
import type { IDBUserStore } from '~~/types'

export const useAuthStore = defineStore('auth', () => {
  const modal = ref(false)
  const isLogin = ref(false)
  const profile : Ref<IDBUserStore | undefined> = ref(undefined)

  function setModal (data : boolean) {
    modal.value = data
  }

  function setAuth (data : IDBUserStore | null) {
    if(!data){
      isLogin.value = false
      profile.value = undefined
    }
    else {
      isLogin.value = true
      profile.value = data
    }
  }

  async function getAuth () {
    try {
      const auth = await useAPI('auth/get')
      setAuth(auth)
      return Promise.resolve()
    }
    catch (e) {
      return Promise.reject(e)
    }
  }

  async function delAuth () {
    try {
      await useAPI('auth/sign/out')
      setAuth(null)
      return Promise.resolve()
    }
    catch (e) {
      return Promise.reject(e)
    }
  }

  return { modal, isLogin, profile, setModal, setAuth, getAuth, delAuth }
})