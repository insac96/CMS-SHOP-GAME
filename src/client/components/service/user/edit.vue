<template>
  <UCard v-if="state">
    <UForm :state="state">
      <UFormGroup label="Hòm thư (Email)">
        <UInput v-model="state.email" :disabled="!!state.email" />
      </UFormGroup>

      <UFormGroup label="Số điện thoại">
        <UInput v-model="state.phone" :disabled="!!state.phone" />
      </UFormGroup>

      <UFormGroup label="Ảnh đại diện">
        <UiUploadImage v-model="state.avatar">
          <template #default="{ select, loading }">
            <UInput :model-value="state.avatar" :loading="loading" readonly @click="select"/>
          </template>
        </UiUploadImage>
      </UFormGroup>

      <UFormGroup label="Facebook">
        <UInput v-model="state.social.facebook" />
      </UFormGroup>

      <UFormGroup label="Zalo">
        <UInput v-model="state.social.zalo" />
      </UFormGroup>

      <UFormGroup label="Tiktok">
        <UInput v-model="state.social.tiktok" />
      </UFormGroup>

      <UFormGroup label="Telegram">
        <UInput v-model="state.social.telegram" />
      </UFormGroup>

      <UiFlex justify="end" class="mt-4">
        <UButton @click="submit" :loading="loading">Cập nhật</UButton>
      </UiFlex>
    </UForm>
  </UCard>
</template>

<script setup>
const authStore = useAuthStore()

const loading = ref(false)

const state = ref(JSON.parse(JSON.stringify(authStore.profile)))

const submit = async () => {
  try {
    loading.value = true
    await useAPI('auth/edit', JSON.parse(JSON.stringify(state.value)))
    await authStore.getAuth()
    loading.value = false
  }
  catch(e) {
    loading.value = false
  }
}
</script>