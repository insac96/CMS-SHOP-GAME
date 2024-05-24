<template>
  <div class="max-w-5xl mx-auto">
    <div class="grid grid-cols-12 gap-2">
      <div class="lg:col-span-4 col-span-12">
        <ServiceUserBox />
      </div>

      <div class="lg:col-span-8 col-span-12">
        <UTabs v-model="tab" :items="items" />

        <ServiceUserEdit v-if="tab == 0" />
        <ServiceOrderHistory v-if="tab == 1" />
        <ServiceVipHistory v-if="tab == 2" />
      </div>
    </div>
  </div>
</template>

<script setup>
const tab = ref(0)

const items = [{
  label: 'Chỉnh sửa'
}, {
  label: 'Đơn hàng',
}, {
  label: 'Nâng VIP'
}]
</script>