<template>
  {{ game }}
</template>

<script setup>
const route = useRoute()
const game = ref(undefined)

const get = async () => {
  try {
    const data = await useAPI('game/get', {
      key: route.params.key
    })
    game.value = data
  }
  catch (e){

  }
}

get()
</script>