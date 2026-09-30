import { View } from 'react-native'
import { Text } from './Text'
import { Avatar } from './Avatar'
import { useTheme } from '../../theme'
export function LeaderboardRow({
  rank,
  name,
  points,
}: {
  rank: number
  name: string
  points: number
}) {
  const { theme } = useTheme()
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.border,
      }}
    >
      <Text variant="subtitle" style={{ width: 28, textAlign: 'center' }}>
        {rank}
      </Text>
      <Avatar name={name} size={40} />
      <Text variant="body" style={{ flex: 1, fontWeight: '700' }}>
        {name}
      </Text>
      <Text variant="label">{points.toLocaleString()} pts</Text>
    </View>
  )
}
