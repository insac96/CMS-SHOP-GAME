<template>
  <div class="LayoutDefault">
    <header>
      <LayoutDefaultHeader />
    </header>

    <nav class="shadow-md dark:shadow-xl">
      <LayoutDefaultNav />
    </nav>

    <main class="pt-[var(--layout-default-header-size)]">
      <UContainer class="p-2">
        <slot></slot>

      </UContainer>
    </main>
  </div>
</template>

<style lang="sass">
:root
  --layout-default-header-size: 3.5rem
  --layout-default-nav-size: 200px

.LayoutDefault
  --layout-nav-reponsize: -100%

  position: relative
  height: 100%
  min-height: 100%
  display: grid
  grid-template-columns: 0 1fr
  grid-template-areas: "nav main"

  header
    position: fixed
    top: 0
    left: 0
    width: 100%
    z-index: 1

  nav
    position: fixed
    top: 0
    height: 100%

  nav
    grid-area: nav
    left: var(--layout-nav-reponsize)
    width: var(--layout-default-nav-size)

  main
    position: relative
    grid-area: main

@media (min-width: 768px)
  .LayoutDefault
    --layout-nav-reponsize: 0
    grid-template-columns: var(--layout-default-nav-size) 1fr 0

@media (min-width: 1280px)
  .LayoutDefault
    --layout-nav-reponsize: 0
    grid-template-columns: var(--layout-default-nav-size) 1fr

</style>