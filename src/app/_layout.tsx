import '../../global.css'
import { useEffect } from 'react'
import { AppState, Platform } from 'react-native'
import * as SplashScreen from 'expo-splash-screen'
import { Stack } from 'expo-router'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { QueryClientProvider, focusManager } from '@tanstack/react-query'
import { StatusBar } from 'expo-status-bar'
import { AuthProvider, useAuth } from '@/context/auth-context'
import { queryClient } from '@/lib/query-client'
import { ThemeProvider, useTheme } from '@/theme'

void SplashScreen.preventAutoHideAsync().catch(() => {})

function AppShell() {
  const { isDark } = useTheme()
  const { isInitializing } = useAuth()

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (status) => {
      if (Platform.OS !== 'web') {
        focusManager.setFocused(status === 'active')
      }
    })

    return () => subscription.remove()
  }, [])

  useEffect(() => {
    if (!isInitializing) {
      void SplashScreen.hideAsync().catch(() => {})
      return
    }

    // Never leave a user permanently trapped on the native splash if an
    // authentication/network initialization call takes too long.
    const timeout = setTimeout(() => {
      void SplashScreen.hideAsync().catch(() => {})
    }, 10000)

    return () => clearTimeout(timeout)
  }, [isInitializing])

  return (
    <>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <Stack screenOptions={{ headerShown: false }} />
    </>
  )
}

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <ThemeProvider>
            <AppShell />
          </ThemeProvider>
        </AuthProvider>
      </QueryClientProvider>
    </SafeAreaProvider>
  )
}
