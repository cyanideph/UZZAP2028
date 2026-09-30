import { Ionicons } from '@expo/vector-icons'
import { Redirect, Tabs } from 'expo-router'
import { useEffect } from 'react'
import { useOnboardingStore } from '@/features/onboarding'
import { useAuth } from '@/context'
import { useTheme } from '@/theme'

export default function TabsLayout() {
  const { theme } = useTheme()
  const { isAuthenticated, isInitializing } = useAuth()
  const onboardingCompleted = useOnboardingStore((state) => state.isCompleted)

  useEffect(() => {
    if (isInitializing || isAuthenticated) return
  }, [isInitializing, isAuthenticated])

  if (isInitializing) return null
  if (!isAuthenticated) return <Redirect href="/(auth)/welcome" />
  if (!onboardingCompleted) return <Redirect href="/onboarding" />

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.tabBarInactive,
        tabBarStyle: {
          height: 64,
          paddingTop: 7,
          paddingBottom: 8,
          borderTopColor: theme.colors.border,
          backgroundColor: theme.colors.tabBar,
        },
      }}
    >
      <Tabs.Screen name="index" options={{ title: 'Home', tabBarIcon: ({ color, size }) => <Ionicons name="home" color={color} size={size} /> }} />
      <Tabs.Screen name="communities" options={{ title: 'Communities', tabBarIcon: ({ color, size }) => <Ionicons name="people" color={color} size={size} /> }} />
      <Tabs.Screen name="chat" options={{ title: 'Chat', tabBarIcon: ({ color, size }) => <Ionicons name="chatbubbles" color={color} size={size} /> }} />
      <Tabs.Screen name="profile" options={{ title: 'Profile', tabBarIcon: ({ color, size }) => <Ionicons name="person" color={color} size={size} /> }} />
    </Tabs>
  )
}
