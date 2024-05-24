<template>
  <div v-if="user">
    <UCard class="shadow-lg mb-2" :ui="{ background: 'dark:bg-gray-800' }">
      <UiFlex justify="center" class="mb-4">
        <UAvatar size="3xl" :src="user.avatar" />
      </UiFlex>

      <UiText align="center" size="lg" weight="semibold" class="capitalize mb-2">{{ user.username }}</UiText>

      <UiFlex justify="center" class="gap-1" wrap>
        <UBadge :color="typeFormat[user.type].color" variant="soft">
          {{ typeFormat[user.type].label }}
        </UBadge>

        <UBadge color="yellow" variant="soft" v-if="vipFormat">VIP</UBadge>
      </UiFlex>

      <UiText align="center" color="gray" size="xs" class="mt-3" v-if="vipFormat">Hạn VIP - {{ vipFormat.end }}</UiText>
    </UCard>

    <UCard class="shadow-lg" :ui="{ background: 'dark:bg-gray-800' }">
      <UiFlex justify="between" class="text-gray-500 dark:text-gray-400 py-2">
        <UiIcon name="i-bx-envelope" size="5" class="mr-6" />

        <UiText size="sm" weight="bold" color="primary">{{ user.email || '...' }}</UiText>
      </UiFlex>

      <UiFlex justify="between" class="text-gray-500 dark:text-gray-400 py-2">
        <UiIcon name="i-bx-phone" size="5" class="mr-6" />

        <UiText size="sm" weight="bold" color="primary">{{ user.phone || '...' }}</UiText>
      </UiFlex>
    </UCard>
  </div>
</template>

<script setup>
const authStore = useAuthStore()
const user = computed(() => authStore.profile)

const typeFormat = {
  0: { label: 'MEMBER', color: 'gray' },
  1: { label: 'SMOD', color: 'green' },
  2: { label: 'ADMIN', color: 'red' },
  99: { label: 'ROBOT', color: 'orange' }
}

const vipFormat = computed(() => {
  if(!user.value) return null
  if(user.value.vip.month.enable) return {
    type: 'month',
    end: useDayJs().displayDate(user.value.vip.month.end),
  }
  else if(user.value.vip.forever.enable) return {
    type: 'forever',
    end: 'Trọn Đời',
  }
  return null
})
</script>