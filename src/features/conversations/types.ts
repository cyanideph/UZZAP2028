import type { Database, Tables } from '@/types/database.types'

export type ConversationId = string

export type Conversation =
  Database['public']['Functions']['list_public_chats']['Returns'][number]
export type ConversationMessage = Tables<'conversation_messages'>
export type ConversationMember = Tables<'conversation_members'>
export type ConversationInvite = Tables<'conversation_invites'>

export interface ConversationMessagePage {
  items: ConversationMessage[]
  nextCursor?: { beforeCreatedAt: string; beforeId: string } | null
}
