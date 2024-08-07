<template>
  <UiContent title="User" sub="Quản lý tài khoản người dùng">
    <UiFlex class="mb-4">
      <USelectMenu v-model="page.size" :options="[5,10,20,50,100]" class="mr-1"/>
      <UForm :state="page" @submit="getList" class="mr-1">
        <UiFlex>
          <UInput v-model="page.search.key" placeholder="Tìm kiếm..." icon="i-bx-search" size="sm" class="mr-1" />
          <USelectMenu v-model="page.search.by" :options="['USER', 'PHONE', 'MAIL']" />
        </UiFlex>
      </UForm>
    </UiFlex>
    
    <!-- Table -->
    <UCard :ui="{ body: { padding: 'p-0 sm:p-0' } }">
      <LoadingTable v-if="loading.load" />

      <UTable 
        v-model:sort="page.sort"
        :columns="selectedColumns" 
        :rows="list"
      >
        <template #username-data="{ row }">
          <UBadge variant="soft" color="gray" class="cursor-pointer" @click="viewUser(row._id)">
            {{ row.username }}
          </UBadge>
        </template>

        <template #phone-data="{ row }">
          {{ row.phone || '...' }}
        </template>

        <template #email-data="{ row }">
          {{ row.email || '...' }}
        </template>

        <template #block-data="{ row }">
          <UBadge :color="row.block == 1 ? 'red' : 'gray'" variant="soft">{{ row.block == 1 ? 'Có' : 'Không' }}</UBadge>
        </template>

        <template #type-data="{ row }">
          <UBadge :color="typeFormat[row.type].color" variant="soft">
            {{ typeFormat[row.type].label }}
          </UBadge>
        </template>

        <template #createdAt-data="{ row }">
          {{ useDayJs().displayFull(row.createdAt) }}
        </template>

        <template #actions-data="{ row }">
          <UDropdown :items="actions(row)">
            <UButton color="gray" icon="i-bx-dots-horizontal-rounded" />
          </UDropdown>
        </template>
      </UTable>
    </UCard>

    <!-- Pagination -->
    <UiFlex justify="between" class="py-4">
      <USelectMenu v-model="selectedColumns" :options="columns" multiple placeholder="Chọn cột" />
      <UPagination v-model="page.current" :page-count="page.size" :total="page.total" :max="4" />
    </UiFlex>

    <!-- Modal User View -->
    <!-- <UModal v-model="modal.user" :ui="{width: 'sm:max-w-[900px]'}">
      <AdminUserInfo :user="stateUser" />
    </UModal> -->

    <!-- Modal Edit Auth-->
    <UModal v-model="modal.editAuth" preventClose>
      <UForm :state="stateEditAuth" @submit="editAuthAction" class="p-4">
        <UFormGroup label="Email">
          <UInput v-model="stateEditAuth.email" />
        </UFormGroup>

        <UFormGroup label="Số điện thoại">
          <UInput v-model="stateEditAuth.phone" />
        </UFormGroup>

        <UFormGroup label="Mật khẩu">
          <UInput v-model="stateEditAuth.password" type="password" />
        </UFormGroup>

        <UFormGroup label="Khóa">
          <SelectAuthBlock v-model="stateEditAuth.block" />
        </UFormGroup>

        <UFormGroup label="Quyền">
          <SelectAuthType v-model="stateEditAuth.type" />
        </UFormGroup>

        <UiFlex justify="end" class="mt-6">
          <UButton type="submit" :loading="loading.editAuth">Sửa</UButton>
          <UButton color="gray" @click="modal.editAuth = false" :disabled="loading.editAuth" class="ml-1">Đóng</UButton>
        </UiFlex>
      </UForm>
    </UModal>
  </UiContent>
</template>

<script setup>
const { toMoney } = useMoney()

// List
const list = ref([])

// Columns
const columns = [
  {
    key: 'username',
    label: 'Tên',
  },{
    key: 'phone',
    label: 'Điện thoại',
  },{
    key: 'email',
    label: 'Email',
  },{
    key: 'block',
    label: 'Khóa',
    sortable: true
  },{
    key: 'type',
    label: 'Quyền',
    sortable: true
  },{
    key: 'createdAt',
    label: 'Ngày tạo',
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
    column: 'createdAt',
    direction: 'desc'
  },
  search: {
    key: null,
    by: 'USER'
  },
  total: 0
})
watch(() => page.value.size, () => getList())
watch(() => page.value.current, () => getList())
watch(() => page.value.sort.column, () => getList())
watch(() => page.value.sort.direction, () => getList())
watch(() => page.value.search.key, (val) => !val && getList())

// State
const stateUser = ref(undefined)

const stateEditAuth = ref({
  _id: null,
  email: null,
  phone: null,
  password: null,
  type: null,
  block: null
})

// Modal
const modal = ref({
  user: false,
  editAuth: false,
})

// Loading
const loading = ref({
  load: true,
  editAuth: false,
})

// Type
const typeFormat = {
  0: { label: 'MEMBER', color: 'gray' },
  1: { label: 'SMOD', color: 'green' },
  2: { label: 'ADMIN', color: 'red' },
  99: { label: 'BOT', color: 'orange' }
}

const viewUser = (_id) => {
  stateUser.value = _id
  modal.value.user = true
}

// Actions
const actions = (row) => [
  [{
    label: 'Sửa thông tin',
    icon: 'i-bx-pencil',
    click: () => {
      Object.keys(stateEditAuth.value).forEach(key => stateEditAuth.value[key] = row[key])
      modal.value.editAuth = true
    }
  }]
]
 
// Fetch
const getList = async () => {
  try {
    loading.value.load = true
    const data = await useAPI('user/admin/list', JSON.parse(JSON.stringify(page.value)))

    loading.value.load = false
    list.value = data.list
    page.value.total = data.total
  }
  catch (e) {
    loading.value.load = false
  } 
}

const editAuthAction = async () => {
  try {
    loading.value.editAuth = true
    await useAPI('user/admin/edit', JSON.parse(JSON.stringify(stateEditAuth.value)))

    loading.value.editAuth = false
    modal.value.editAuth = false
    getList()
  }
  catch (e) {
    loading.value.editAuth = false
  }
}

getList()
</script>
