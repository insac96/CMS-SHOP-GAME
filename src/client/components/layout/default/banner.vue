
<template>
  <div class="
    ServiceHomeBanner 
    relative 
    overflow-hidden
    rounded-2xl 
    shadow-2xl dark:shadow-none
  ">
    <!-- Image -->
    <UiImg 
      src="https://www.pixel4k.com/wp-content/uploads/2021/04/pubg-open-world-fight-4k_1618136794.jpg.webp"
      class="
        !absolute
        w-full h-full
        top-0 left-0
      "
      ratio="16 / 9"
    />

    <!-- Overlay -->
    <div class="
      absolute 
      w-full h-full 
      top-0 left-0
      bg-black/50
      dark:bg-black/60
    "></div>

    <!-- Content -->
    <UiFlex 
      type="col" 
      items="start" 
      justify="center"
      class="
        relative
        w-full h-full 
        p-20
        aspect-auto
      "
    >
      <!-- Name -->
      <UiText 
        weight="bold" 
        color="primary" 
        class="xl:text-5xl md:text-4xl text-2xl mb-2"
      >
        ENI Shop
      </UiText>

      <!-- Description -->
      <UiText 
        weight="semibold" 
        class="xl:text-2xl md:text-xl text-base text-white dark:text-gray-300 md:max-w-xl"
      >
        Kênh bán game uy tín số 1 Việt Nam
      </UiText>
      
      <!-- Statical -->
      <UiFlex class="mt-6 space-x-8 text-white dark:text-gray-300">
        <div>
          <UiText size="sm">Trò chơi</UiText>
          <UiText size="xl" weight="bold">10</UiText>
        </div>

        <div>
          <UiText size="sm">Thành viên</UiText>
          <UiText size="xl" weight="bold">1.000</UiText>
        </div>

        <div>
          <UiText size="sm">Trực tuyến</UiText>
          <UiText size="xl" weight="bold">500</UiText>
        </div>
      </UiFlex>

      <!-- About -->
      <UButton class="mt-6" size="md">Xem Thêm</UButton>
    </UiFlex>
  </div>
</template>

<style lang="sass">
.dark
  .ServiceHomeBanner
    -webkit-mask: linear-gradient(0deg, transparent, #fff 40%)
    mask: linear-gradient(0deg, transparent, #fff 40%)
</style> 