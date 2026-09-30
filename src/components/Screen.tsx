import { ReactNode } from 'react'
import { ScrollView, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useTheme } from '../theme'
export function Screen({ children, scroll = true }: { children: ReactNode; scroll?: boolean }) {
  const insets = useSafeAreaInsets()
  const { theme } = useTheme()
  const content = (
    <View
      style={{
        paddingTop: Math.max(insets.top, 8),
        paddingBottom: Math.max(insets.bottom + 24, 32),
        paddingHorizontal: 18,
        flexGrow: 1,
      }}
    >
      {children}
    </View>
  )
  return scroll ? (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      style={{ flex: 1, backgroundColor: theme.colors.background }}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      {content}
    </ScrollView>
  ) : (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>{content}</View>
  )
}
