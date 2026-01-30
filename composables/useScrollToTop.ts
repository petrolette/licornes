/**
 * Composable pour gérer le scroll
 * Auto-scroll au changement de page + méthodes utilitaires
 */

export const useScrollToTop = () => {
  const route = useRoute()

  // Auto-scroll au changement de route
  watch(
    () => route.fullPath,
    () => {
      if (import.meta.client) {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    }
  )

  // Scroll manuel vers le haut
  const scrollToTop = (smooth = true) => {
    if (import.meta.client) {
      window.scrollTo({
        top: 0,
        behavior: smooth ? 'smooth' : 'instant'
      })
    }
  }

  // Scroll vers un élément spécifique
  const scrollToElement = (selector: string, offset = 0) => {
    if (!import.meta.client) return

    const element = document.querySelector(selector)
    if (element) {
      const top = element.getBoundingClientRect().top + window.scrollY - offset
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  return {
    scrollToTop,
    scrollToElement
  }
}
