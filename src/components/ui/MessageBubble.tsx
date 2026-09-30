import { Text, View } from 'react-native'
import { useTheme } from '../../theme'
export function MessageBubble({
  text,
  mine = false,
  name,
  time,
}: {
  text: string
  mine?: boolean
  name?: string
  time?: string
}) {
  const { theme } = useTheme()
  return (
    <View style={{ alignItems: mine ? 'flex-end' : 'flex-start', marginVertical: 4 }}>
      {!mine && name && (
        <Text
          style={{
            fontSize: 11,
            fontWeight: '600',
            color: theme.colors.textMuted,
            marginLeft: 10,
            marginBottom: 3,
          }}
        >
          {name}
        </Text>
      )}
      <View
        style={{
          maxWidth: '82%',
          paddingHorizontal: 14,
          paddingVertical: 10,
          borderRadius: 18,
          backgroundColor: mine ? theme.colors.primary : theme.colors.surfaceMuted,
          borderBottomRightRadius: mine ? 5 : 18,
          borderBottomLeftRadius: mine ? 18 : 5,
        }}
      >
        <Text style={{ fontSize: 15, lineHeight: 21, color: mine ? '#fff' : theme.colors.text }}>
          {text}
        </Text>
      </View>
      {time && (
        <Text
          style={{ fontSize: 10, color: theme.colors.textMuted, marginHorizontal: 8, marginTop: 3 }}
        >
          {time}
        </Text>
      )}
    </View>
  )
}
