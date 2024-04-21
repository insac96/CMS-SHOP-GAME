<template>
  <USelectMenu 
    v-model="type" 
    size="lg" 
    value-attribute="value"
    :options="[
      { label: 'Ngân hàng', value: 'BANK' },
      { label: 'Momo', value: 'MOMO' }
    ]"
  >
    <template #label>
      <UiText mini>
        <span v-if="!type">Chọn loại kênh</span>
        <span v-else-if="type == 'BANK'">Ngân hàng</span>
        <span v-else-if="type == 'MOMO'">Momo</span>
      </UiText>
    </template>
  </USelectMenu>
</template>

<script setup>
const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])

const type = ref(props.modelValue)
watch(type, (value) => {
  emit('update:modelValue', value)
})
</script>