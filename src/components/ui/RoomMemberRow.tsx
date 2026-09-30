import { Pressable, View } from 'react-native'
import { Avatar, RoleBadge, Text } from '@/components/ui'
export function RoomMemberRow({
  name,
  username,
  role,
  online,
  onPress,
}: {
  name: string
  username?: string
  role?: string
  online?: boolean
  onPress?: () => void
}) {
  const body = (
    <View style={{ minHeight: 58, flexDirection: 'row', alignItems: 'center', gap: 10 }}>
      <Avatar name={name} size={40} online={online} />
      <View style={{ flex: 1 }}>
        <Text variant="body" style={{ fontWeight: '700' }}>
          {name}
        </Text>
        {username && <Text variant="caption">@{username}</Text>}
      </View>
      {role && <RoleBadge role={role} />}
    </View>
  )
  return onPress ? (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => ({ opacity: pressed ? 0.65 : 1 })}
    >
      {body}
    </Pressable>
  ) : (
    body
  )
}
