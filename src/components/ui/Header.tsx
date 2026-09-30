import { ReactNode } from 'react'
import { View, Text } from 'react-native'
import { useTheme } from '../../theme'
export function Header({
  title,
  subtitle,
  left,
  right,
}: {
  title: string
  subtitle?: string
  left?: ReactNode
  right?: ReactNode
}) {
  const { theme } = useTheme()
  return (
    <View
      style={{
        minHeight: 64,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        paddingVertical: 6,
      }}
    >
      <View
        style={{ width: 44, minHeight: 44, alignItems: 'flex-start', justifyContent: 'center' }}
      >
        {left}
      </View>
      <View style={{ flex: 1, minWidth: 0 }}>
        <Text
          numberOfLines={1}
          style={{
            fontSize: 21,
            fontWeight: '800',
            letterSpacing: -0.35,
            color: theme.colors.text,
          }}
        >
          {title}
        </Text>
        {subtitle && (
          <Text
            numberOfLines={1}
            style={{ fontSize: 12, color: theme.colors.textSecondary, marginTop: 3 }}
          >
            {subtitle}
          </Text>
        )}
      </View>
      <View
        style={{
          minWidth: right ? 44 : 0,
          minHeight: 44,
          alignItems: 'flex-end',
          justifyContent: 'center',
        }}
      >
        {right}
      </View>
    </View>
  )
}
