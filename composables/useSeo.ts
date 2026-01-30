/**
 * Composable SEO centralisé
 * Gère les meta tags, Open Graph, et Schema.org
 */

interface SeoOptions {
  title: string
  description: string
  image?: string
  type?: 'website' | 'article' | 'product'
  noIndex?: boolean
  schemaOrg?: object
}

export const useSeo = (options: SeoOptions) => {
  const { t, locale } = useI18n()
  const route = useRoute()
  const config = useRuntimeConfig()

  const siteUrl = config.public.siteUrl as string
  const fullUrl = `${siteUrl}${route.fullPath}`

  // Meta tags de base
  useSeoMeta({
    title: options.title,
    description: options.description,
    ogTitle: options.title,
    ogDescription: options.description,
    ogType: options.type || 'website',
    ogUrl: fullUrl,
    ogLocale: locale.value,
    ogSiteName: t('site.name'),
    twitterCard: 'summary_large_image',
    twitterTitle: options.title,
    twitterDescription: options.description,
    robots: options.noIndex ? 'noindex, nofollow' : 'index, follow'
  })

  // Image Open Graph
  if (options.image) {
    const imageUrl = options.image.startsWith('http')
      ? options.image
      : `${siteUrl}${options.image}`

    useSeoMeta({
      ogImage: imageUrl,
      twitterImage: imageUrl
    })
  }

  // Canonical URL
  useHead({
    link: [
      { rel: 'canonical', href: fullUrl }
    ]
  })

  // Schema.org JSON-LD
  if (options.schemaOrg) {
    useHead({
      script: [
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify(options.schemaOrg)
        }
      ]
    })
  }
}
