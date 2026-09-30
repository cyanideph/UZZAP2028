import { Pressable, View } from 'react-native'
import { Avatar } from './Avatar'
import { Badge } from './Badge'
import { Text } from './Text'
import { useTheme } from '../../theme'

interface NotificationRowProps {
  actor: string
  title: string
  time: string
  unread?: boolean
  onPress?: () => void
}

export function NotificationRow({
  actor,
  title,
  time,
  unread = false,
  onPress,
}: NotificationRowProps) {
  const { theme } = useTheme()

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => ({
        opacity: pressed ? 0.75 : 1,
        flexDirection: 'row',
        gap: 12,
        padding: 14,
        borderRadius: theme.radius.lg,
        backgroundColor: unread ? theme.colors.primarySoft : theme.colors.surface,
        borderWidth: 1,
        borderColor: theme.colors.border,
      })}
    >
      <Avatar name={actor} size={44} />
      <View style={{ flex: 1, gap: 3 }}>
        <Text variant="body">{title}</Text>
        <Text variant="caption">{time}</Text>
      </View>
      {unread && <Badge tone="primary">New</Badge>}
    </Pressable>
  )
}
