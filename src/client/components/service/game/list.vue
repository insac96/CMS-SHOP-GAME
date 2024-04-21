<template>
  <div v-if="!!list">
    <UiFlex class="gap-2 mb-6">
      <UiIcon color="primary" :name="icon || 'i-bxs-folder-open'" size="8" />
      <UiText :text="title" weight="semibold" size="lg" />

      <UButton size="xs" color="gray" class="ml-auto" v-if="list.length < page.total">Xem Thêm</UButton>
    </UiFlex>
    
    <UiEmpty v-if="list.length == 0" title="Hiện tại chưa có dữ liệu" />

    <div class="grid grid-cols-12 lg:gap-6 md:gap-4 gap-2 md:mb-6 mb-4" v-else>
      <ServiceGameBox 
        v-for="game in list" :key="game._id" :game="game"
        class="xl:col-span-3 lg:col-span-4 col-span-6"
      />
    </div>

    <UiFlex justify="center" v-if="list.length < page.total">
      <UPagination v-model="page.current" :page-count="page.size" :total="page.total" :max="5" show-last show-first />
    </UiFlex>
  </div>
</template>

<script setup>
const props = defineProps({
  title: String,
  menu: String,
  type: String,
  icon: String
})

const page = ref({
  size: 8,
  current: 1,
  sort: {
    column: 'updatedAt',
    direction: 'desc'
  },
  total: 0
})

const list = ref(undefined)

const get = async () => {
  try {
    const data = await useAPI('game/list', {
      type: props.menu,
      key: props.type,
      page: JSON.parse(JSON.stringify(page.value))
    })

    list.value = data.list
    page.value.total = data.total
  }
  catch(e){

  }
}

get()
</script>