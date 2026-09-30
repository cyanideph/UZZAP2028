import { View } from 'react-native'
import { Badge } from './Badge'
import { useTheme } from '../../theme'
export function RoomStatus({
  locked = false,
  viewOnly = false,
  announcement,
}: {
  locked?: boolean
  viewOnly?: boolean
  announcement?: string | null
}) {
  const { theme } = useTheme()
  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6 }}>
      {locked && <Badge tone="danger">Locked</Badge>}
      {viewOnly && <Badge tone="warning">View only</Badge>}
      {announcement && <Badge tone="accent">{announcement}</Badge>}
    </View>
  )
}
