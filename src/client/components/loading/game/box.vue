<template>
  <UCard
    :ui="{ 
      base: 'relative transition-all ',
      rounded: 'rounded-xl',
      shadow: 'shadow-md hover:shadow-lg',
      divide: '',
      ring: 'dark:ring-1 ring-0',
      body: { padding: 'p-0 sm:p-0' },
      footer: { padding: 'pb-2 sm:pb-2 pt-0 sm:pt-0', base: 'border-none' }
    }"
  > 
    <div style="aspect-ratio: 16 / 9">
      <USkeleton class="w-full h-full rounded-none" />
    </div>

    <div class="px-4 py-4">
      <USkeleton class="w-32 h-4 mb-1" />
      <USkeleton class="w-full h-4" />
    </div>

    <template #footer>
      <UiFlex justify="between">
        <USkeleton class="w-12 h-4" />
        <USkeleton class="w-14 h-4" />
      </UiFlex>
    </template>
  </UCard>
</template>