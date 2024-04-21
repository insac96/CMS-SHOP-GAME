<template>
  <ServiceGameList v-if="platform" :title="platform.name" menu="platform" :type="platform.key" />
</template>

<script setup>
const route = useRoute()
const platform = ref(undefined)

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