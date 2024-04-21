export default defineNuxtPlugin(() => {
  const API = {
    Upload: {
      Image: 'upload/image'
    }
  }

  return {
    provide: { API: API }
  }
})
  
  