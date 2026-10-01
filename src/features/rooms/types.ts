import type { Database, Tables } from '@/types/database.types'

export type RoomId = string

export type Room = Database['public']['Functions']['list_public_rooms']['Returns'][number]
export type RoomMessage = Database['public']['Functions']['list_room_messages']['Returns'][number]
export type RoomMember = Database['public']['Functions']['list_room_members']['Returns'][number]
export type OnlineRoomMember = Database['public']['Functions']['list_online_room_members']['Returns'][number]
export type RoomCoHost = Database['public']['Functions']['list_room_co_hosts']['Returns'][number]
export type RoomMembership = Tables<'room_members'>

export interface RoomMessagePage {
  items: RoomMessage[]
  nextCursor?: { beforeCreatedAt: string; beforeId: string } | null
}
