<template>
  <div class="max-w-4xl mx-auto">
    <div v-if="loading || !game">Loading...</div>
    
    <div v-else>
      <!-- Info -->
      <div class="grid grid-cols-12 gap-4 mb-4">
        <!-- Left -->
        <div class="lg:col-span-7 col-span-12">
          <UiSlide :images="slideList" />
        </div>
        
        <!-- Right -->
        <div class="lg:col-span-5 col-span-12">
          <!-- Name - Info -->
          <div class="mb-2">
            <UiText color="primary" size="lg" weight="bold">{{ game.name }}</UiText>
            <UiText color="gray">{{ game.description }}</UiText>
          </div>

          <!-- Tag -->
          <UiFlex justify="between" class="mb-4">
            <UiFlex class="gap-0.5" wrap>
              <UBadge color="gray" class="cursor-pointer" @click="navigateTo(`/game/os/${game.os.key}`)">{{ game.os.key }}</UBadge>
              <UBadge color="gray" class="cursor-pointer" @click="navigateTo(`/game/platform/${game.platform.key}`)">{{ game.platform.key }}</UBadge>
              <UBadge color="gray" class="cursor-pointer" @click="navigateTo(`/game/category/${game.category.key}`)">{{ game.category.key }}</UBadge>
            </UiFlex>

            <UiFlex class="gap-2">
              <UiFlex class="gap-1">
                <UiIcon size="3" color="gray" name="i-ion-eye"></UiIcon>
                <UiText size="xs">{{ game.view || 0 }}</UiText>
              </UiFlex>

              <UiFlex class="gap-1">
                <UiIcon size="3" color="gray" name="i-bxs-cart-download"></UiIcon>
                <UiText size="xs">{{ game.order || 0 }}</UiText>
              </UiFlex>
            </UiFlex>
          </UiFlex>

          <!-- Info Buy -->
          <div>
            <UiFlex justify="between" class="mb-4">
              <UiText size="sm" color="gray">Cập nhật cuối</UiText>
              <UiText size="sm" weight="semibold">{{ useDayJs().displayDate(game.updatedAt) }}</UiText>
            </UiFlex>

            <UiFlex justify="between" class="mb-4">
              <UiText size="sm" color="gray">Thành viên</UiText>
              <UiText size="sm" weight="semibold">{{ useMoney().toMoney(game.price.member) }}đ</UiText>
            </UiFlex>

            <UiFlex justify="between" class="mb-4">
              <UiText size="sm" color="gray">VIP tháng</UiText>
              <UiText size="sm" weight="semibold">{{ useMoney().toMoney(game.price.vip.month) }}đ</UiText>
            </UiFlex>

            <UiFlex justify="between" class="mb-4">
              <UiText size="sm" color="gray">VIP trọn đời</UiText>
              <UiText size="sm" color="red" weight="semibold">{{ useMoney().toMoney(game.price.vip.forever) }}đ</UiText>
            </UiFlex>
          </div>

          <!-- Button -->
          <UiFlex justify="end" class="gap-0.5">
            <UButton @click="modal.buy = true">Mua Ngay</UButton>
            <UButton @click="useNotify().error('Tính năng sắp ra mắt')" color="red">Nâng Cấp VIP</UButton>
          </UiFlex>
        </div>
      </div>

      <!-- Content -->
      <div>
        <UDivider label="Mô Tả Chi Tiết" class="mb-4" />
        <div class="mb-4 w-full">
          <DataEditor :content="game.content" empty="Chưa có nội dung"></DataEditor>
        </div>
      </div>
    </div>

    <UModal v-model="modal.buy">
      <div class="m-4">
        <ServiceOrderBuy :game="game" @done="modal.buy = false"></ServiceOrderBuy>
      </div>
    </UModal>
  </div>
</template>

<script setup>
const route = useRoute()
const loading = ref(false)
const game = ref(undefined)

const modal = ref({
  buy: false,
  vip: false
})

const slideList = computed(() => {
  if(!game.value) return []
  if(game.value.images.length == 0) {
    const l = []
    l.push(game.value.og_image)
    return l
  }
  return game.value.images
})

const getGame = async () => {
  try {
    loading.value = true
    const data = await useAPI('game/get', {
      key: route.params.key
    })

    loading.value = false
    game.value = data
  }
  catch (e){
    loading.value = false
  }
}

getGame()
</script>