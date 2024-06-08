<template>
  <UiFlex>
    <UInput icon="i-bx-search" size="md" placeholder="Tìm kiếm" readonly class="hidden md:inline-block" @click="modal = true" />
    <UButton color="gray" size="md" icon="i-bx-search" class="md:hidden" @click="modal = true" />

    <UModal v-model="modal" :ui="{ width: 'lg:max-w-2xl md:max-w-2xl sm:max-w-2xl' }">
      <UCard :ui="{
        header: { padding: 'p-2 sm:p-2' }
      }">
        <template #header>
          <UiFlex justify="between" class="gap-2 pr-1">
            <UInput icon="i-bx-search" size="sm" variant="none" v-model="query" placeholder="Nhập từ khóa" class="w-full" :loading="loading" />
            <UButton color="gray" icon="i-bx-x" square variant="ghost" :padded="false" @click="modal = false"></UButton>
          </UiFlex>
        </template>

        <UiFlex justify="center" v-if="list.length == 0">
          <UiText align="center" size="sm" color="gray" v-if="!query">Nhập từ khóa để bắt đầu tìm kiếm</UiText>
          <UiText align="center" size="sm" color="gray" v-if="!!query && !loading">Không có dữ liệu</UiText>
          <UiText align="center" size="sm" color="gray" v-if="!!query && !!loading">Đang tìm kiếm...</UiText>
        </UiFlex>

        <UiFlex type="col" class="gap-3" v-else>
          <UiFlex class="w-full gap-1 cursor-pointer" v-for="item in list" :key="item._id" @click="navigateTo(`/game/${item.key}`), modal = false">
            <UiText size="sm" class="mr-4">{{ item.name }}</UiText>

            <UiFlex class="gap-0.5 ml-auto">
              <UBadge color="gray" size="xs" class="whitespace-nowrap">{{ item.platform.name }}</UBadge>
              <UBadge color="gray" size="xs" class="whitespace-nowrap">{{ item.category.name }}</UBadge>
            </UiFlex>
          </UiFlex>
        </UiFlex>
      </UCard>
    </UModal>
  </UiFlex>
</template>

<script setup>
const modal = ref(false)
const loading = ref(false)

const list = ref([])

const delayTimer = ref(undefined)

const query = ref(null)
watch(() => query.value, () => {
  if (delayTimer.value) {  
    clearTimeout(delayTimer.value)
  }

  loading.value = true
  
  delayTimer.value = setTimeout(() => {
    searchItem(query.value)
  }, 1000)
})
watch(() => modal.value, (val) => query.value = null)

const searchItem = async (key) => {
  try {
    if(!key) throw true
    const data = await useAPI('game/search', { key: key.trim() })

    loading.value = false
    list.value = data
  }
  catch(e){
    loading.value = false
    list.value = []
  }
}
</script>