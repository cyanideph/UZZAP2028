import { useState } from 'react'
import { Pressable, View } from 'react-native'
import { router } from 'expo-router'
import { Screen } from '@/components/Screen'
import {
  EmptyState,
  Header,
  LoadingState,
  SearchBar,
  SegmentedControl,
  Text,
  UserRow,
} from '@/components/ui'
import { useContentSearch, useRoomSearch } from '@/features/discovery/hooks'
import { CommunityCard } from '@/components/CommunityCard'
import { useProfileSearch } from '@/features/social/hooks'
import { useTheme } from '@/theme'

export default function Search() {
  const { theme } = useTheme()
  const [q, setQ] = useState('')
  const [tab, setTab] = useState('Communities')

  const people = useProfileSearch(tab === 'People' ? q : '')
  const rooms = useRoomSearch(tab === 'Communities' ? q : '')
  const posts = useContentSearch(tab === 'Posts' ? q : '')

  const loading =
    tab === 'People' ? people.isLoading : tab === 'Communities' ? rooms.isLoading : posts.isLoading
  const error =
    tab === 'People' ? people.error : tab === 'Communities' ? rooms.error : posts.error
  const data = tab === 'People' ? people.data : tab === 'Communities' ? rooms.data : posts.data

  return (
    <Screen>
      <Header title="Search" subtitle="People, communities and posts" />
      <View style={{ gap: 16 }}>
        <SearchBar value={q} onChangeText={setQ} placeholder="Search anything" />
        <SegmentedControl
          items={['Communities', 'People', 'Posts']}
          value={tab}
          onChange={setTab}
        />

        {!q ? (
          <EmptyState
            title="Start exploring"
            message="Search for people, communities and posts."
          />
        ) : loading ? (
          <LoadingState />
        ) : error ? (
          <Text variant="caption" style={{ color: theme.colors.danger }}>
            Search failed. Try again.
          </Text>
        ) : tab === 'People' ? (
          Array.isArray(data) && data.length ? (
            data.map((p: any) => (
              <UserRow
                key={p.id}
                name={p.display_name ?? p.username}
                username={p.username}
                online={
                  !!p.last_seen_at &&
                  Date.now() - new Date(p.last_seen_at).getTime() < 120000
                }
                onPress={() =>
                  router.push({
                    pathname: '/profile/[id]',
                    params: { id: p.id },
                  })
                }
              />
            ))
          ) : (
            <EmptyState title="No people found" message="Try another name or username." />
          )
        ) : tab === 'Communities' ? (
          Array.isArray(data) && data.length ? (
            data.map((r: any) => (
              <CommunityCard
                key={r.id}
                name={r.name}
                subtitle={r.description ?? 'Community'}
                onPress={() =>
                  router.push({
                    pathname: '/room/[id]',
                    params: { id: r.id },
                  })
                }
              />
            ))
          ) : (
            <EmptyState title="No communities found" message="Try another room name." />
          )
        ) : Array.isArray(data) && data.length ? (
          data.map((post: any, i: number) => (
            <PostSearchRow
              key={post.id ?? i}
              post={post}
              onPress={() =>
                post.id &&
                router.push({
                  pathname: '/content/[id]',
                  params: { id: String(post.id) },
                })
              }
            />
          ))
        ) : (
          <EmptyState title="No posts found" message="Try a different keyword." />
        )}
      </View>
    </Screen>
  )
}

function PostSearchRow({
  post,
  onPress,
}: {
  post: any
  onPress?: () => void
}) {
  const { theme } = useTheme()

  return (
    <Pressable
      onPress={onPress}
      disabled={!onPress}
      style={({ pressed }) => ({
        padding: 14,
        borderRadius: theme.radius.lg,
        backgroundColor: theme.colors.surface,
        borderWidth: 1,
        borderColor: theme.colors.border,
        gap: 5,
        opacity: pressed ? 0.8 : 1,
      })}
    >
      <Text variant="body" style={{ fontWeight: '700' }}>
        {post.title ?? 'Community post'}
      </Text>
      <Text variant="caption" numberOfLines={3}>
        {post.body ?? 'Community post'}
      </Text>
      <Text variant="caption" style={{ marginTop: 4 }}>
        {post.kind ?? 'post'}
      </Text>
    </Pressable>
  )
}
