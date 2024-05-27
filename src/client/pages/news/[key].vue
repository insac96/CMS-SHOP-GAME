<template>
  <div v-if="loading || !news">Loading...</div>

  <UiFlex v-else type="col" justify="center" class="max-w-3xl mx-auto">
      <UiSlide :images="news.images" class="mb-4" />

      <div class="mb-4">
        <UiText color="primary" weight="bold" class="text-xl lg:text-2xl mb-2">{{ news.title }}</UiText>
        <UiText color="gray" class="text-md lg:text-md">{{ news.description }}</UiText>
      </div>

      <UDivider label="Nội Dung" class="mb-4" />
      <div class="mb-4 w-full">
        <DataEditor :content="news.content" empty="Chưa có nội dung"></DataEditor>
      </div>
  </UiFlex>
</template>

<script setup>
const { img } = useMakeLink()
const configStore = useConfigStore()
const route = useRoute()
const loading = ref(false)
const news = ref(undefined)

// Meta Seo
useSeoMeta({
  title: () => news.value ? `${news.value.title} - ${configStore.config.name}` : 'Loading...',
  ogTitle: () => news.value ? `${news.value.title} - ${configStore.config.name}` : 'Loading...',
  description: () => news.value ? news.value.description : 'Loading...',
  ogDescription: () => news.value ? news.value.description : 'Loading...',
  ogImage: () => news.value ? img(news.value.og_image) : 'Loading...',
  ogImageAlt: () => news.value ? news.value.title : 'Loading...'
})

const getNews = async () => {
  try {
    loading.value = true
    const data = await useAPI('news/get', {
      key: route.params.key
    })

    loading.value = false
    news.value = data
  }
  catch (e){
    loading.value = false
  }
}

getNews()
</script>