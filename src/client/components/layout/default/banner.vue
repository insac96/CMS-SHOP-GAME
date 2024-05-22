
<template>
  <div v-if="banner" class="
    ServiceHomeBanner 
    relative 
    overflow-hidden
    rounded-2xl 
    shadow-2xl dark:shadow-none
  ">
    <!-- Image -->
    <UiImg 
      :src="banner.config.image.og || '/images/default-banner.webp'"
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
        {{ banner.config.name || 'ENI Shop' }}
      </UiText>

      <!-- Description -->
      <UiText 
        weight="semibold" 
        class="xl:text-2xl md:text-xl text-base text-gray-300 md:max-w-xl"
      >
        {{ banner.config.description || 'Kênh bán game uy tín số 1 Việt Nam' }}
      </UiText>
      
      <!-- Statical -->
      <UiFlex class="mt-6 gap-8 text-gray-300" wrap>
        <div>
          <UiText size="sm">Trò chơi</UiText>
          <UiText size="xl" weight="bold">{{ banner.game }}</UiText>
        </div>

        <div>
          <UiText size="sm">Thành viên</UiText>
          <UiText size="xl" weight="bold">{{ banner.user }}</UiText>
        </div>

        <div>
          <UiText size="sm">Đơn hàng</UiText>
          <UiText size="xl" weight="bold">{{ banner.order }}</UiText>
        </div>

        <div>
          <UiText size="sm">Trực tuyến</UiText>
          <UiText size="xl" weight="bold">{{ 149 }}</UiText>
        </div>
      </UiFlex>

      <!-- About -->
      <UButton class="mt-6" size="md">Xem Thêm</UButton>
    </UiFlex>
  </div>
</template>

<script setup>
const banner = ref(undefined)

const getBanner = async () => {
  try {
    const data = await useAPI('config/banner')
    banner.value = data
  }
  catch (e){
  }
}

getBanner()
</script>

<style lang="sass">
.dark
  .ServiceHomeBanner
    -webkit-mask: linear-gradient(0deg, transparent, #fff 40%)
    mask: linear-gradient(0deg, transparent, #fff 40%)
</style> 