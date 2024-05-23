<template>
  <UiContent title="Game" sub="Quản lý các trò chơi">
    <UiFlex class="mb-4">
      <USelectMenu v-model="page.size" :options="[5,10,20,50,100]" class="mr-auto"/>
      <UButton color="gray" @click="modal.add = true">Thêm mới</UButton>
    </UiFlex>
    
    <!-- Table -->
    <UCard :ui="{ body: { padding: 'p-0 sm:p-0' } }">
      <LoadingTable v-if="loading.load" />

      <UTable 
        v-model:sort="page.sort"
        :columns="selectedColumns" 
        :rows="list"
      >
        <template #os-data="{ row }">
          <UBadge :color="row.category.color" variant="soft">{{ row.os.name }}</UBadge>
        </template>

        <template #platform-data="{ row }">
          <UBadge :color="row.category.color" variant="soft">{{ row.platform.name }}</UBadge>
        </template>

        <template #category-data="{ row }">
          <UBadge :color="row.category.color" variant="soft">{{ row.category.name }}</UBadge>
        </template>

        <template #name-data="{ row }">
          <UiText class="min-w-[150px] max-w-[150px] whitespace-normal">{{ row.name }}</UiText>
        </template>

        <template #price-data="{ row }">
          {{ useMoney().toMoney(row.price.member) }}
        </template>

        <template #discount-data="{ row }">
          {{ useMoney().toMoney(row.discount) }}%
        </template>

        <template #pin-data="{ row }">
          <UBadge :color="row.pin == 1 ? 'green' : 'gray'" variant="soft">{{ row.pin == 1 ? 'Đã ghim' : 'Không' }}</UBadge>
        </template>

        <template #display-data="{ row }">
          <UBadge :color="row.display == 1 ? 'green' : 'gray'" variant="soft">{{ row.display == 1 ? 'Hiện' : 'Ẩn' }}</UBadge>
        </template>

        <template #createdAt-data="{ row }">
          {{ useDayJs().displayFull(row.createdAt) }}
        </template>

        <template #updatedAt-data="{ row }">
          {{ useDayJs().displayFull(row.updatedAt) }}
        </template>

        <template #actions-data="{ row }">
          <UDropdown :items="actions(row)">
            <UButton color="gray" icon="i-bx-dots-horizontal-rounded" :disabled="loading.del"/>
          </UDropdown>
        </template>
      </UTable>
    </UCard>

    <!-- Pagination -->
    <UiFlex justify="between" class="py-4">
      <USelectMenu v-model="selectedColumns" :options="columns" multiple placeholder="Chọn cột" />
      <UPagination v-model="page.current" :page-count="page.size" :total="page.total" :max="4" />
    </UiFlex>

    <!-- Modal Add -->
    <UModal v-model="modal.add" preventClose>
      <UForm :state="stateAdd" @submit="addAction" class="p-4">
        <UFormGroup label="Hệ điều hành">
          <SelectGameOs v-model="stateAdd.os" />
        </UFormGroup>

        <UFormGroup label="Nền tảng">
          <SelectGamePlatform v-model="stateAdd.platform" />
        </UFormGroup>

        <UFormGroup label="Thể loại">
          <SelectGameCategory v-model="stateAdd.category" />
        </UFormGroup>

        <UFormGroup label="Tên">
          <UInput v-model="stateAdd.name" />
        </UFormGroup>

        <UFormGroup label="Tên ngắn">
          <UInput v-model="stateAdd.short_name" />
        </UFormGroup>

        <UFormGroup label="Mô tả">
          <UTextarea v-model="stateAdd.description" autoresize />
        </UFormGroup>

        <UFormGroup label="Ảnh SEO">
          <UiUploadImage v-model="stateAdd.og_image">
            <template #default="{ select, loading }">
              <UInput :model-value="stateAdd.og_image" :loading="loading" readonly @click="select"/>
            </template>
          </UiUploadImage>
        </UFormGroup>

        <UFormGroup label="Hình ảnh">
          <UiUploadImages v-model="stateAdd.images"></UiUploadImages>
        </UFormGroup>

        <UFormGroup label="Giá bán Thành Viên">
          <UInput v-model="stateAdd.price.member" type="number" />
        </UFormGroup>

        <UFormGroup label="Giá bán VIP Tháng">
          <UInput v-model="stateAdd.price.vip.month" type="number" />
        </UFormGroup>

        <UFormGroup label="Giá bán VIP Vĩnh Viễn">
          <UInput v-model="stateAdd.price.vip.forever" type="number" />
        </UFormGroup>

        <UFormGroup label="Hiển thị">
          <SelectDisplay v-model="stateAdd.display" />
        </UFormGroup>

        <UiFlex class="mt-6">
          <SelectPin v-model="stateAdd.pin" class="mr-auto" />

          <UButton type="submit" :loading="loading.add">Thêm</UButton>
          <UButton color="gray" @click="modal.add = false" :disabled="loading.add" class="ml-1">Đóng</UButton>
        </UiFlex>
      </UForm>
    </UModal>

    <!-- Modal Edit -->
    <UModal v-model="modal.edit" preventClose>
      <UForm :state="stateEdit" @submit="editAction" class="p-4">
        <UFormGroup label="Hệ điều hành">
          <SelectGameOs v-model="stateEdit.os" />
        </UFormGroup>

        <UFormGroup label="Nền tảng">
          <SelectGamePlatform v-model="stateEdit.platform" />
        </UFormGroup>

        <UFormGroup label="Thể loại">
          <SelectGameCategory v-model="stateEdit.category" />
        </UFormGroup>

        <UFormGroup label="Tên">
          <UInput v-model="stateEdit.name" />
        </UFormGroup>

        <UFormGroup label="Tên ngắn">
          <UInput v-model="stateEdit.short_name" />
        </UFormGroup>

        <UFormGroup label="Mô tả">
          <UTextarea v-model="stateEdit.description" autoresize />
        </UFormGroup>

        <UFormGroup label="Ảnh SEO">
          <UiUploadImage v-model="stateEdit.og_image">
            <template #default="{ select, loading }">
              <UInput :model-value="stateEdit.og_image" :loading="loading" readonly @click="select"/>
            </template>
          </UiUploadImage>
        </UFormGroup>

        <UFormGroup label="Hình ảnh">
          <UiUploadImages v-model="stateEdit.images"></UiUploadImages>
        </UFormGroup>

        <UFormGroup label="Giá bán Thành Viên">
          <UInput v-model="stateEdit.price.member" type="number" />
        </UFormGroup>

        <UFormGroup label="Giá bán VIP Tháng">
          <UInput v-model="stateEdit.price.vip.month" type="number" />
        </UFormGroup>

        <UFormGroup label="Giá bán VIP Vĩnh Viễn">
          <UInput v-model="stateEdit.price.vip.forever" type="number" />
        </UFormGroup>

        <UFormGroup label="Hiển thị">
          <SelectDisplay v-model="stateEdit.display" />
        </UFormGroup>

        <UiFlex class="mt-6">
          <SelectPin v-model="stateEdit.pin" class="mr-auto" />

          <UButton type="submit" :loading="loading.edit">Sửa</UButton>
          <UButton color="gray" @click="modal.edit = false" :disabled="loading.edit" class="ml-1">Đóng</UButton>
        </UiFlex>
      </UForm>
    </UModal>

    <!-- Modal Content -->
    <UModal v-model="modal.content" preventClose :ui="{width: 'sm:max-w-[calc(90%)] md:max-w-[calc(80%)] lg:max-w-4xl'}">
      <UForm :state="stateContent" @submit="contentAction" class="p-4">
        <UiEditor v-model="stateContent.content"></UiEditor>
        <UiFlex justify="end" class="mt-4">
          <UButton type="submit" :loading="loading.content">Lưu</UButton>
          <UButton color="gray" @click="modal.content = false" :disabled="loading.content" class="ml-1">Đóng</UButton>
        </UiFlex>
      </UForm>
    </UModal>

    <!-- Modal Download -->
    <UModal v-model="modal.download" preventClose>
      <UForm :state="stateDownload" @submit="downloadAction" class="p-4">
        <UFormGroup label="Link tải">
          <UInput v-model="stateDownload.download" />
        </UFormGroup>

        <UiFlex justify="end" class="mt-4">
          <UButton type="submit" :loading="loading.download">Lưu</UButton>
          <UButton color="gray" @click="modal.download = false" :disabled="loading.download" class="ml-1">Đóng</UButton>
        </UiFlex>
      </UForm>
    </UModal>
  </UiContent>
</template>

<script setup>
// List
const list = ref([])

// Columns
const columns = [
  {
    key: 'name',
    label: 'Tên',
  },{
    key: 'os',
    label: 'Hệ điều hành',
  },{
    key: 'platform',
    label: 'Nền tảng',
  },{
    key: 'category',
    label: 'Danh mục',
  },{
    key: 'price',
    label: 'Giá bán',
    sortable: true
  },{
    key: 'view',
    label: 'Xem',
    sortable: true
  },{
    key: 'order',
    label: 'Mua',
    sortable: true
  },{
    key: 'pin',
    label: 'Ghim',
    sortable: true
  },{
    key: 'display',
    label: 'Hiển thị',
    sortable: true
  },{
    key: 'updatedAt',
    label: 'Cập nhật',
    sortable: true
  },{
    key: 'actions',
    label: 'Chức năng',
  }
]
const selectedColumns = ref([...columns])

// Page
const page = ref({
  size: 10,
  current: 1,
  sort: {
    column: 'updatedAt',
    direction: 'desc'
  },
  total: 0
})
watch(() => page.value.size, () => getList())
watch(() => page.value.current, () => getList())
watch(() => page.value.sort.column, () => getList())
watch(() => page.value.sort.direction, () => getList())

// State
const stateAdd = ref({
  os: null,
  platform: null,
  category: null,
  name: null,
  short_name: null,
  description: null,
  og_image: null,
  images: [],
  price: {
    member: 0,
    vip: {
      month: 0,
      forever: 0,
    }
  },
  pin: false,
  display: true
})

const stateEdit = ref({
  _id: null,
  os: null,
  platform: null,
  category: null,
  name: null,
  short_name: null,
  description: null,
  og_image: null,
  images: [],
  price: {
    member: 0,
    vip: {
      month: 0,
      forever: 0,
    }
  },
  pin: false,
  display: true
})

const stateContent = ref({
  _id: null,
  content: null
})

const stateDownload = ref({
  _id: null,
  download: null
})

// Modal
const modal = ref({
  add: false,
  edit: false,
  content: false,
  download: false
})

watch(() => modal.value.add, (val) => !val && (stateAdd.value = {
  os: null,
  platform: null,
  category: null,
  name: null,
  short_name: null,
  description: null,
  og_image: null,
  price: {
    member: 0,
    vip: {
      month: 0,
      forever: 0,
    }
  },
  pin: false,
  display: true
}))

// Loading
const loading = ref({
  load: true,
  add: false,
  edit: false,
  del: false,
  content: false,
  download: false
})

// Actions
const actions = (row) => [
  [{
    label: 'Xem trực tiếp',
    icon: 'i-bx-link-external',
    click: () => window.open(`/main/game/${row._id}`, '_blank')
  }],
  [{
    label: 'Sửa thông tin',
    icon: 'i-bx-pencil',
    click: () => {
      Object.keys(stateEdit.value).forEach(key => stateEdit.value[key] = row[key])
      stateEdit.value.category = row.category._id
      stateEdit.value.os = row.os._id
      stateEdit.value.platform = row.platform._id
      modal.value.edit = true
    }
  },{
    label: 'Sửa nội dung',
    icon: 'i-bx-spreadsheet',
    click: async () => {
      try {
        const content = await useAPI('game/admin/content/get', { _id: row._id })
        stateContent.value._id = row._id
        stateContent.value.content = content
        modal.value.content = true
      }
      catch (e) {
        return
      }
    }
  },{
    label: 'Sửa link tải',
    icon: 'i-bx-download',
    click: async () => {
      Object.keys(stateDownload.value).forEach(key => stateDownload.value[key] = row[key])
      modal.value.download = true
    }
  }],[{
    label: 'Xóa trò chơi',
    icon: 'i-bx-trash',
    click: () => delAction(row._id)
  }]
]
 
// Fetch
const getList = async () => {
  try {
    loading.value.load = true
    const data = await useAPI('game/admin/list', JSON.parse(JSON.stringify(page.value)))

    loading.value.load = false
    list.value = data.list
    page.value.total = data.total
  }
  catch (e) {
    loading.value.load = false
  } 
}

const addAction = async () => {
  try {
    loading.value.add = true
    await useAPI('game/admin/add', JSON.parse(JSON.stringify(stateAdd.value)))

    loading.value.add = false
    modal.value.add = false
    getList()
  }
  catch (e) {
    loading.value.add = false
  }
}

const editAction = async () => {
  try {
    loading.value.edit = true
    await useAPI('game/admin/edit', JSON.parse(JSON.stringify(stateEdit.value)))

    loading.value.edit = false
    modal.value.edit = false
    getList()
  }
  catch (e) {
    loading.value.edit = false
  }
}

const delAction = async (_id) => {
  try {
    loading.value.del = true
    await useAPI('game/admin/del', { _id })

    loading.value.del = false
    getList()
  }
  catch (e) {
    loading.value.del = false
  }
}

const contentAction = async () => {
  try {
    loading.value.content = true
    await useAPI('game/admin/content/edit', JSON.parse(JSON.stringify(stateContent.value)))

    loading.value.content = false
    modal.value.content = false
  }
  catch (e) {
    loading.value.content = false
  }
}

const downloadAction = async () => {
  try {
    loading.value.download = true
    await useAPI('game/admin/download/edit', JSON.parse(JSON.stringify(stateDownload.value)))

    loading.value.download = false
    modal.value.download = false
  }
  catch (e) {
    loading.value.download = false
  }
} 

getList()
</script>
