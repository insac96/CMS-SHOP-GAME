<template>
  <UiFlex type="col" class="space-y-4" v-if="menus">
    <div v-for="(menu, index) in menus" :key="index">
      <UiText :text="menu.name" size="sm" color="gray" class="my-2 px-1" />
      
      <UButton 
        v-for="(item, i) in menu.child" :key="i"
        :icon="item.icon"
        :label="item.label"
        @click="item.click"
        class="w-full"
        variant="ghost"
        color="gray"
        :ui="{
          icon: { base: 'mr-2' }
        }"
      ></UButton>
    </div> 
  </UiFlex>
</template>

<script setup>
const menus = ref(undefined)

const getMenuGame = async () => {
  const list = [{
    name: 'Chính',
    child: [{
      label: 'Tin Tức',
      icon: 'i-bxs-news',
      click: () => navigateTo('/news')
    },{
      label: 'Gói VIP',
      icon: 'i-mdi-event-star',
      click: () => navigateTo('/')
    }]
  },{
    name: 'Hệ Điều Hành',
  },{
    name: 'Nền Tảng',
  },{
    name: 'Thể Loại',
  }]

  const { category, platform, os } =  await useAPI('game/menu')
  list[1].child = [...os.map(i => { return { label: i.name, icon: i.icon, click: () => navigateTo(`/game/os/${i.key}`)}})]
  list[2].child = [...platform.map(i => { return { label: i.name, icon: i.icon, click: () => navigateTo(`/game/platform/${i.key}`)}})]
  list[3].child = [...category.map(i => { return { label: i.name, icon: i.icon, click: () => navigateTo(`/game/category/${i.key}`)}})]
  
  menus.value = list
}

getMenuGame()
</script>