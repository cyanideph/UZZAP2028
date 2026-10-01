import { createMMKV } from 'react-native-mmkv'

export const storage = createMMKV({
  id: 'uzzap-app-storage',
})

export const secureStorage = createMMKV({
  id: 'uzzap-secure-storage',
  encryptionKey: 'uzzap-secure-v1!',
})

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

export const mmkvStorage = {
  getString: (key: string): string | undefined => storage.getString(key),
  setString: (key: string, value: string): void => storage.set(key, value),
  getNumber: (key: string): number | undefined => storage.getNumber(key),
  setNumber: (key: string, value: number): void => storage.set(key, value),
  getBoolean: (key: string): boolean | undefined => storage.getBoolean(key),
  setBoolean: (key: string, value: boolean): void => storage.set(key, value),
  getObject: <T>(key: string): T | null => {
    const value = storage.getString(key)
    if (!value) return null
    try { return JSON.parse(value) as T } catch { return null }
  },
  setObject: <T>(key: string, value: T): void => storage.set(key, JSON.stringify(value)),
  delete: (key: string): void => storage.remove(key),
  contains: (key: string): boolean => storage.contains(key),
  clearAll: (): void => storage.clearAll(),
  getAllKeys: (): string[] => storage.getAllKeys(),
}

export const secureMMKVStorage = {
  getString: (key: string): string | undefined => secureStorage.getString(key),
  setString: (key: string, value: string): void => secureStorage.set(key, value),
  getObject: <T>(key: string): T | null => {
    const value = secureStorage.getString(key)
    if (!value) return null
    try { return JSON.parse(value) as T } catch { return null }
  },
  setObject: <T>(key: string, value: T): void => secureStorage.set(key, JSON.stringify(value)),
  delete: (key: string): void => secureStorage.remove(key),
  clearAll: (): void => secureStorage.clearAll(),
}

export type StorageKey = (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS]
