import { ReactNode } from 'react'
import { ActivityIndicator, Pressable, Text, ViewStyle } from 'react-native'
import { useTheme } from '../../theme'
export function Button({
  children,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  style,
}: {
  children: ReactNode
  onPress?: () => void
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
  style?: ViewStyle
}) {
  const { theme } = useTheme()
  const bg =
    variant === 'primary'
      ? theme.colors.primary
      : variant === 'danger'
        ? theme.colors.danger
        : variant === 'secondary'
          ? theme.colors.primarySoft
          : 'transparent'
  const fg =
    variant === 'secondary' || variant === 'ghost'
      ? theme.colors.primary
      : variant === 'danger'
        ? theme.colors.onDanger
        : theme.colors.onPrimary
  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled || loading}
      onPress={onPress}
      style={({ pressed }) => [
        {
          minHeight: size === 'sm' ? 40 : size === 'lg' ? 56 : 48,
          paddingHorizontal: size === 'sm' ? 14 : 18,
          borderRadius: theme.radius.md,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: bg,
          opacity: disabled ? 0.45 : pressed ? 0.82 : 1,
          borderWidth: variant === 'ghost' ? 0 : 1,
          borderColor: variant === 'secondary' ? theme.colors.border : 'transparent',
        },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={fg} />
      ) : (
        <Text style={{ color: fg, fontSize: 15, fontWeight: '700' }}>{children}</Text>
      )}
    </Pressable>
  )
}
