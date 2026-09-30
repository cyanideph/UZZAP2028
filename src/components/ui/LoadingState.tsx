import { ActivityIndicator, View } from 'react-native'
import { useTheme } from '../../theme'
export function LoadingState() {
  const { theme } = useTheme()
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 32 }}>
      <ActivityIndicator size="large" color={theme.colors.primary} />
    </View>
  )
}
