export const useMakeLink = () => {
  const runtimeConfig = useRuntimeConfig()

  function img(link : string) : string {
    const url =  new URL(link || '/images/null.webp', runtimeConfig.public.CLIENT_URL)
    return url.href
  }

  function concat(link : string) : string {
    const url =  new URL(link, runtimeConfig.public.CLIENT_URL)
    return url.href
  }

  return { img, concat }
}