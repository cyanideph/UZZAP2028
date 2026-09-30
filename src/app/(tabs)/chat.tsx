import { Ionicons } from '@expo/vector-icons'
import { Pressable, View } from 'react-native'
import { router } from 'expo-router'
import { Screen } from '@/components/Screen'
import {
  Avatar,
  Header,
  IconButton,
  SearchBar,
  Text,
  EmptyState,
  LoadingState,
} from '@/components/ui'
import { useTheme } from '@/theme'
import { useState } from 'react'
import { usePublicChats } from '@/features/discovery/hooks'
export default function Chat() {
  const { theme } = useTheme()
  const [q, setQ] = useState('')
  const chats = usePublicChats()
  const rows = (Array.isArray(chats.data) ? chats.data : []).filter(
    (c: any) =>
      !q.trim() ||
      c.name?.toLowerCase().includes(q.toLowerCase()) ||
      c.description?.toLowerCase().includes(q.toLowerCase()),
  )
  return (
    <Screen>
      <Header
        title="Chats"
        subtitle="Public conversations · live"
        right={
          <IconButton variant="soft" onPress={() => router.push('/search')}>
            <Ionicons name="search" size={21} color={theme.colors.primary} />
          </IconButton>
        }
      />
      <View style={{ gap: 12 }}>
        <SearchBar value={q} onChangeText={setQ} placeholder="Search public chats" />
        {chats.isLoading ? (
          <LoadingState />
        ) : chats.error ? (
          <Text variant="caption" style={{ color: theme.colors.danger }}>
            Unable to load chats. Try again.
          </Text>
        ) : rows.length ? (
          rows.map((c: any) => (
            <Pressable
              key={c.id}
              onPress={() => router.push({ pathname: '/room/[id]', params: { id: c.id } })}
              style={({ pressed }) => ({
                flexDirection: 'row',
                alignItems: 'center',
                padding: 14,
                borderRadius: theme.radius.lg,
                backgroundColor: theme.colors.surface,
                borderWidth: 1,
                borderColor: theme.colors.border,
                opacity: pressed ? 0.8 : 1,
                transform: [{ scale: pressed ? 0.99 : 1 }],
              })}
            >
              <Avatar name={c.name} size={48} online={(c.online_count ?? 0) > 0} />
              <View style={{ flex: 1, marginLeft: 12 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 8 }}>
                  <Text variant="body" style={{ fontWeight: '700' }}>
                    {c.name}
                  </Text>
                  <Text variant="caption">{c.online_count ?? 0} online</Text>
                </View>
                <Text variant="caption" numberOfLines={1} style={{ marginTop: 4 }}>
                  {c.description ?? 'Public community chat'}
                </Text>
              </View>
            </Pressable>
          ))
        ) : (
          <EmptyState
            title="No public chats"
            message={q ? 'Try another search.' : 'There are no public conversations yet.'}
          />
        )}
      </View>
    </Screen>
  )
}
