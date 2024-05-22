<template>
  <UiFlex type="col" class="h-full">
    <!-- Logo -->
    <UiFlex 
      justify="center" 
      class="
        w-full 
        h-[var(--layout-default-header-size)] 
        max-h-[var(--layout-default-header-size)]
      ">
      <UiLogo class="cursor-pointer" @click="navigateTo('/')" />
    </UiFlex>

    <!--Menu-->
    <div class="w-full grow p-2 md:pt-2 pt-0">
      <LayoutDefaultNavMenu />
    </div>

    <!--Support-->
    <div class="w-full p-2">
      <LayoutDefaultSupport />
    </div>
  </UiFlex>
</template>

<script setup>
</script>