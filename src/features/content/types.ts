export type ContentId = string

export interface ContentPage {
  items: unknown[]
  nextCursor?: { beforeCreatedAt: string; beforeId: string } | null
}
