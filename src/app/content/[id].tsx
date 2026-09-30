import { Ionicons } from '@expo/vector-icons'
import { View } from 'react-native'
import { router, useLocalSearchParams } from 'expo-router'
import { Screen } from '@/components/Screen'
import {
  Button,
  Card,
  Header,
  Input,
  LoadingState,
  Section,
  Text,
  UserRow,
  PollCard,
} from '@/components/ui'
import { useTheme } from '@/theme'
import {
  useContent,
  usePollOptions,
  useContentComments,
  useAddContentComment,
  useToggleContentReaction,
  useToggleContentSave,
  useRepostContent,
  useVotePoll,
  usePollResults,
} from '@/features/content/hooks'
import { useState } from 'react'
export default function ContentDetail() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const contentId = String(id ?? '')
  const { theme } = useTheme()
  const comments = useContentComments(contentId)
  const add = useAddContentComment()
  const react = useToggleContentReaction()
  const save = useToggleContentSave()
  const repost = useRepostContent()
  const [body, setBody] = useState('')
  const [selectedOption, setSelectedOption] = useState<string>()
  const content = useContent(contentId)
  const poll = usePollOptions(contentId, content.data?.kind === 'poll')
  const vote = useVotePoll()
  const pollResults = usePollResults(contentId)
  if (content.isLoading)
    return (
      <Screen>
        <Header title="Post" />
        <LoadingState />
      </Screen>
    )
  if (content.error || !content.data)
    return (
      <Screen>
        <Header title="Post" />
        <Text variant="body" style={{ color: theme.colors.danger }}>
          Post unavailable.
        </Text>
      </Screen>
    )
  const p = content.data
  return (
    <Screen>
      <Header
        title={p.kind === 'poll' ? 'Poll' : 'Post'}
        left={
          <Button variant="ghost" onPress={() => router.back()}>
            Back
          </Button>
        }
      />
      <View style={{ gap: 16 }}>
        <Card>
          <Text variant="caption">{p.kind === 'poll' ? 'Poll' : 'Community post'}</Text>
          {p.title ? (
            <Text variant="title" style={{ marginTop: 6 }}>
              {p.title}
            </Text>
          ) : null}
          {p.body ? (
            <Text variant="body" style={{ marginTop: 8 }}>
              {p.body}
            </Text>
          ) : null}
          {p.kind === 'poll' && poll.data?.length ? (
            <PollCard
              question={p.title ?? 'Poll'}
              options={(pollResults.data?.items?.length
                ? pollResults.data.items
                : (poll.data ?? [])
              ).map((o: { id: string | number; label: string; percent?: number }) => ({
                id: String(o.id),
                label: o.label,
                percent: Number(o.percent ?? 0),
              }))}
              selected={
                pollResults.data?.items?.find((o: { id: string; mine?: boolean }) => o.mine)?.id ??
                selectedOption
              }
              disabled={vote.isPending}
              onSelect={(id) => {
                setSelectedOption(id)
                vote.mutate({ contentId, optionId: id })
              }}
            />
          ) : null}
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 14 }}>
            <Button
              variant="secondary"
              onPress={() => react.mutate({ contentId, reaction: 'like' })}
            >
              <Ionicons name="heart-outline" size={17} color={theme.colors.social} /> Like
            </Button>
            <Button variant="secondary" onPress={() => save.mutate(contentId)}>
              <Ionicons name="bookmark-outline" size={17} color={theme.colors.primary} /> Save
            </Button>
            <Button variant="secondary" onPress={() => repost.mutate({ contentId })}>
              <Ionicons name="repeat-outline" size={17} color={theme.colors.accent} /> Repost
            </Button>
          </View>
        </Card>
        {p.kind === 'poll' && pollResults.data ? (
          <Text variant="caption">Total votes: {pollResults.data.total_votes ?? 0}</Text>
        ) : null}
        <Section title="Comments">
          <View style={{ gap: 10 }}>
            {comments.isLoading ? (
              <LoadingState />
            ) : comments.data?.length ? (
              comments.data.map(
                (
                  x: {
                    id?: string
                    author_name?: string
                    author_id?: string
                    created_at?: string
                    body?: string
                  },
                  i: number,
                ) => (
                  <UserRow
                    key={x.id ?? i}
                    name={x.author_name ?? x.author_id ?? 'Member'}
                    username={x.created_at ? new Date(x.created_at).toLocaleDateString() : ''}
                    right={
                      <Text variant="caption" numberOfLines={3}>
                        {x.body ?? ''}
                      </Text>
                    }
                  />
                ),
              )
            ) : (
              <Text variant="caption">No comments yet.</Text>
            )}
            <Input value={body} onChangeText={setBody} placeholder="Write a comment…" />
            <Button
              loading={add.isPending}
              disabled={!body.trim()}
              onPress={() =>
                add.mutate({ contentId, body: body.trim() }, { onSuccess: () => setBody('') })
              }
            >
              Comment
            </Button>
          </View>
        </Section>
      </View>
    </Screen>
  )
}
