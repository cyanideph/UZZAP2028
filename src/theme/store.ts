import { create } from 'zustand'
import { createJSONStorage, persist, type StateStorage } from 'zustand/middleware'
import { mmkvStorage } from '@/lib/storage'

export type ThemePreference = 'system' | 'light' | 'dark'

type ThemeState = {
  preference: ThemePreference
  setPreference: (preference: ThemePreference) => void
}

const themeStorage: StateStorage = {
  getItem: (name) => mmkvStorage.getString(name) ?? null,
  setItem: (name, value) => mmkvStorage.setString(name, value),
  removeItem: (name) => mmkvStorage.delete(name),
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      preference: 'system',
      setPreference: (preference) => set({ preference }),
    }),
    {
      name: 'uzzap2028-theme-preference',
      storage: createJSONStorage(() => themeStorage),
    },
  ),
)
