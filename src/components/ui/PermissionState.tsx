import { View } from 'react-native'
import { Text } from './Text'
import { Button } from './Button'
export function PermissionState({
  title,
  message,
  action,
  onPress,
}: {
  title: string
  message: string
  action?: string
  onPress?: () => void
}) {
  return (
    <View style={{ alignItems: 'center', padding: 30, gap: 10 }}>
      <Text variant="subtitle">{title}</Text>
      <Text variant="caption" style={{ textAlign: 'center' }}>
        {message}
      </Text>
      {action && <Button onPress={onPress}>{action}</Button>}
    </View>
  )
}
