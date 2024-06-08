<template>
  <div>
    <DataEmpty text="Vui lòng đăng nhập trước" icon="i-bx-credit-card" v-if="!authStore.isLogin" />
    
    <div v-else>
      <UForm ref="form" :state="state" :validate="validate" @submit="submit">
        <UFormGroup label="Đơn hàng" name="game">
          <UInput :value="game.name" readonly />
        </UFormGroup>

        <UFormGroup label="Giá tiền" name="game">
          <UInput :value="useMoney().toMoney(price)+' VNĐ'" readonly />
        </UFormGroup>

        <UFormGroup label="Kênh thanh toán" name="gate">
          <SelectGate v-model="state.gate" />
        </UFormGroup>

        <UiFlex justify="between" class="mt-4">
          <UButton color="gray" @click="modal.history = true">Lịch sử</UButton>
          <UButton type="submit" :loading="loading">Xác nhận</UButton>
        </UiFlex>
      </UForm>

      <UModal v-model="modal.view" prevent-close>
        <ServiceOrderView :fetch-id="order" class="p-4"/>

        <UiFlex justify="end" class="px-4 pb-4">
          <UButton color="gray" @click="modal.view = false, emits('done')">Đóng</UButton>
        </UiFlex>
      </UModal>

      <UModal v-model="modal.history" :ui="{ width: 'lg:max-w-4xl md:max-w-2xl sm:max-w-xl' }">
        <ServiceOrderHistory />
      </UModal>
    </div>
  </div>
</template>

<script setup>
const { dayjs } = useDayJs()
const authStore = useAuthStore()
const props = defineProps(['game'])
const emits = defineEmits(['done'])

const form = ref()
const loading = ref(false)
const order = ref(undefined)

const modal = ref({
  view: false,
  history: false
})

const state = ref({
  gate: null,
  game: props.game._id
})

const price = computed(() => {
  const userVip = authStore.profile.vip
  const gamePrice = props.game.price

  if(userVip.forever.enable == true) return gamePrice.vip.forever
  if(userVip.month.enable == true) {
    const end = dayjs(userVip.month.end).unix()
    const now = dayjs(Date.now()).unix()
    if(end >= now) return gamePrice.vip.month
    else gamePrice.vip.member
  }
  return gamePrice.vip.member
})

const validate = (st) => {
  const errors = []
  if (!st.gate) errors.push({ path: 'gate', message: 'Vui lòng chọn kênh nạp' })
  return errors
}

const submit = async () => {
  try {
    loading.value = true
    const data = await useAPI('order/create', JSON.parse(JSON.stringify(state.value)))

    order.value = data
    modal.value.view = true
    loading.value = false
  }
  catch (e) {
    loading.value = false
  }
}

</script>