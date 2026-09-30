import { View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useTheme } from '../../theme'
import { IconButton } from './IconButton'
import { Text } from './Text'
export function ReactionBar({
  likes = 0,
  comments = 0,
  saved = false,
  onLike,
  onComment,
  onSave,
}: {
  likes?: number
  comments?: number
  saved?: boolean
  onLike?: () => void
  onComment?: () => void
  onSave?: () => void
}) {
  const { theme } = useTheme()
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}>
      <IconButton size={40} onPress={onLike}>
        <Ionicons name={likes ? 'heart' : 'heart-outline'} size={19} color={theme.colors.social} />
      </IconButton>
      <Text variant="caption">{likes}</Text>
      <IconButton size={40} onPress={onComment}>
        <Ionicons name="chatbubble-outline" size={18} color={theme.colors.textSecondary} />
      </IconButton>
      <Text variant="caption">{comments}</Text>
      <IconButton size={40} onPress={onSave}>
        <Ionicons
          name={saved ? 'bookmark' : 'bookmark-outline'}
          size={19}
          color={saved ? theme.colors.primary : theme.colors.textSecondary}
        />
      </IconButton>
    </View>
  )
}
