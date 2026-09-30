import { View } from 'react-native'
import { useEffect, useState } from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import { Screen } from '@/components/Screen'
import {
  Avatar,
  Button,
  Card,
  Header,
  Section,
  Text,
  LoadingState,
  Input,
  UserRow,
} from '@/components/ui'
import {
  useProfile,
  useSocialState,
  useToggleBlock,
  useToggleFavorite,
  useToggleFollow,
  useFollowers,
  useFollowing,
  useProfileComments,
  useAddProfileComment,
  useRecordProfileVisit,
} from '@/features/social/hooks'
import { useTheme } from '@/theme'
import { useCreateConversation } from '@/features/conversations/hooks'
export default function ProfileDetail() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const profileId = String(id ?? '')
  const profile = useProfile(profileId)
  const social = useSocialState(profileId)
  const follow = useToggleFollow()
  const favorite = useToggleFavorite()
  const block = useToggleBlock()
  const followers = useFollowers(profileId)
  const following = useFollowing(profileId)
  const comments = useProfileComments(profileId)
  const addComment = useAddProfileComment()
  const createConversation = useCreateConversation()
  const { mutate: recordVisit } = useRecordProfileVisit()
  const [comment, setComment] = useState('')
  useEffect(() => {
    if (profileId) recordVisit(profileId)
  }, [profileId, recordVisit])
  const { theme } = useTheme()
  if (profile.isLoading)
    return (
      <Screen>
        <Header title="Profile" />
        <LoadingState />
      </Screen>
    )
  if (profile.error || !profile.data)
    return (
      <Screen>
        <Header title="Profile" />
        <Text variant="body" style={{ color: theme.colors.danger }}>
          Profile unavailable.
        </Text>
      </Screen>
    )
  const p = profile.data
  const name = p.display_name ?? p.username
  const online = !!p.last_seen_at && Date.now() - new Date(p.last_seen_at).getTime() < 120000
  const state = social.data ?? { following: false, favorite: false, blocked: false }
  return (
    <Screen>
      <Header title="Profile" />
      <View style={{ gap: 16 }}>
        <Card style={{ alignItems: 'center', paddingVertical: 24 }}>
          <Avatar name={name} uri={p.avatar_path ?? undefined} size={92} online={online} />
          <Text variant="title" style={{ marginTop: 12 }}>
            {name}
          </Text>
          <Text variant="caption">@{p.username}</Text>
          {p.bio ? (
            <Text variant="body" style={{ textAlign: 'center', marginTop: 10 }}>
              {p.bio}
            </Text>
          ) : null}
          {p.status_text ? (
            <Text variant="caption" style={{ marginTop: 6 }}>
              {p.status_text}
            </Text>
          ) : null}
          <View style={{ flexDirection: 'row', gap: 10, marginTop: 18 }}>
            <Button
              loading={follow.isPending}
              disabled={state.blocked}
              onPress={() => follow.mutate(profileId)}
            >
              {' '}
              {state.following ? 'Following' : 'Follow'}{' '}
            </Button>
            <Button
              variant="secondary"
              disabled={state.blocked}
              loading={createConversation.isPending}
              onPress={() =>
                createConversation.mutate(
                  { kind: 'private', title: null, memberIds: [profileId] },
                  {
                    onSuccess: (data: any) => {
                      const conversationId = data?.id ?? data?.[0]?.id
                      if (conversationId)
                        router.push({
                          pathname: '/conversation/[id]',
                          params: { id: conversationId },
                        })
                    },
                  },
                )
              }
            >
              Message
            </Button>
          </View>
          <View style={{ flexDirection: 'row', gap: 10, marginTop: 10 }}>
            <Button
              variant="ghost"
              loading={favorite.isPending}
              disabled={state.blocked}
              onPress={() => favorite.mutate(profileId)}
            >
              {state.favorite ? 'Favorited' : 'Favorite'}
            </Button>
            <Button
              variant="danger"
              loading={block.isPending}
              onPress={() => block.mutate(profileId)}
            >
              {state.blocked ? 'Unblock' : 'Block'}
            </Button>
          </View>
        </Card>
        <Section title="Community">
          <View style={{ flexDirection: 'row', gap: 24 }}>
            <View>
              <Text variant="title">{followers.data?.length ?? 0}</Text>
              <Text variant="caption">Followers</Text>
            </View>
            <View>
              <Text variant="title">{following.data?.length ?? 0}</Text>
              <Text variant="caption">Following</Text>
            </View>
          </View>
        </Section>
        <Section title="Comments">
          <View style={{ gap: 10 }}>
            {comments.isLoading ? (
              <LoadingState />
            ) : comments.data?.length ? (
              comments.data.slice(0, 20).map((x: any, i: number) => (
                <UserRow
                  key={x.id ?? i}
                  name={x.author_name ?? x.author_id ?? 'Member'}
                  username={x.created_at ? new Date(x.created_at).toLocaleDateString() : ''}
                  right={
                    <Text variant="caption" numberOfLines={2}>
                      {x.body ?? ''}
                    </Text>
                  }
                />
              ))
            ) : (
              <Text variant="caption">Be the first to leave a comment.</Text>
            )}
            <Input
              value={comment}
              onChangeText={setComment}
              placeholder="Write a profile comment…"
            />
            <Button
              loading={addComment.isPending}
              disabled={!comment.trim()}
              onPress={() => {
                addComment.mutate(
                  { profileId: profileId, body: comment.trim() },
                  { onSuccess: () => setComment('') },
                )
              }}
            >
              Comment
            </Button>
          </View>
        </Section>
        <Section title="About">
          <Text variant="caption">{p.is_active ? 'Active account' : 'Inactive account'}</Text>
        </Section>
      </View>
    </Screen>
  )
}
