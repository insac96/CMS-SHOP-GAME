<template>
  <UDropdown 
    :items="menu" 
    :ui="{ 
      item: {
        disabled: 'cursor-text select-text' } 
    }" 
    :popper="{ 
      placement: 'bottom-end' 
    }"
  >
    <UAvatar :src="authStore.profile.avatar" />

    <template #account>
      <div class="text-left">
        <UiText color="gray" size="xs">Đăng nhập với tài khoản</UiText>
        <UiText color="primary" weight="semibold" class="mt-0.5 capitalize">
          {{ authStore.profile.username }}
        </UiText>
      </div>
    </template>

    <template #item="{ item }">
      <UiText class="truncate">{{ item.label }}</UiText>
      <UIcon :name="item.icon" class="flex-shrink-0 h-4 w-4 text-gray-400 dark:text-gray-500 ms-auto" />
    </template>
  </UDropdown>
</template>

<script setup>
const authStore = useAuthStore()

const menu = computed(() => {
  const items = [
    [{
      slot: 'account',
      disabled: true
    }],
    [{
      label: 'Quản trị viên',
      icon: 'i-eos-icons-admin',
      disabled: authStore.profile?.type < 1 ? true : false,
      click: () => navigateTo('/admin')
    },{
      label: 'Đăng xuất',
      icon: 'i-uis-signout',
      click: () => authStore.delAuth()
    }]
  ]

  return items
})
</script>