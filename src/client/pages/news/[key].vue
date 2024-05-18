<template>
  <div v-if="loading || !news">Loading...</div>
  <div v-else>{{ news }}</div>
</template>

<script setup>
const route = useRoute()
const loading = ref(false)
const news = ref(undefined)

const getNews = async () => {
  try {
    loading.value = true
    const data = await useAPI('news/get', {
      key: route.params.key
    })

    loading.value = false
    news.value = data
  }
  catch (e){
    console.log(e)
    loading.value = false
  }
}

getNews()
</script>