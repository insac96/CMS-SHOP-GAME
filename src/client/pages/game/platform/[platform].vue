<template>
  <ServiceGameList v-if="platform" :title="platform.name" menu="platform" :type="platform.key" />
</template>

<script setup>
const configStore = useConfigStore()
const route = useRoute()
const platform = ref(undefined)

// Meta Seo
useSeoMeta({
  title: () => platform.value ? `Nền Tảng ${platform.value.name} - ${configStore.config.name}` : 'Loading...',
  ogTitle: () => platform.value ? `Nền Tảng ${platform.value.name} - ${configStore.config.name}` : 'Loading...',
})

const get = async () => {
  try {
    const data = await useAPI('game/platform/get', {
      key: route.params.platform
    })
    platform.value = data
  }
  catch (e){

  }
}

get()
</script>