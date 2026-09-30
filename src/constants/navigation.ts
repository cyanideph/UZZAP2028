import type { TabItem } from '@/types'

export const ROUTES = {
  AUTH: {
    WELCOME: '/(auth)/welcome',
    SIGN_IN: '/(auth)/sign-in',
    SIGN_UP: '/(auth)/sign-up',
    CALLBACK: '/(auth)/callback',
    CONFIRM: '/(auth)/confirm',
    RESET_PASSWORD: '/(auth)/reset-password',
    SET_PASSWORD: '/(auth)/set-password',
  },
  PROTECTED: {
    HOME: '/(tabs)',
    COMMUNITIES: '/(tabs)/communities',
    CHAT: '/(tabs)/chat',
    PROFILE: '/(tabs)/profile',
    NOTIFICATIONS: '/notifications',
    SETTINGS: '/settings',
    PRIVACY_POLICY: '/privacy',
    SEARCH: '/search',
    CREATE: '/create',
    CHECK_IN: '/check-in',
    LEADERBOARD: '/leaderboard',
    MODERATION: '/moderation',
    MESSAGES: '/messages',
  },
  ONBOARDING: '/onboarding',
} as const

export const TAB_ITEMS: TabItem[] = [
  { id: 'index', label: 'Home', icon: 'house' },
  { id: 'communities', label: 'Communities', icon: 'person.3' },
  { id: 'chat', label: 'Chat', icon: 'bubble.left.and.bubble.right' },
  { id: 'profile', label: 'Profile', icon: 'person.circle' },
]

export const DEEP_LINK_PREFIXES = ['uzzap2028://']

export const NAVIGATION_CONFIG = {
  screens: {
    '(auth)': {
      screens: {
        welcome: 'welcome',
        'sign-in': 'sign-in',
        'sign-up': 'sign-up',
        callback: 'callback',
        confirm: 'confirm',
        'reset-password': 'reset-password',
        'set-password': 'set-password',
      },
    },
    '(tabs)': {
      screens: {
        index: '',
        communities: 'communities',
        chat: 'chat',
        profile: 'profile',
      },
    },
    onboarding: 'onboarding',
    notifications: 'notifications',
    settings: 'settings',
    privacy: 'privacy',
    search: 'search',
    create: 'create',
    'check-in': 'check-in',
    leaderboard: 'leaderboard',
    moderation: 'moderation',
    messages: 'messages',
    '+not-found': '*',
  },
} as const

export type RouteKey = keyof typeof ROUTES
export type AuthRoute = (typeof ROUTES.AUTH)[keyof typeof ROUTES.AUTH]
export type ProtectedRoute = (typeof ROUTES.PROTECTED)[keyof typeof ROUTES.PROTECTED]
