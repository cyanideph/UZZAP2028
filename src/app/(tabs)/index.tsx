import { Ionicons } from '@expo/vector-icons'
import { View } from 'react-native'
import { router } from 'expo-router'
import { Screen } from '@/components/Screen'
import { CommunityCard } from '@/components/CommunityCard'
import {
  Header,
  IconButton,
  Section,
  SearchBar,
  Text,
  Card,
  PostCard,
  LoadingState,
  EmptyState,
} from '@/components/ui'
import { useTheme } from '@/theme'
import { useRooms } from '@/features/rooms/hooks'
import {
  useContentFeed,
  useToggleContentReaction,
  useToggleContentSave,
  useRepostContent,
} from '@/features/content/hooks'
export default function Home() {
  const { theme } = useTheme()
  const reaction = useToggleContentReaction()
  const save = useToggleContentSave()
  const repost = useRepostContent()
  const rooms = useRooms()
  const feed = useContentFeed()
  const firstRooms = (rooms.data ?? []).slice(0, 3)
  const posts = Array.isArray(feed.data) ? feed.data : []
  return (
    <Screen>
      <Header
        title="Discover"
        subtitle="Find people, communities and conversations"
        right={
          <IconButton variant="soft" onPress={() => router.push('/notifications')}>
            <Ionicons name="notifications-outline" size={21} color={theme.colors.primary} />
          </IconButton>
        }
      />
      <View style={{ gap: 20 }}>
        <SearchBar
          placeholder="Search communities, people, posts"
          onFocus={() => router.push('/search')}
        />
        <Card
          style={{
            backgroundColor: theme.colors.primary,
            borderColor: theme.colors.primary,
            padding: 22,
          }}
        >
          <Text variant="label" style={{ color: '#EDE9FE' }}>
            DISCOVER YOUR PEOPLE
          </Text>
          <Text variant="title" style={{ color: '#FFFFFF', marginTop: 6 }}>
            Find conversations that feel like home.
          </Text>
          <Text variant="body" style={{ color: '#EDE9FE', marginTop: 5 }}>
            Explore rooms, meet people, and jump into live conversations.
          </Text>
        </Card>
        <Section title="Popular communities">
          {rooms.isLoading ? (
            <LoadingState />
          ) : firstRooms.length ? (
            firstRooms.map((r) => (
              <CommunityCard
                key={r.id}
                name={r.name}
                subtitle={[r.province_code, r.kind].filter(Boolean).join(' · ')}
                color={theme.colors.primary}
                onPress={() => router.push({ pathname: '/room/[id]', params: { id: r.id } })}
              />
            ))
          ) : (
            <Text variant="caption">Communities will appear here when available.</Text>
          )}
        </Section>
        <Section title="Latest from the community">
          {feed.isLoading ? (
            <LoadingState />
          ) : posts.length ? (
            posts.map((post: any) => (
              <PostCard
                key={post.id}
                author={post.author_name ?? post.author_id ?? 'Community'}
                body={post.body ?? post.title ?? 'Community post'}
                likes={post.reaction_count ?? post.likes_count ?? 0}
                comments={post.comment_count ?? post.comments_count ?? 0}
                onLike={() => reaction.mutate({ contentId: post.id, reaction: 'like' })}
                onSave={() => save.mutate(post.id)}
                onComment={() =>
                  router.push({ pathname: '/content/[id]', params: { id: String(post.id) } })
                }
                onRepost={() => repost.mutate({ contentId: post.id })}
              />
            ))
          ) : (
            <EmptyState
              title="Your feed is quiet"
              message="Be the first to start a conversation."
            />
          )}
        </Section>
      </View>
    </Screen>
  )
}
