<template>
  <ServiceGameList v-if="category" :title="category.name" menu="category" :type="category.key" />
</template>

<script setup>
const configStore = useConfigStore()
const route = useRoute()
const category = ref(undefined)

// Meta Seo
useSeoMeta({
  title: () => category.value ? `Thể Loại ${category.value.name} - ${configStore.config.name}` : 'Loading...',
  ogTitle: () => category.value ? `Thể Loại ${category.value.name} - ${configStore.config.name}` : 'Loading...',
})

const get = async () => {
  try {
    const data = await useAPI('game/category/get', {
      key: route.params.category
    })
    category.value = data
  }
  catch (e){

  }
}

get()
</script>