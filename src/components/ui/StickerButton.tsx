import { Pressable } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useTheme } from '../../theme'
export function StickerButton({ onPress }: { onPress?: () => void }) {
  const { theme } = useTheme()
  return (
    <Pressable
      onPress={onPress}
      style={{
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.colors.primarySoft,
      }}
    >
      <Ionicons name="happy-outline" size={21} color={theme.colors.primary} />
    </Pressable>
  )
}
