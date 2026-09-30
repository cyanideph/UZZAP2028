import { Text, View } from 'react-native'
import { Image } from 'expo-image'
import { useTheme } from '../../theme'
export function Avatar({
  uri,
  name,
  size = 44,
  online = false,
}: {
  uri?: string
  name?: string
  size?: number
  online?: boolean
}) {
  const { theme } = useTheme()
  const initials = (name ?? '?').trim().slice(0, 1).toUpperCase()
  return (
    <View style={{ width: size, height: size }}>
      <View
        style={{
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: theme.colors.primarySoft,
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        {uri ? (
          <Image
            source={{ uri }}
            cachePolicy="memory-disk"
            transition={160}
            contentFit="cover"
            style={{ width: '100%', height: '100%' }}
            placeholder={{ blurhash: 'LEHV6nWB2yk8pyo0adR*.7kCMdnj' }}
          />
        ) : (
          <Text style={{ fontSize: size * 0.36, fontWeight: '800', color: theme.colors.primary }}>
            {initials}
          </Text>
        )}
      </View>
      {online && (
        <View
          accessibilityLabel="Online"
          style={{
            position: 'absolute',
            right: -1,
            bottom: 0,
            width: Math.max(9, size * 0.2),
            height: Math.max(9, size * 0.2),
            borderRadius: 99,
            backgroundColor: theme.colors.success,
            borderWidth: 2,
            borderColor: theme.colors.surface,
          }}
        />
      )}
    </View>
  )
}
