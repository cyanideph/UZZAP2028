import { useLocalSearchParams, router } from 'expo-router'
import { useEffect, useState } from 'react'
import { KeyboardAvoidingView, Platform, ScrollView, View, Switch, TextInput } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { Screen } from '@/components/Screen'
import {
  Button,
  Composer,
  Header,
  IconButton,
  LoadingState,
  MessageBubble,
  RoomStatus,
  Text,
  BottomSheet,
  RoomMemberRow,
  MessageActions,
  ReplyPreview,
  StickerPicker,
  MessageReactions,
  ReportSheetContent,
  PinnedMessage,
} from '@/components/ui'
import { useTheme } from '@/theme'
import { useProfileSearch } from '@/features/discovery/hooks'
import {
  useJoinRoom,
  useRoomMessages,
  useSendRoomMessage,
  useRoomOnlineMembers,
  useRoomCoHosts,
  useReplyToRoomMessage,
  useSendRoomSticker,
  useMarkMessageRead,
  useMarkRoomRead,
  useToggleRoomMessageReaction,
  useRooms,
  useCreateRoomReport,
  useMyRoomMembership,
  useSetRoomPinnedMessage,
  useSetRoomMessageMentions,
  useSetRoomLock,
  useSetRoomChatSettings,
  useSetRoomCoHost,
  useModerateRoomMember,
  useKickRoomMember,
  useStrikeRoomMember,
} from '@/features/rooms/hooks'
export default function Room() {
  const { theme } = useTheme()
  const { id } = useLocalSearchParams<{ id: string }>()
  const roomId = String(id ?? '')
  const rooms = useRooms()
  const room = rooms.data?.find((r) => r.id === roomId)
  const membership = useMyRoomMembership(roomId)
  const messages = useRoomMessages(roomId, !!membership.data)
  const members = useRoomOnlineMembers(roomId)
  const cohosts = useRoomCoHosts(roomId)
  const join = useJoinRoom()
  const send = useSendRoomMessage()
  const reply = useReplyToRoomMessage()
  const sticker = useSendRoomSticker()
  const markMessage = useMarkMessageRead()
  const markRoom = useMarkRoomRead()
  const react = useToggleRoomMessageReaction()
  const report = useCreateRoomReport()
  const [mentionText, setMentionText] = useState('')
  const mentionSearch = mentionText.match(/@([A-Za-z0-9_]{1,32})$/)?.[1] ?? ''
  const mentionResults = useProfileSearch(mentionSearch)
  const [mentionIds, setMentionIds] = useState<string[]>([])
  const pin = useSetRoomPinnedMessage()
  const cohost = useSetRoomCoHost()
  const lock = useSetRoomLock()
  const settings = useSetRoomChatSettings()
  const moderate = useModerateRoomMember()
  const kick = useKickRoomMember()
  const strike = useStrikeRoomMember()
  const setMentions = useSetRoomMessageMentions()
  const isStaff = ['owner', 'admin', 'moderator'].includes(String(membership.data?.role ?? ''))
  const [draftError, setDraftError] = useState('')
  const [showMembers, setShowMembers] = useState(false)
  const [showStickers, setShowStickers] = useState(false)
  const [showControls, setShowControls] = useState(false)
  const [announcement, setAnnouncement] = useState(room?.announcement ?? '')
  const [viewOnly, setViewOnly] = useState(!!room?.view_only)
  const [membersCanInvite, setMembersCanInvite] = useState(room?.members_can_invite !== false)
  const [selectedMember, setSelectedMember] = useState<any>(null)
  const [reporting, setReporting] = useState<any>(null)
  const [replying, setReplying] = useState<any>(null)
  const rows = Array.isArray(messages.data) ? messages.data : []
  useEffect(() => {
    setAnnouncement(room?.announcement ?? '')
    setViewOnly(!!room?.view_only)
    setMembersCanInvite(room?.members_can_invite !== false)
  }, [room?.announcement, room?.view_only, room?.members_can_invite])
  useEffect(() => {
    if (roomId) markRoom.mutate(roomId)
  }, [roomId, markRoom.mutate])
  useEffect(() => {
    const latestIncoming = [...rows].reverse().find((m: any) => m?.id && !m?.mine && !m?.is_read)
    if (latestIncoming?.id) markMessage.mutate(String(latestIncoming.id))
  }, [roomId, rows.length, rows.at(-1)?.id, rows.at(-1)?.is_read, markMessage.mutate])
  const submit = (body: string) => {
    setDraftError('')
    if (replying) {
      reply.mutate(
        { roomId, messageId: String(replying.id), body },
        {
          onSuccess: (data: any) => {
            if (data?.id && mentionIds.length)
              setMentions.mutate({ messageId: String(data.id), userIds: mentionIds })
            setMentionIds([])
            setReplying(null)
          },
          onError: (e: Error) => setDraftError(e.message ?? 'Reply failed'),
        },
      )
      return
    }
    send.mutate(
      { roomId, body },
      {
        onSuccess: (data: any) => {
          if (data?.id && mentionIds.length)
            setMentions.mutate({ messageId: String(data.id), userIds: mentionIds })
          setMentionIds([])
        },
        onError: (e) => setDraftError((e as Error).message ?? 'Message failed'),
      },
    )
  }
  return (
    <Screen scroll={false}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <Header
          title={room?.name ?? 'Community Room'}
          subtitle={
            room?.province_code
              ? room.province_code + ' • ' + (cohosts.data?.length ?? 0) + ' co-hosts'
              : 'Live conversation'
          }
          left={
            <IconButton variant="soft" accessibilityLabel="Go back" onPress={() => router.back()}>
              <Ionicons name="chevron-back" size={22} color={theme.colors.primary} />
            </IconButton>
          }
          right={
            <View style={{ flexDirection: 'row', gap: 6 }}>
              {isStaff ? (
                <IconButton
                  variant="soft"
                  accessibilityLabel="Room controls"
                  onPress={() => setShowControls(true)}
                >
                  <Ionicons name="settings-outline" size={20} color={theme.colors.primary} />
                </IconButton>
              ) : null}
              <IconButton
                variant="soft"
                accessibilityLabel="Show online members"
                onPress={() => setShowMembers(true)}
              >
                <Ionicons name="people-outline" size={20} color={theme.colors.primary} />
              </IconButton>
            </View>
          }
        />
        <RoomStatus
          locked={room?.is_locked}
          viewOnly={room?.view_only}
          announcement={room?.announcement}
        />
        {room?.pinned_message_id
          ? (() => {
              const pinned = rows.find((m: any) => m.id === room.pinned_message_id)
              return pinned ? <PinnedMessage text={pinned.body ?? 'Pinned message'} /> : null
            })()
          : null}
        {membership.data ? (
          <Text variant="caption" style={{ color: theme.colors.success }}>
            You are a member of this room.
          </Text>
        ) : (
          <Button
            variant="secondary"
            loading={join.isPending}
            disabled={room?.is_locked}
            onPress={() => join.mutate(roomId)}
          >
            {room?.is_locked ? 'Room locked' : 'Join room'}
          </Button>
        )}
        {draftError ? (
          <Text variant="caption" style={{ color: theme.colors.danger, marginTop: 8 }}>
            {draftError}
          </Text>
        ) : null}
        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingVertical: 12, gap: 2 }}>
          {messages.isLoading ? (
            <LoadingState />
          ) : messages.error ? (
            <Text variant="caption" style={{ color: theme.colors.danger }}>
              Unable to load messages. Try again.
            </Text>
          ) : rows.length ? (
            rows.map((m: any, i) => (
              <View key={m.id ?? i}>
                <MessageBubble
                  text={m.body ?? m.metadata?.label ?? ''}
                  name={m.sender_name ?? 'Member'}
                  mine={!!m.mine}
                  time={
                    m.created_at
                      ? new Date(m.created_at).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })
                      : 'now'
                  }
                />
                <MessageActions onReply={() => setReplying(m)} onReport={() => setReporting(m)} />
                {m.id ? (
                  <MessageReactions
                    counts={m.reaction_counts ?? {}}
                    selected={Array.isArray(m.my_reactions) ? m.my_reactions : []}
                    onReact={(reaction) => {
                      if (m.id)
                        react.mutate(
                          { messageId: String(m.id), reaction },
                          {
                            onError: (e) =>
                              setDraftError((e as Error).message ?? 'Reaction failed'),
                          },
                        )
                    }}
                  />
                ) : null}
                {m.id && !m.is_read ? (
                  <IconButton
                    size={36}
                    variant="soft"
                    accessibilityLabel="Mark message read"
                    onPress={() => markMessage.mutate(String(m.id))}
                  >
                    <Ionicons name="checkmark-done-outline" size={17} color={theme.colors.accent} />
                  </IconButton>
                ) : null}
              </View>
            ))
          ) : (
            <Text variant="caption" style={{ textAlign: 'center', paddingVertical: 32 }}>
              No messages yet. Start the conversation.
            </Text>
          )}
        </ScrollView>
        {replying ? (
          <View style={{ marginTop: 8 }}>
            <ReplyPreview
              author={replying.sender_name ?? 'Member'}
              text={replying.body ?? ''}
              onPress={() => setReplying(null)}
            />
          </View>
        ) : null}
        <Composer
          disabled={
            !membership.data ||
            !!room?.view_only ||
            !!room?.is_locked ||
            send.isPending ||
            reply.isPending ||
            sticker.isPending
          }
          onSend={submit}
          onSticker={() => setShowStickers(true)}
          onTextChange={setMentionText}
          onMentionSelect={(user) => {
            setMentionIds((current) => Array.from(new Set([...current, user.id])))
          }}
          mentionSuggestions={mentionResults.data as any[] | undefined}
        />
      </KeyboardAvoidingView>
      <BottomSheet visible={showControls} onClose={() => setShowControls(false)}>
        <Text variant="title">Room controls</Text>
        <Text variant="caption" style={{ marginTop: 4, marginBottom: 12 }}>
          Staff-only controls are protected again by backend authorization.
        </Text>
        <View style={{ gap: 10 }}>
          <Text variant="caption">Announcement</Text>
          <View
            style={{
              borderWidth: 1,
              borderColor: theme.colors.border,
              borderRadius: theme.radius.md,
              paddingHorizontal: 12,
              backgroundColor: theme.colors.surface,
            }}
          >
            <TextInput
              value={announcement}
              onChangeText={setAnnouncement}
              placeholder="Optional room announcement"
              placeholderTextColor={theme.colors.textMuted}
              style={{ minHeight: 44, color: theme.colors.text }}
            />
          </View>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
          >
            <Text variant="body">View-only mode</Text>
            <Switch value={viewOnly} onValueChange={setViewOnly} />
          </View>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
          >
            <Text variant="body">Members can invite</Text>
            <Switch value={membersCanInvite} onValueChange={setMembersCanInvite} />
          </View>
          <Button
            variant="primary"
            loading={settings.isPending}
            onPress={() =>
              settings.mutate(
                { roomId, announcement: announcement.trim() || null, viewOnly, membersCanInvite },
                {
                  onSuccess: () => setShowControls(false),
                  onError: (e) => setDraftError((e as Error).message ?? 'Settings update failed'),
                },
              )
            }
          >
            Save room settings
          </Button>
          <Button
            variant="secondary"
            loading={pin.isPending}
            disabled={!rows.length}
            onPress={() => {
              const id = rows[rows.length - 1]?.id
              if (id)
                pin.mutate({
                  roomId,
                  messageId: room?.pinned_message_id === id ? null : String(id),
                })
            }}
          >
            {room?.pinned_message_id ? 'Unpin latest' : 'Pin latest message'}
          </Button>
          <Button
            variant="secondary"
            loading={lock.isPending}
            onPress={() =>
              lock.mutate({
                roomId,
                locked: !room?.is_locked,
                reason: room?.is_locked ? 'Staff unlocked room' : 'Staff locked room',
              })
            }
          >
            {room?.is_locked ? 'Unlock room' : 'Lock room'}
          </Button>
          <Button
            variant="ghost"
            onPress={() => router.push({ pathname: '/moderation', params: { roomId } })}
          >
            Open moderation
          </Button>
        </View>
      </BottomSheet>
      <BottomSheet visible={showMembers} onClose={() => setShowMembers(false)}>
        <Text variant="title">Online members</Text>
        <Text variant="caption" style={{ marginTop: 4, marginBottom: 12 }}>
          {members.data?.length ?? 0} online now{isStaff ? ' • Staff controls enabled' : ''}
        </Text>
        {members.isLoading ? (
          <LoadingState />
        ) : Array.isArray(members.data) && members.data.length ? (
          members.data.map((m: any) => (
            <RoomMemberRow
              key={m.user_id}
              name={m.nickname ?? 'Member'}
              role={m.role}
              online={m.is_online}
              onPress={isStaff && m.user_id ? () => setSelectedMember(m) : undefined}
            />
          ))
        ) : (
          <Text variant="caption">No members currently online.</Text>
        )}
      </BottomSheet>
      <BottomSheet visible={!!selectedMember} onClose={() => setSelectedMember(null)}>
        <Text variant="title">Member actions</Text>
        <Text variant="caption" style={{ marginTop: 4, marginBottom: 12 }}>
          {selectedMember?.nickname ?? 'Member'} • {selectedMember?.role ?? 'member'}
        </Text>
        <View style={{ gap: 8 }}>
          <Button
            variant="secondary"
            loading={moderate.isPending}
            disabled={selectedMember?.role === 'owner'}
            onPress={() =>
              moderate.mutate(
                {
                  roomId,
                  targetUserId: String(selectedMember.user_id),
                  action: 'mute',
                  durationMinutes: 10,
                  reason: 'Staff moderation',
                },
                {
                  onSuccess: () => setSelectedMember(null),
                  onError: (e) => setDraftError((e as Error).message ?? 'Mute failed'),
                },
              )
            }
          >
            Mute 10 minutes
          </Button>
          <Button
            variant="secondary"
            loading={strike.isPending}
            disabled={selectedMember?.role === 'owner'}
            onPress={() =>
              strike.mutate(
                {
                  roomId,
                  targetUserId: String(selectedMember.user_id),
                  durationMinutes: 60,
                  reason: 'Staff moderation',
                },
                {
                  onSuccess: () => setSelectedMember(null),
                  onError: (e) => setDraftError((e as Error).message ?? 'Strike failed'),
                },
              )
            }
          >
            Issue 1-hour strike
          </Button>
          <Button
            variant="secondary"
            loading={cohost.isPending}
            disabled={selectedMember?.role === 'owner'}
            onPress={() => {
              const enabled = !cohosts.data?.some(
                (x: any) => String(x.user_id) === String(selectedMember?.user_id),
              )
              cohost.mutate(
                { roomId, targetUserId: String(selectedMember.user_id), enabled },
                {
                  onSuccess: () => setSelectedMember(null),
                  onError: (e) => setDraftError((e as Error).message ?? 'Co-host update failed'),
                },
              )
            }}
          >
            {cohosts.data?.some((x: any) => String(x.user_id) === String(selectedMember?.user_id))
              ? 'Remove co-host'
              : 'Make co-host'}
          </Button>
          <Button
            variant="danger"
            loading={kick.isPending}
            disabled={selectedMember?.role === 'owner'}
            onPress={() =>
              kick.mutate(
                {
                  roomId,
                  targetUserId: String(selectedMember.user_id),
                  allowRejoin: true,
                  reason: 'Staff moderation',
                },
                {
                  onSuccess: () => setSelectedMember(null),
                  onError: (e) => setDraftError((e as Error).message ?? 'Kick failed'),
                },
              )
            }
          >
            Kick from room
          </Button>
        </View>
      </BottomSheet>
      <BottomSheet visible={showStickers} onClose={() => setShowStickers(false)}>
        <Text variant="title">Stickers</Text>
        <Text variant="caption" style={{ marginTop: 4 }}>
          Send a quick reaction to the room.
        </Text>
        <StickerPicker
          onSelect={(stickerId, label) => {
            sticker.mutate(
              { roomId, stickerId },
              {
                onSuccess: () => setShowStickers(false),
                onError: (e) => setDraftError((e as Error).message ?? 'Sticker failed'),
              },
            )
          }}
        />
      </BottomSheet>
      <BottomSheet visible={!!reporting} onClose={() => setReporting(null)}>
        <Text variant="title">Report message</Text>
        <Text variant="caption" style={{ marginTop: 4, marginBottom: 12 }}>
          Choose the reason. Your report is sent privately to room staff.
        </Text>
        <ReportSheetContent
          onSelect={(reason) => {
            if (!reporting?.id) return
            report.mutate(
              {
                roomId,
                messageId: String(reporting.id),
                reportedUserId: reporting.sender_id ? String(reporting.sender_id) : null,
                reason,
              },
              {
                onSuccess: () => {
                  setReporting(null)
                  setDraftError('Report submitted.')
                },
                onError: (e) => setDraftError((e as Error).message ?? 'Report failed'),
              },
            )
          }}
        />
      </BottomSheet>
    </Screen>
  )
}
