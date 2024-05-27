<template>
  <ServiceGameList v-if="os" :title="os.name" menu="os" :type="os.key" />
</template>

<script setup>
const configStore = useConfigStore()
const route = useRoute()
const os = ref(undefined)

// Meta Seo
useSeoMeta({
  title: () => os.value ? `Hệ Điều Hành ${os.value.name} - ${configStore.config.name}` : 'Loading...',
  ogTitle: () => os.value ? `Hệ Điều Hành ${os.value.name} - ${configStore.config.name}` : 'Loading...',
})

const get = async () => {
  try {
    const data = await useAPI('game/os/get', {
      key: route.params.os
    })
    os.value = data
  }
  catch (e){

  }
}

get()
</script>