import { router } from 'expo-router'
import { ROUTES } from '@/constants/navigation'

/**
 * Navigate to a specific route.
 */
export function navigateTo(route: string, params?: Record<string, string>): void {
  if (params) {
    router.push({ pathname: route as never, params })
  } else {
    router.push(route as never)
  }
}

/**
 * Replace the current route.
 */
export function replaceTo(route: string): void {
  router.replace(route as never)
}

/**
 * Go back, falling back to the app home.
 */
export function goBack(): void {
  if (router.canGoBack()) {
    router.back()
  } else {
    router.replace(ROUTES.PROTECTED.HOME as never)
  }
}

export function navigateToAuth(): void {
  router.replace(ROUTES.AUTH.WELCOME as never)
}

export function navigateToApp(): void {
  router.replace(ROUTES.PROTECTED.HOME as never)
}

export function navigateToOnboarding(): void {
  router.replace(ROUTES.ONBOARDING as never)
}

/**
 * Navigate to one of the four UZZAP2028 primary tabs.
 */
export function navigateToTab(tab: 'index' | 'communities' | 'chat' | 'profile'): void {
  const routes = {
    index: ROUTES.PROTECTED.HOME,
    communities: ROUTES.PROTECTED.COMMUNITIES,
    chat: ROUTES.PROTECTED.CHAT,
    profile: ROUTES.PROTECTED.PROFILE,
  } as const

  router.push(routes[tab] as never)
}

export function navigateToNotifications(): void {
  router.push(ROUTES.PROTECTED.NOTIFICATIONS as never)
}

export function navigateToSettings(): void {
  router.push(ROUTES.PROTECTED.SETTINGS as never)
}

export function navigateToPrivacy(): void {
  router.push(ROUTES.PROTECTED.PRIVACY_POLICY as never)
}

export async function openExternalLink(url: string): Promise<void> {
  const { openBrowserAsync } = await import('expo-web-browser')
  await openBrowserAsync(url)
}
