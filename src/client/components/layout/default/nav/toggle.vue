<template>
  <UiFlex class="md:hidden">
    <UButton color="gray" size="md" icon="i-bx-menu-alt-left" @click="open = true"/>

    <USlideover v-model="open" side="left" :ui="{ width: 'max-w-[var(--layout-default-nav-size)]' }">
      <LayoutDefaultNav />
    </USlideover>
  </UiFlex>
</template>

<script setup>
const open = ref(false)
</script>