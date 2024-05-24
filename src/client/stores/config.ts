import { defineStore } from 'pinia'
import type { IDBConfigStore } from '~~/types'

export const useConfigStore = defineStore('config', () => {
  const config : IDBConfigStore = reactive({
    name: '...',
    short_name: '...',
    description: '...',
    image: {
      og: '',
      app: '',
      logo: '',
    },

    contact: {
      name: '',
      phone: '',
      email: '',
      address: '',
      prefix: '',
    },
  
    social: {
      fanpage: '',
      group: '',
      messenger: '',
      zalo: '',
      tiktok: '',
      telegram: '',
    },
  
    vip: {
      month: 0,
      quarter : 0,
      year: 0,
      forever: 0
    },

    facebook: {
      client_id: '',
      client_version: '',
      client_verify: '',
    },

    google: {
      client_id: '',
      client_verify: '',
    },

    tiktok: {
      client_id: '',
      client_verify: '',
    },
    
    zalo: {
      client_id: '',
      client_verify: '',
    }
  })

  const bootConfig = async () => {
    const cfg : IDBConfigStore = await useAPI('config/get')
    Object.assign(config, cfg)
  }

  return { config, bootConfig }
})