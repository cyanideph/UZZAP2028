import { ReactNode } from 'react'
import { Pressable, Text } from 'react-native'
import { useTheme } from '../../theme'
export function Chip({
  children,
  selected = false,
  onPress,
}: {
  children: ReactNode
  selected?: boolean
  onPress?: () => void
}) {
  const { theme } = useTheme()
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => ({
        paddingHorizontal: 14,
        paddingVertical: 9,
        borderRadius: theme.radius.pill,
        borderWidth: 1,
        borderColor: selected ? theme.colors.primary : theme.colors.border,
        backgroundColor: selected ? theme.colors.primarySoft : theme.colors.surface,
        opacity: pressed ? 0.75 : 1,
      })}
    >
      <Text
        style={{
          fontSize: 13,
          fontWeight: '600',
          color: selected ? theme.colors.primary : theme.colors.textSecondary,
        }}
      >
        {children}
      </Text>
    </Pressable>
  )
}
