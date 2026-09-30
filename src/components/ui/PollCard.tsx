import { Pressable, View } from 'react-native'
import { Text } from './Text'
import { useTheme } from '../../theme'
export function PollCard({
  question,
  options,
  onSelect,
  selected,
  disabled = false,
}: {
  question: string
  options: { id: string; label: string; percent?: number }[]
  onSelect?: (id: string) => void
  selected?: string
  disabled?: boolean
}) {
  const { theme } = useTheme()
  return (
    <View
      style={{
        gap: 10,
        padding: 14,
        borderRadius: theme.radius.lg,
        backgroundColor: theme.colors.surfaceMuted,
      }}
    >
      <Text variant="body" style={{ fontWeight: '700' }}>
        {question}
      </Text>
      {options.map((o) => (
        <Pressable
          key={o.id}
          disabled={disabled}
          accessibilityRole="radio"
          accessibilityState={{ selected: selected === o.id, disabled }}
          onPress={() => onSelect?.(o.id)}
          style={({ pressed }) => ({
            padding: 11,
            borderRadius: theme.radius.md,
            borderWidth: 1,
            borderColor: selected === o.id ? theme.colors.primary : theme.colors.border,
            backgroundColor: selected === o.id ? theme.colors.primarySoft : theme.colors.surface,
            opacity: disabled ? 0.55 : pressed ? 0.82 : 1,
          })}
        >
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 10 }}>
            <Text variant="label" style={{ flex: 1 }}>
              {o.label}
            </Text>
            {o.percent !== undefined && <Text variant="caption">{o.percent}%</Text>}
          </View>
        </Pressable>
      ))}
    </View>
  )
}
