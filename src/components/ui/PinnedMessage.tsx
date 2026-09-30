import { View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { Text } from './Text'
import { useTheme } from '../../theme'
export function PinnedMessage({ text }: { text: string }) {
  const { theme } = useTheme()
  return (
    <View
      style={{
        flexDirection: 'row',
        gap: 8,
        padding: 10,
        borderRadius: theme.radius.md,
        backgroundColor: theme.colors.primarySoft,
      }}
    >
      <Ionicons name="pin" size={16} color={theme.colors.primary} />
      <Text variant="caption" style={{ flex: 1 }} numberOfLines={2}>
        {text}
      </Text>
    </View>
  )
}
