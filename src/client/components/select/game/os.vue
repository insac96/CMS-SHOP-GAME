<template>
  <USelectMenu
    v-model="os"
    :options="options"
    size="lg"
    value-attribute="_id"
    option-attribute="label"
    :disabled="options.length == 0"
    :loading="loading"
  >
    <template #label>
      <UiText mini>{{ select ? select.label : 'Chọn hệ điều hành' }}</UiText>
    </template>
  </USelectMenu>
</template>

<script setup>
const props = defineProps({
  modelValue: String,
  options: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['update:modelValue'])

const loading = ref(true)

const os = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
}) 

const options = ref(props.options)
const select = computed(() => options.value.find(i => i._id === os.value))

const fetch = async () => {
  try {
    loading.value = true
    const list = await useAPI('game/os/select')
    
    options.value = options.value.concat(list.map(i => ({ _id: i._id, label: i.name })))
    loading.value = false
  }
  catch (e) {
    loading.value = false
  }
}
fetch()
</script>