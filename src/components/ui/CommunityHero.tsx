import { Text, View } from 'react-native'
import { useTheme } from '../../theme'
import { Avatar } from './Avatar'
import { Badge } from './Badge'
export function CommunityHero({
  name,
  description,
  memberCount,
  accent,
}: {
  name: string
  description?: string
  memberCount?: number
  accent?: string
}) {
  const { theme } = useTheme()
  const color = accent ?? theme.colors.primary
  return (
    <View
      style={{
        backgroundColor: theme.colors.surface,
        borderRadius: theme.radius.xl,
        borderWidth: 1,
        borderColor: theme.colors.border,
        overflow: 'hidden',
      }}
    >
      <View style={{ height: 92, backgroundColor: color }} />
      <View style={{ padding: 16, marginTop: -34 }}>
        <Avatar name={name} size={68} />
        <Text style={{ fontSize: 22, fontWeight: '800', color: theme.colors.text, marginTop: 10 }}>
          {name}
        </Text>
        {description && (
          <Text
            style={{
              fontSize: 14,
              lineHeight: 20,
              color: theme.colors.textSecondary,
              marginTop: 5,
            }}
          >
            {description}
          </Text>
        )}
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 10 }}>
          {typeof memberCount === 'number' && (
            <Badge tone="neutral">{memberCount.toLocaleString()} members</Badge>
          )}
          <Badge tone="primary">Community</Badge>
        </View>
      </View>
    </View>
  )
}
