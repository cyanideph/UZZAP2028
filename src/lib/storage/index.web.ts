const browserStorage = {
  getItem(key: string): string | null {
    if (typeof window === 'undefined') return null
    return window.localStorage.getItem(key)
  },
  setItem(key: string, value: string): void {
    if (typeof window === 'undefined') return
    window.localStorage.setItem(key, value)
  },
  removeItem(key: string): void {
    if (typeof window === 'undefined') return
    window.localStorage.removeItem(key)
  },
  clear(): void {
    if (typeof window === 'undefined') return
    window.localStorage.clear()
  },
  keys(): string[] {
    if (typeof window === 'undefined') return []
    return Object.keys(window.localStorage)
  },
}

export const STORAGE_KEYS = {
  ACCESS_TOKEN: 'auth.accessToken',
  REFRESH_TOKEN: 'auth.refreshToken',
  SESSION: 'auth.session',
  USER: 'auth.user',
  THEME_MODE: 'theme.mode',
  ONBOARDING_COMPLETED: 'onboarding.completed',
  ONBOARDING_STEP: 'onboarding.currentStep',
  PROFILE_CACHE: 'profile.cache',
  LOCALE: 'app.locale',
  OFFLINE_QUEUE: 'offline.queue',
  LAST_SYNC: 'offline.lastSync',
  PREMIUM_STATUS: 'premium.status',
  PREMIUM_EXPIRES: 'premium.expiresAt',
  SOUND_MUTED: 'sound.muted',
  PUSH_TOKEN: 'notifications.pushToken',
  PUSH_ENABLED: 'notifications.enabled',
} as const

export const storage = browserStorage
export const secureStorage = browserStorage

export const mmkvStorage = {
  getString: (key: string): string | undefined => browserStorage.getItem(key) ?? undefined,
  setString: (key: string, value: string): void => browserStorage.setItem(key, value),
  getNumber: (key: string): number | undefined => {
    const value = browserStorage.getItem(key)
    if (value === null) return undefined
    const parsed = Number(value)
    return Number.isFinite(parsed) ? parsed : undefined
  },
  setNumber: (key: string, value: number): void => browserStorage.setItem(key, String(value)),
  getBoolean: (key: string): boolean | undefined => {
    const value = browserStorage.getItem(key)
    if (value === null) return undefined
    return value === 'true'
  },
  setBoolean: (key: string, value: boolean): void => browserStorage.setItem(key, String(value)),
  getObject: <T>(key: string): T | null => {
    const value = browserStorage.getItem(key)
    if (!value) return null
    try {
      return JSON.parse(value) as T
    } catch {
      return null
    }
  },
  setObject: <T>(key: string, value: T): void => browserStorage.setItem(key, JSON.stringify(value)),
  delete: (key: string): void => browserStorage.removeItem(key),
  contains: (key: string): boolean => browserStorage.getItem(key) !== null,
  clearAll: (): void => browserStorage.clear(),
  getAllKeys: (): string[] => browserStorage.keys(),
}

export const secureMMKVStorage = {
  getString: (key: string): string | undefined => browserStorage.getItem(key) ?? undefined,
  setString: (key: string, value: string): void => browserStorage.setItem(key, value),
  getObject: <T>(key: string): T | null => mmkvStorage.getObject<T>(key),
  setObject: <T>(key: string, value: T): void => mmkvStorage.setObject(key, value),
  delete: (key: string): void => browserStorage.removeItem(key),
  clearAll: (): void => browserStorage.clear(),
}

export type StorageKey = (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS]
