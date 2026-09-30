import type { ReactNode } from 'react'
import { Modal, Pressable, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useTheme } from '../../theme'

interface BottomSheetProps {
  visible: boolean
  onClose: () => void
  children: ReactNode
}

export function BottomSheet({ visible, onClose, children }: BottomSheetProps) {
  const { theme } = useTheme()
  const insets = useSafeAreaInsets()

  return (
    <Modal
      transparent
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
      accessibilityViewIsModal
    >
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Close sheet"
        onPress={onClose}
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          backgroundColor: theme.colors.overlay,
        }}
      >
        <Pressable
          onPress={() => {}}
          style={{
            maxHeight: '88%',
            backgroundColor: theme.colors.surface,
            borderTopLeftRadius: theme.radius.xl,
            borderTopRightRadius: theme.radius.xl,
            padding: 20,
            paddingBottom: Math.max(insets.bottom + 20, 28),
          }}
        >
          <View
            style={{
              width: 44,
              height: 5,
              borderRadius: 99,
              backgroundColor: theme.colors.border,
              alignSelf: 'center',
              marginBottom: 18,
            }}
          />
          {children}
        </Pressable>
      </Pressable>
    </Modal>
  )
}
