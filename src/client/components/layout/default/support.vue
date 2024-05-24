<template>
  <div>
    <UAlert color="primary" title="Bạn cần trợ giúp ?">
      <template #title>
        <UiFlex>
          <UiIcon name="i-bxs-help-circle" size="4" class="mr-1" />
          <UiText size="0.8rem" weight="semibold">Bạn cần trợ giúp?</UiText>
        </UiFlex>
      </template>
      
      <template #description>
        <UButton color="gray" size="xs" block class="mt-2" @click="modal = true">Liên Hệ Chúng Tôi</UButton>
      </template>
    </UAlert>

    <UModal v-model="modal">
      <UCard>
          <UiFlex class="mb-6">
            <UiIcon name="i-bxs-business" color="primary" class="mr-2" />
            <UiText size="sm" color="gray" weight="semibold" class="mr-auto" mini>Tổ chức</UiText>
            <UiText size="sm" weight="semibold" align="right" class="ml-6">{{ contact.name || '...' }}</UiText>
          </UiFlex>
          <UiFlex class="mb-6">
            <UiIcon name="i-bxs-map" color="primary" class="mr-2" />
            <UiText size="sm" color="gray" weight="semibold" class="mr-auto" mini>Địa chỉ</UiText>
            <UiText size="sm" weight="semibold" align="right" class="ml-6">{{ contact.address || '...' }}</UiText>
          </UiFlex>
          <UiFlex class="mb-6">
            <UiIcon name="i-bxs-phone" color="primary" class="mr-2" />
            <UiText size="sm" color="gray" weight="semibold" class="mr-auto" mini>Điện thoại</UiText>
            <UiText size="sm" weight="semibold" align="right" class="ml-6">{{ contact.phone || '...' }}</UiText>
          </UiFlex>
          <UiFlex>
            <UiIcon name="i-bxs-envelope" color="primary" class="mr-2" />
            <UiText size="sm" color="gray" weight="semibold" class="mr-auto" mini>Hòm thư</UiText>
            <UiText size="sm" weight="semibold" align="right" class="ml-6">{{ contact.email || '...' }}</UiText>
          </UiFlex>

          <template #footer>
            <UiFlex justify="center" class="mt-4 gap-2" wrap>
              <div class="cursor-pointer" v-for="(value, key) in social" :key="key" @click="open(value)">
                <UiImg 
                  class="max-w-[45px] max-h-[45px] rounded-full"
                  :src="`/images/social/${key}.png`"
                  w="1" h="1"
                  imgW="90" imgH="90"
                  :alt="key"
                ></UiImg>
              </div>
            </UiFlex>
          </template>
        </UCard>
    </UModal>
  </div>
</template>

<script setup>
const configStore = useConfigStore()
const contact = ref(configStore.config.contact)
const social = ref(configStore.config.social)
const modal = ref(false)

const open = (url) => {
  if(!url) return useNotify().error('Chúng tôi đang cập nhật thông tin, vui lòng quay lại sau')
  window.open(url, '_blank')
}
</script>