import { Text, Pressable, View } from 'react-native'
import { useTheme } from '../../theme'
export function SegmentedControl({
  items,
  value,
  onChange,
}: {
  items: string[]
  value: string
  onChange: (v: string) => void
}) {
  const { theme } = useTheme()
  return (
    <View
      style={{
        flexDirection: 'row',
        padding: 3,
        borderRadius: theme.radius.md,
        backgroundColor: theme.colors.surfaceMuted,
      }}
    >
      {items.map((item) => (
        <Pressable
          key={item}
          onPress={() => onChange(item)}
          style={{
            flex: 1,
            paddingVertical: 9,
            borderRadius: theme.radius.sm,
            alignItems: 'center',
            backgroundColor: value === item ? theme.colors.surface : 'transparent',
          }}
        >
          <Text
            style={{
              fontSize: 13,
              fontWeight: value === item ? '700' : '500',
              color: value === item ? theme.colors.text : theme.colors.textSecondary,
            }}
          >
            {item}
          </Text>
        </Pressable>
      ))}
    </View>
  )
}
