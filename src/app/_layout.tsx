import '../../global.css'
import { useEffect } from 'react'
import { AppState, Platform, Pressable, Text, View } from 'react-native'
import { Stack, type ErrorBoundaryProps } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { QueryClientProvider, focusManager } from '@tanstack/react-query'
import { StatusBar } from 'expo-status-bar'
import { AuthProvider } from '@/context/auth-context'
import { queryClient } from '@/lib/query-client'
import { ThemeProvider, useTheme } from '@/theme'

void SplashScreen.preventAutoHideAsync().catch(() => {
  // The native splash may already be controlled by the platform.
})

function AppShell() {
  const { isDark } = useTheme()

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (status) => {
      if (Platform.OS !== 'web') {
        focusManager.setFocused(status === 'active')
      }
    })

    return () => subscription.remove()
  }, [])

  return (
    <>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <Stack screenOptions={{ headerShown: false }} />
    </>
  )
}

export default function RootLayout() {
  useEffect(() => {
    // Never leave users trapped behind the native splash after the first
    // React frame is mounted. Startup data loads inside the app instead.
    void SplashScreen.hideAsync().catch(() => {
      // Ignore duplicate/already-hidden calls.
    })
  }, [])

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

export function ErrorBoundary({ error, retry }: ErrorBoundaryProps) {
  useEffect(() => {
    void SplashScreen.hideAsync().catch(() => {
      // Ensure render errors cannot leave the native splash visible.
    })
  }, [])

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <Text style={{ fontSize: 22, fontWeight: '700', marginBottom: 12 }}>UZZAP could not start</Text>
      <Text style={{ textAlign: 'center', marginBottom: 20 }}>
        {error.message || 'An unexpected startup error occurred.'}
      </Text>
      <Pressable
        accessibilityRole="button"
        onPress={retry}
        style={{ paddingHorizontal: 20, paddingVertical: 12, borderRadius: 10, backgroundColor: '#6D4AFF' }}
      >
        <Text style={{ color: '#FFFFFF', fontWeight: '700' }}>Try again</Text>
      </Pressable>
    </View>
  )
}
