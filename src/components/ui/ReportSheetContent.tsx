import { View, Pressable } from 'react-native'
import { Text } from './Text'
import { useTheme } from '../../theme'
export function ReportSheetContent({ onSelect }: { onSelect?: (reason: string) => void }) {
  const { theme } = useTheme()
  return (
    <View style={{ gap: 8 }}>
      {['Spam', 'Harassment', 'Hate or abuse', 'Sexual content', 'Other'].map((x) => (
        <Pressable
          key={x}
          onPress={() => onSelect?.(x)}
          style={{
            padding: 14,
            borderRadius: theme.radius.md,
            backgroundColor: theme.colors.surfaceMuted,
          }}
        >
          <Text variant="body">{x}</Text>
        </Pressable>
      ))}
    </View>
  )
}
