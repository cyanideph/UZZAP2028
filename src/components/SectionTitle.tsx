import { Text, View } from 'react-native'
export function SectionTitle({ title, action }: { title: string; action?: string }) {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
      }}
    >
      <Text style={{ fontSize: 21, fontWeight: '800', color: '#17181A' }}>{title}</Text>
      {action ? (
        <Text style={{ fontSize: 13, fontWeight: '700', color: '#6C4DFF' }}>{action}</Text>
      ) : null}
    </View>
  )
}
