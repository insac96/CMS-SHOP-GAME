<template>
  <UiFlex>
    <UInput icon="i-bx-search" size="md" placeholder="Tìm kiếm" readonly class="hidden md:inline-block" />
    <UButton color="gray" size="md" icon="i-bx-search" class="md:hidden" />
  </UiFlex>
</template>

<script setup>
const query = ref(null)
</script>