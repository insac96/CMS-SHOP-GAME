<template>
  <UCard v-if="game" class="BoxGame shadow-lg" :ui="{
    body: { padding: 'p-0 sm:p-0' },
    background: 'bg-gray-50 dark:bg-gray-800'
  }">
    <div @click="navigateTo(`/game/${game.key}`)" class="cursor-pointer w-full">
      <UiImg 
        :src="game.og_image" 
        ratio="16 / 9"
        w="100%"
      />
    </div>

    <div class="lg:p-4 p-2 lg:pt-2 pt-1">
      <NuxtLink :to="`/game/${game.key}`" class="lg:text-lg md:text-md text-sm line-clamp-2 mb-2 text-gray hover:text-primary">
        {{ game.name }}
      </NuxtLink>

      <UiFlex class="gap-1">
        <UBadge color="gray" class="cursor-pointer" @click="navigateTo(`/game/os/${game.os.key}`)">{{ game.os.name }}</UBadge>
        <UBadge color="gray" class="cursor-pointer" @click="navigateTo(`/game/platform/${game.platform.key}`)">{{ game.platform.name }}</UBadge>
        <UBadge color="gray" class="cursor-pointer" @click="navigateTo(`/game/category/${game.category.key}`)">{{ game.category.name }}</UBadge>
      </UiFlex>
    </div>

    <template #footer>
      <UiFlex class="gap-2">
        <UiFlex class="gap-1">
          <UiIcon size="3" color="gray" name="i-ion-eye"></UiIcon>
          <UiText size="xs">{{ game.view || 0 }}</UiText>
        </UiFlex>

        <UiFlex class="gap-1">
          <UiIcon size="3" color="gray" name="i-bxs-cart-download"></UiIcon>
          <UiText size="xs">{{ game.order || 0 }}</UiText>
        </UiFlex>

        <UiText size="sm" color="primary" weight="semibold" class="ml-auto">{{  useMoney().toMoney(game.price.member) }}đ</UiText>
      </UiFlex>
    </template>
  </UCard>
</template>

<script setup>
const props = defineProps(['game'])
</script>

<style lang="sass">
.BoxGame
  transition: all 0.25s ease
  &:hover
    transform: translateY(-5px)
</style>
