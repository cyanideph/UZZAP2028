export const queryKeys = {
  rooms: {
    all: ['rooms'] as const,
    detail: (roomId: string) => ['rooms', roomId] as const,
    members: (roomId: string) => ['rooms', roomId, 'members'] as const,
    messages: (roomId: string) => ['rooms', roomId, 'messages'] as const,
    membership: (roomId: string) => ['rooms', roomId, 'membership'] as const,
    moderation: (roomId: string) => ['rooms', roomId, 'moderation'] as const,
  },
  conversations: {
    all: ['conversations'] as const,
    detail: (conversationId: string) => ['conversations', conversationId] as const,
    messages: (conversationId: string) => ['conversations', conversationId, 'messages'] as const,
  },
  profiles: {
    all: ['profiles'] as const,
    detail: (userId: string) => ['profiles', userId] as const,
    search: (query: string) => ['profiles', 'search', query] as const,
  },
  social: {
    followers: (userId: string) => ['social', userId, 'followers'] as const,
    following: (userId: string) => ['social', userId, 'following'] as const,
    blocked: (userId: string) => ['social', userId, 'blocked'] as const,
    favorites: (userId: string) => ['social', userId, 'favorites'] as const,
  },
  notifications: {
    all: ['notifications'] as const,
    preferences: ['notifications', 'preferences'] as const,
  },
  content: {
    all: ['content'] as const,
    detail: (contentId: string) => ['content', contentId] as const,
  },
} as const
