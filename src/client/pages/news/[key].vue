<template>
  {{ news }}
</template>

<script setup>
const route = useRoute()
const news = ref(undefined)

const get = async () => {
  try {
    const data = await useAPI('news/get', {
      key: route.params.key
    })
    news.value = data
  }
  catch (e){

  }
}

get()
</script>