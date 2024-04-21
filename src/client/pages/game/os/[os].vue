<template>
  <ServiceGameList v-if="os" :title="os.name" menu="os" :type="os.key" />
</template>

<script setup>
const route = useRoute()
const os = ref(undefined)

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