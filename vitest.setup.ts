// Vitest setup file
import { vi } from 'vitest'

;(globalThis as Record<string, unknown>).__DEV__ = false
;(globalThis as Record<string, unknown>).IS_REACT_ACT_ENVIRONMENT = true

vi.mock('react-native', async () => {
  const actual = await vi.importActual<Record<string, unknown>>('react-native-web')

  return {
    ...actual,
    Platform: {
      OS: 'ios',
      select: (options: Record<string, unknown>) => options?.ios ?? options?.default,
    },
    StyleSheet: {
      create: (styles: Record<string, unknown>) => styles,
      flatten: (style: unknown) => style,
    },
    Alert: {
      alert: vi.fn(),
    },
    TouchableOpacity: actual.Pressable,
    TurboModuleRegistry: {
      get: vi.fn(),
      getEnforcing: vi.fn(),
    },
  }
})

vi.mock('expo-linking', () => ({
  createURL: vi.fn((path?: string) => `uzzap2028://${path ?? ''}`),
  parse: vi.fn(() => ({ queryParams: {} })),
}))

vi.mock('expo-web-browser', () => ({
  maybeCompleteAuthSession: vi.fn(),
  openAuthSessionAsync: vi.fn(async () => ({ type: 'dismiss' })),
}))

vi.mock('@react-native-community/netinfo', () => ({
  __esModule: true,
  default: {
    addEventListener: vi.fn(() => vi.fn()),
    fetch: vi.fn(async () => ({ isConnected: true })),
  },
}))

vi.mock('react-native-mmkv', () => ({
  MMKV: vi.fn().mockImplementation(() => ({
    getString: vi.fn(),
    set: vi.fn(),
    delete: vi.fn(),
    contains: vi.fn().mockReturnValue(false),
    getAllKeys: vi.fn().mockReturnValue([]),
  })),
  createMMKV: vi.fn().mockImplementation(() => ({
    getString: vi.fn(),
    set: vi.fn(),
    delete: vi.fn(),
    contains: vi.fn().mockReturnValue(false),
    getAllKeys: vi.fn().mockReturnValue([]),
  })),
}))

vi.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: vi.fn(),
    goBack: vi.fn(),
  }),
  useRoute: () => ({
    params: {},
  }),
}))

vi.mock('expo-router', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
    canGoBack: vi.fn(() => true),
  }),
  useLocalSearchParams: () => ({}),
  Link: vi.fn(),
}))
