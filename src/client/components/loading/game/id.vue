<template>
  <div class="w-full">
    <div class="grid grid-cols-12 gap-4 mb-2">
      <!-- Left -->
      <div class="lg:col-span-7 col-span-12">
        <div style="aspect-ratio: 16 / 9">
          <USkeleton class="w-full h-full rounded-xl shadow-md" />
        </div>
      </div>
      
      <!-- Right -->
      <div class="lg:col-span-5 col-span-12">
        <!-- Name - Info -->
        <div class="mb-2">
          <USkeleton class="w-48 h-8 mb-1" />
          <USkeleton class="w-full h-8" />
        </div>
      </div>
    </div>

    <div>
      <USkeleton class="w-full h-10 mb-2" />
      <USkeleton class="w-full h-24 mb-2" />
      <USkeleton class="w-full h-5" />
    </div>
  </div>
</template>