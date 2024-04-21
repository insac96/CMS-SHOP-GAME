<template>
  <UiFlex justify="between" class="
    sticky top-0
    bg-white/75 dark:bg-transparent
    backdrop-blur-xl
    shadow-sm dark:shadow-xl
    h-[var(--layout-default-header-size)] max-h-[var(--layout-default-header-size)]
    px-2
  ">
    <!-- Left -->
    <UiFlex class="mr-1">
      <!-- Logo -->
      <NuxtLink to="/"><UiLogo class="mr-4 hidden md:flex"/></NuxtLink>
      <!-- Nav Toogle -->
      <LayoutDefaultNavToggle class="mr-1"/>
      <!-- Search -->
      <LayoutDefaultHeaderSearch />
    </UiFlex>

    <!-- Right -->
    <UiFlex>
      <!-- Auth -->
      <Auth />
    </UiFlex>
  </UiFlex>
</template>