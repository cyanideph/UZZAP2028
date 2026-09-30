import { ReactNode } from 'react'
import { Text, View } from 'react-native'
import { useTheme } from '../../theme'
export function Badge({
  children,
  tone = 'primary',
}: {
  children: ReactNode
  tone?: 'primary' | 'success' | 'warning' | 'danger' | 'neutral' | 'accent'
}) {
  const { theme } = useTheme()
  const bg = {
    primary: theme.colors.primarySoft,
    success: theme.colors.success + '22',
    warning: theme.colors.warning + '22',
    danger: theme.colors.danger + '22',
    neutral: theme.colors.surfaceMuted,
    accent: theme.colors.accentSoft,
  }[tone]
  const fg = {
    primary: theme.colors.primary,
    success: theme.colors.success,
    warning: theme.colors.warning,
    danger: theme.colors.danger,
    neutral: theme.colors.textSecondary,
    accent: theme.colors.secondary,
  }[tone]
  return (
    <View
      style={{
        alignSelf: 'flex-start',
        paddingHorizontal: 9,
        paddingVertical: 5,
        borderRadius: theme.radius.pill,
        backgroundColor: bg,
      }}
    >
      <Text style={{ fontSize: 11, fontWeight: '700', color: fg }}>{children}</Text>
    </View>
  )
}
