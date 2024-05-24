<template>
  <div>
    <DataEmpty text="Vui lòng đăng nhập trước" icon="i-bx-credit-card" v-if="!authStore.isLogin" />
    
    <div v-else>
      <UForm ref="form" :state="state" :validate="validate" @submit="submit">
        <UFormGroup label="Gói nâng cấp" name="vip">
          <UInput :value="vip.title" readonly />
        </UFormGroup>

        <UFormGroup label="Giá tiền" name="price">
          <UInput :value="useMoney().toMoney(vip.price)+' VNĐ'" readonly />
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
        <ServiceVipView :fetch-id="order" class="p-4"/>

        <UiFlex justify="end" class="px-4 pb-4">
          <UButton color="gray" @click="modal.view = false, emits('done')">Đóng</UButton>
        </UiFlex>
      </UModal>

      <UModal v-model="modal.history" :ui="{ width: 'lg:max-w-4xl md:max-w-2xl sm:max-w-xl' }">
        <ServiceVipHistory />
      </UModal>
    </div>
  </div>
</template>

<script setup>
const authStore = useAuthStore()
const props = defineProps(['vip'])
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
  vip: props.vip.type
})

const validate = (st) => {
  const errors = []
  if (!st.gate) errors.push({ path: 'gate', message: 'Vui lòng chọn kênh nạp' })
  return errors
}

const submit = async () => {
  try {
    loading.value = true
    const data = await useAPI('vip/buy', JSON.parse(JSON.stringify(state.value)))

    order.value = data
    modal.value.view = true
    loading.value = false
  }
  catch (e) {
    loading.value = false
  }
}

</script>