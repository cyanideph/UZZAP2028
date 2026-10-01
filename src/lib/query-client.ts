import NetInfo from '@react-native-community/netinfo'
import { QueryClient, onlineManager } from '@tanstack/react-query'
import { queryKeys } from './query-keys'

onlineManager.setEventListener((setOnline) => {
  return NetInfo.addEventListener((state) => {
    setOnline(state.isConnected ?? true)
  })
})

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      gcTime: 30 * 60 * 1000,
      retry: 3,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
      placeholderData: (previousData: unknown) => previousData,
    },
    mutations: {
      retry: 1,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
  },
})

export { queryKeys }

export const invalidateQueries = async (domain: keyof typeof queryKeys) => {
  await queryClient.invalidateQueries({ queryKey: queryKeys[domain].all })
}
