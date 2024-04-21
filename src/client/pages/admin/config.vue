<template>
  <UiContent 
    title="Config" 
    sub="Chỉnh sửa cấu hình trang" 
    class="max-w-3xl mx-auto"
  >
    <UAccordion
      color="primary"
      variant="soft"
      size="md"
      :items="menu"
    >
      <template #default="{ item, open }">
        <UButton :color="open ? 'primary' : 'gray'" size="md" class="mb-2">
          {{ item.label }}
        </UButton>
      </template>

      <template #basic>
        <UCard>
          <UForm :state="state">
            <UFormGroup label="Tên trang">
              <UInput v-model="state.name" />
            </UFormGroup>

            <UFormGroup label="Tên viết tắt">
              <UInput v-model="state.short_name" />
            </UFormGroup>

            <UFormGroup label="Mô tả">
              <UTextarea autoresize v-model="state.description" name="input" />
            </UFormGroup>

            <UFormGroup label="Logo">
              <UiUploadImage v-model="state.image.logo">
                <template #default="{ select, loading }">
                  <UInput :model-value="state.image.logo" :loading="loading" readonly @click="select"/>
                </template>
              </UiUploadImage>
            </UFormGroup>

            <UFormGroup label="Icon">
              <UiUploadImage v-model="state.image.app">
                <template #default="{ select, loading }">
                  <UInput :model-value="state.image.app" :loading="loading" readonly @click="select"/>
                </template>
              </UiUploadImage>
            </UFormGroup>

            <UFormGroup label="Banner">
              <UiUploadImage v-model="state.image.og">
                <template #default="{ select, loading }">
                  <UInput :model-value="state.image.og" :loading="loading" readonly @click="select"/>
                </template>
              </UiUploadImage>
            </UFormGroup>

            <UiFlex justify="end" class="mt-4">
              <UButton @click="update('basic')" :loading="updating">Cập nhật</UButton>
            </UiFlex>
          </UForm>
        </UCard>
      </template>

      <template #contact>
        <UCard>
          <UForm :state="state">
            <UFormGroup label="Tên tổ chức">
              <UInput v-model="state.contact.name" />
            </UFormGroup>

            <UFormGroup label="Tên viết tắt">
              <UInput v-model="state.contact.prefix" />
            </UFormGroup>

            <UFormGroup label="Số điện thoại">
              <UInput v-model="state.contact.phone" />
            </UFormGroup>

            <UFormGroup label="Hòm thư">
              <UInput v-model="state.contact.email"/>
            </UFormGroup>

            <UFormGroup label="Địa chỉ">
              <UInput v-model="state.contact.address" />
            </UFormGroup>

            <UiFlex justify="end" class="mt-4">
              <UButton @click="update('contact')" :loading="updating">Cập nhật</UButton>
            </UiFlex>
          </UForm>
        </UCard>
      </template>

      <template #social>
        <UCard>
          <UForm :state="state">
            <UFormGroup label="Fanpage">
              <UInput v-model="state.social.fanpage" />
            </UFormGroup>

            <UFormGroup label="Group">
              <UInput v-model="state.social.group" />
            </UFormGroup>

            <UFormGroup label="Messenger">
              <UInput v-model="state.social.messenger" />
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
              <UButton @click="update('social')" :loading="updating">Cập nhật</UButton>
            </UiFlex>
          </UForm>
        </UCard>
      </template>

      <template #facebook>
        <UCard>
          <UForm :state="state">
            <UFormGroup label="ID">
              <UInput v-model="state.facebook.client_id" />
            </UFormGroup>

            <UFormGroup label="Secret">
              <UInput v-model="state.facebook.client_secret" />
            </UFormGroup>

            <UFormGroup label="Version">
              <UInput v-model="state.facebook.client_version" />
            </UFormGroup>

            <UFormGroup label="Verify">
              <UInput v-model="state.facebook.client_verify" />
            </UFormGroup>

            <UFormGroup label="Ads">
              <UInput v-model="state.facebook.client_ads" />
            </UFormGroup>

            <UiFlex justify="end" class="mt-4">
              <UButton @click="update('facebook')" :loading="updating">Cập nhật</UButton>
            </UiFlex>
          </UForm>
        </UCard>
      </template>

      <template #google>
        <UCard>
          <UForm :state="state">
            <UFormGroup label="ID">
              <UInput v-model="state.google.client_id" />
            </UFormGroup>

            <UFormGroup label="Secret">
              <UInput v-model="state.google.client_secret" />
            </UFormGroup>

            <UFormGroup label="Verify">
              <UInput v-model="state.google.client_verify" />
            </UFormGroup>

            <UFormGroup label="Ads">
              <UInput v-model="state.google.client_ads" />
            </UFormGroup>

            <UiFlex justify="end" class="mt-4">
              <UButton @click="update('google')" :loading="updating">Cập nhật</UButton>
            </UiFlex>
          </UForm>
        </UCard>
      </template>

      <template #tiktok>
        <UCard>
          <UForm :state="state">
            <UFormGroup label="ID">
              <UInput v-model="state.tiktok.client_id" />
            </UFormGroup>

            <UFormGroup label="Secret">
              <UInput v-model="state.tiktok.client_secret" />
            </UFormGroup>

            <UiFlex justify="end" class="mt-4">
              <UButton @click="update('tiktok')" :loading="updating">Cập nhật</UButton>
            </UiFlex>
          </UForm>
        </UCard>
      </template>

      <template #zalo>
        <UCard>
          <UForm :state="state">
            <UFormGroup label="ID">
              <UInput v-model="state.zalo.client_id" />
            </UFormGroup>

            <UFormGroup label="Secret">
              <UInput v-model="state.zalo.client_secret" />
            </UFormGroup>

            <UFormGroup label="Verify">
              <UInput v-model="state.zalo.client_verify" />
            </UFormGroup>

            <UiFlex justify="end" class="mt-4">
              <UButton @click="update('zalo')" :loading="updating">Cập nhật</UButton>
            </UiFlex>
          </UForm>
        </UCard>
      </template>
    </UAccordion>
  </UiContent>
</template>

<script setup>
const { bootConfig } = useConfigStore()

const load = ref(true)
const updating = ref(false)

const state = ref({
  change: null,

  name: '',
  short_name: '',
  description: '',
  image: {
    og: '',
    app: '',
    logo: '',
  },

  contact: {
    name: '',
    phone: '',
    email: '',
    address: '',
    prefix: '',
  },

  social: {
    fanpage: '',
    group: '',
    messenger: '',
    zalo: '',
    tiktok: '',
    telegram: '',
  },

  facebook: {
    client_id: '',
    client_secret: '',
    client_version: '',
    client_verify: '',
    client_ads: ''
  },

  google: {
    client_id: '',
    client_secret: '',
    client_verify: '',
    client_ads: ''
  },

  tiktok: {
    client_id: '',
    client_secret: '',
    client_verify: '',
  },

  zalo: {
    client_id: '',
    client_secret: '',
    client_verify: '',
  }
})

const menu = [
{
  label: 'Cơ bản',
  slot: 'basic'
},
{
  label: 'Liên hệ',
  slot: 'contact'
},
{
  label: 'Mạng xã hội',
  slot: 'social'
},
{
  label: 'Facebook',
  slot: 'facebook'
},
{
  label: 'Google',
  slot: 'google'
},
{
  label: 'Tiktok',
  slot: 'tiktok'
},
{
  label: 'Zalo',
  slot: 'zalo'
}
]

const getConfig = async () => {
  const config = await useAPI('config/admin/get')
  state.value = Object.assign(state.value, config)
  load.value = false
}

const update = async (change) => {
  try {
    updating.value = true
    state.value.change = change

    await useAPI('config/admin/update', JSON.parse(JSON.stringify(state.value)))
    bootConfig()
    getConfig()
    updating.value = false
  }
  catch(e) {
    updating.value = false
  }
}

getConfig()
</script>