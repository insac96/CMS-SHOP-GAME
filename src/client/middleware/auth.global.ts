export default defineNuxtRouteMiddleware(async () => {
  const token = useCookie('token-auth')
  if(!token.value) return

  const auth = await useAPI('auth/get')
  useAuthStore().setAuth(auth)
})