<template>
  <div class="max-w-2xl mx-auto">
    <UDivider class="mt-2 mb-4">
      <UiImg src="/images/icon/vip.png" w="50px" h="50px" />
    </UDivider>

    <div class="max-w-2xl mx-auto grid grid-cols-12 gap-4">
      <div class="md:col-span-6 col-span-12" v-for="(item, index) in list" :key="index">
        <UCard class="BoxVip shadow-lg cursor-pointer select-none" :ui="{
          header: {
            background: item.bg
          },
          background: 'bg-gray-50 dark:bg-gray-800'
        }" @click="select(item)">
          <template #header>
            <UiFlex type="col" justify="center">
              <UiText align="center" weight="bold" size="lg">{{  item.title }}</UiText>
              <UiText align="center" size="sm">{{ item.des }}</UiText>
            </UiFlex>
          </template>

          <UiText align="center" weight="bold" :color="item.color" size="3xl" class="my-6">{{ useMoney().toMoney(item.price) }}đ</UiText>

          <UDivider label="Đặc Quyền" class="mb-2"></UDivider>

          <UiFlex type="col" justify="center">
            <UiText align="center" size="sm" color="gray" v-for="(info, i) in item.info" key="i">{{ info }}</UiText>
          </UiFlex>
        </UCard>
      </div>
    </div>

    <UModal v-model="modal">  
      <div class="m-4">
        <ServiceVipBuy :vip="selectVip" @done="modal = false" />
      </div>
    </UModal>
  </div>
</template>

<script setup>
const configStore = useConfigStore()

// Meta Seo
useSeoMeta({
  title: () => `Nâng Cấp VIP - ${configStore.config.name}`,
  ogTitle: () => `Nâng Cấp VIP - ${configStore.config.name}`,
})

const modal = ref(false)
const selectVip = ref(false)

const list = ref([
  {
    title: 'VIP Trọn Đời',
    des: 'Không cần kích hoạt lại',
    price: configStore.config.vip.forever,
    info: [
      'Nhận vĩnh viễn VIP trọn đời',
      'Mở khóa các tài nguyên giới hạn',
      'Miễn phí hoặc giảm giá tài nguyên'
    ],
    type: 'forever',
    bg: 'bg-sky-800',
    color: 'sky'
  },
  {
    title: 'VIP Tháng',
    des: 'Phí gia hạn 1 tháng',
    price: configStore.config.vip.month,
    info: [
      'Đặc quyền VIP 30 ngày',
      'Mở khóa các tài nguyên giới hạn',
      'Giảm giá mua các tài nguyên'
    ],
    type: 'month',
    bg: 'bg-rose-500',
    color: 'rose'
  },
  {
    title: 'VIP Quý',
    des: 'Phí gia hạn 3 tháng',
    price: configStore.config.vip.quarter,
    info: [
      'Đặc quyền VIP 90 ngày',
      'Mở khóa các tài nguyên giới hạn',
      'Giảm giá mua các tài nguyên'
    ],
    type: 'quarter',
    bg: 'bg-lime-600',
    color: 'lime'
  },
  {
    title: 'VIP Năm',
    des: 'Phí gia hạn 1 năm',
    price: configStore.config.vip.year,
    info: [
      'Đặc quyền VIP 1 năm',
      'Mở khóa các tài nguyên giới hạn',
      'Giảm giá mua các tài nguyên'
    ],
    type: 'year',
    bg: 'bg-orange-600',
    color: 'orange'
  },
])

const select = (vip) => {
  selectVip.value = vip
  modal.value = true
}
</script>

<style lang="sass">
.BoxVip
  transition: all 0.25s ease
  &:hover
    transform: scale(0.97)
</style>
