<template>
  <ServiceNewsList title="Tin Tức" />
</template>

<script setup>
const configStore = useConfigStore()

// Meta Seo
useSeoMeta({
  title: () => `Tin Tức - ${configStore.config.name}`,
  ogTitle: () => `Tin Tức - ${configStore.config.name}`,
})
</script>