<template>
  <NuxtLayout>
    <NuxtLoadingIndicator :height="2" />
    <NuxtPage />
    <UNotifications />
    <AuthModal />
  </NuxtLayout>
</template>

<script setup>
const appConfig = useAppConfig()

// Init Theme Cookie
const initThemeCookie = () => {
  const primaryCookie = useCookie('theme-primary')
  const grayCookie = useCookie('theme-gray')

  if(!!primaryCookie.value) appConfig.ui.primary = primaryCookie.value
  if(!!grayCookie.value) appConfig.ui.gray = grayCookie.value
}
initThemeCookie()
</script>