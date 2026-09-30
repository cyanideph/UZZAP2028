export type ConversationId = string

export interface ConversationMessagePage {
  items: unknown[]
  nextCursor?: { beforeCreatedAt: string; beforeId: string } | null
}
