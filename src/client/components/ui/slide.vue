<template>
  <UCarousel 
    v-if="images"
    v-slot="{ item }" 
    :items="images" 
    :ui="{ item: 'basis-full', container: 'rounded-xl' }"
    :prev-button="{
      icon: 'i-bx-chevrons-left',
    }"
    :next-button="{
      icon: 'i-bx-chevrons-right',
    }"
    class="rounded-xl overflow-hidden"
    indicators
    arrows
    ref="carouselRef"
  >
    <img :src="item" class="w-full">
  </UCarousel>
</template>

<script setup>
const props = defineProps({
  images: Array,
  auto: {
    type: Boolean,
    default: true
  }
})
const carouselRef = ref()

onMounted(() => {
  if(!props.auto) return

  setInterval(() => {
    if (!carouselRef.value) return

    if (carouselRef.value.page === carouselRef.value.pages) {
      return carouselRef.value.select(0)
    }

    carouselRef.value.next()
  }, 3000)
})
</script>