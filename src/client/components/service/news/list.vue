<template>
  <div v-if="!!list">
    <UiFlex class="gap-2 mb-6">
      <UiIcon color="primary" name="i-bx-news" size="8" />
      <UiText :text="title" weight="semibold" size="lg" />

      <UButton size="xs" color="gray" class="ml-auto" v-if="list.length < page.total">Xem Thêm</UButton>
    </UiFlex>
    
    <UiEmpty v-if="list.length == 0" title="Hiện tại chưa có dữ liệu" />

    <div class="grid grid-cols-12 lg:gap-6 md:gap-4 gap-2 md:mb-6 mb-4" v-else>
      <ServiceNewsBox
        v-for="news in list" :key="news._id" :news="news"
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
  category: String
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
    const send = JSON.parse(JSON.stringify(page.value))
    send.category = props.category
    
    const data = await useAPI('news/list', send)

    list.value = data.list
    page.value.total = data.total
  }
  catch(e){

  }
}

get()
</script>