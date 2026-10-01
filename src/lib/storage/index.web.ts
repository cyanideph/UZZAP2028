type StorageLike = {
  getItem(key: string): string | null
  setItem(key: string, value: string): void
  removeItem(key: string): void
  clear(): void
  key(index: number): string | null
  readonly length: number
}

const memoryStorage = new Map<string, string>()

function getWebStorage(): StorageLike | null {
  if (typeof globalThis === 'undefined') return null
  return (globalThis as typeof globalThis & { localStorage?: StorageLike }).localStorage ?? null
}

function getItem(key: string): string | null {
  return getWebStorage()?.getItem(key) ?? memoryStorage.get(key) ?? null
}

function setItem(key: string, value: string): void {
  const storage = getWebStorage()
  if (storage) storage.setItem(key, value)
  else memoryStorage.set(key, value)
}

function removeItem(key: string): void {
  getWebStorage()?.removeItem(key)
  memoryStorage.delete(key)
}

function clearItems(): void {
  getWebStorage()?.clear()
  memoryStorage.clear()
}

function allKeys(): string[] {
  const storage = getWebStorage()
  if (!storage) return [...memoryStorage.keys()]
  return Array.from({ length: storage.length }, (_, index) => storage.key(index)).filter(
    (key): key is string => key !== null,
  )
}

function makeStorage() {
  return {
    getString: (key: string): string | undefined => getItem(key) ?? undefined,
    setString: (key: string, value: string): void => setItem(key, value),
    getNumber: (key: string): number | undefined => {
      const value = getItem(key)
      if (value === null) return undefined
      const number = Number(value)
      return Number.isNaN(number) ? undefined : number
    },
    setNumber: (key: string, value: number): void => setItem(key, String(value)),
    getBoolean: (key: string): boolean | undefined => {
      const value = getItem(key)
      if (value === null) return undefined
      return value === 'true'
    },
    setBoolean: (key: string, value: boolean): void => setItem(key, String(value)),
    getObject: <T>(key: string): T | null => {
      const value = getItem(key)
      if (!value) return null
      try { return JSON.parse(value) as T } catch { return null }
    },
    setObject: <T>(key: string, value: T): void => setItem(key, JSON.stringify(value)),
    delete: (key: string): void => removeItem(key),
    contains: (key: string): boolean => getItem(key) !== null,
    clearAll: (): void => clearItems(),
    getAllKeys: (): string[] => allKeys(),
  }
}

export const storage = makeStorage()
export const secureStorage = storage
export const mmkvStorage = storage
export const secureMMKVStorage = {
  getString: storage.getString,
  setString: storage.setString,
  getObject: storage.getObject,
  setObject: storage.setObject,
  delete: storage.delete,
  clearAll: storage.clearAll,
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

export type StorageKey = (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS]
