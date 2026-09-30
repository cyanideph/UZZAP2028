import { View } from 'react-native'
import { router, useLocalSearchParams } from 'expo-router'
import { Screen } from '@/components/Screen'
import {
  Button,
  CommunityHero,
  Header,
  Section,
  UserRow,
  RoomStatus,
  LoadingState,
  Text,
} from '@/components/ui'
import { useTheme } from '@/theme'
import {
  useRoomOnlineMembers,
  useJoinRoom,
  useRooms,
  useMyRoomMembership,
} from '@/features/rooms/hooks'
export default function Community() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const roomId = String(id ?? '')
  const { theme } = useTheme()
  const rooms = useRooms()
  const room = (rooms.data ?? []).find((r) => r.id === roomId)
  const membership = useMyRoomMembership(roomId)
  const join = useJoinRoom()
  const members = useRoomOnlineMembers(roomId)
  if (rooms.isLoading)
    return (
      <Screen>
        <Header title="Community" />
        <LoadingState />
      </Screen>
    )
  if (!room)
    return (
      <Screen>
        <Header title="Community" />
        <Text variant="body" style={{ color: theme.colors.danger }}>
          Community unavailable.
        </Text>
      </Screen>
    )
  const memberCount = members.data?.length ?? 0
  const isMember = !!membership.data
  return (
    <Screen>
      <Header
        title={room.name}
        left={
          <Button variant="ghost" onPress={() => router.back()}>
            Back
          </Button>
        }
      />
      <View style={{ gap: 16 }}>
        <CommunityHero
          name={room.name}
          description={room.description ?? 'A place to discover people, rooms and discussions.'}
          memberCount={memberCount}
        />
        <RoomStatus
          announcement={
            room.announcement ?? (room.is_locked ? 'This room is locked' : 'Community is open')
          }
        />
        {membership.isLoading ? null : room.is_locked ? (
          <Text variant="caption" style={{ color: theme.colors.warning }}>
            This community is currently locked.
          </Text>
        ) : isMember ? (
          <Button onPress={() => router.push({ pathname: '/room/[id]', params: { id: room.id } })}>
            Open live chat
          </Button>
        ) : (
          <Button loading={join.isPending} onPress={() => join.mutate(room.id)}>
            Join community
          </Button>
        )}
        <Section title="Online members">
          {memberCount ? (
            members
              .data!.slice(0, 20)
              .map((m: any, i: number) => (
                <UserRow
                  key={m.user_id ?? m.id ?? i}
                  name={m.display_name ?? m.username ?? 'Member'}
                  username={m.username ? '@' + m.username : 'Online'}
                  online
                />
              ))
          ) : (
            <Text variant="caption">No members are currently online.</Text>
          )}
        </Section>
        {!isMember ? (
          <Button
            variant="secondary"
            onPress={() => router.push({ pathname: '/room/[id]', params: { id: room.id } })}
          >
            Preview live chat
          </Button>
        ) : null}
      </View>
    </Screen>
  )
}
