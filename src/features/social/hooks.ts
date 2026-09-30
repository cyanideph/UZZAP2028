import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  getProfile,
  getSocialState,
  searchProfiles,
  toggleFollow,
  toggleFavorite,
  toggleBlock,
  listBlockedUsers,
  listFollowers,
  listFollowing,
  listProfileComments,
  addProfileComment,
  recordProfileVisit,
} from './api'
export function useProfileSearch(query: string) {
  return useQuery({
    queryKey: ['profiles', 'search', query],
    queryFn: () => searchProfiles(query),
    enabled: query.trim().length > 0,
    staleTime: 30_000,
  })
}
export function useProfile(id: string) {
  return useQuery({
    queryKey: ['profile', id],
    queryFn: () => getProfile(id),
    enabled: !!id,
    staleTime: 30_000,
  })
}
export function useSocialState(id: string) {
  return useQuery({
    queryKey: ['profile', id, 'social-state'],
    queryFn: () => getSocialState(id),
    enabled: !!id,
    staleTime: 15_000,
    refetchOnReconnect: true,
  })
}
function useOptimisticSocialMutation(
  fn: (id: string) => Promise<unknown>,
  field: 'following' | 'favorite' | 'blocked',
) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: fn,
    onMutate: async (target) => {
      const key = ['profile', target, 'social-state'] as const
      await qc.cancelQueries({ queryKey: key })
      const previous = qc.getQueryData<{ following: boolean; favorite: boolean; blocked: boolean }>(
        key,
      )
      if (previous) qc.setQueryData(key, { ...previous, [field]: !previous[field] })
      return { previous, key }
    },
    onError: (_e, _target, ctx) => {
      if (ctx?.previous) qc.setQueryData(ctx.key, ctx.previous)
    },
    onSettled: (_d, target) => {
      qc.invalidateQueries({ queryKey: ['profile', target, 'social-state'] })
      qc.invalidateQueries({ queryKey: ['profiles'] })
    },
  })
}
export function useToggleFollow() {
  return useOptimisticSocialMutation(toggleFollow, 'following')
}
export function useToggleFavorite() {
  return useOptimisticSocialMutation(toggleFavorite, 'favorite')
}
export function useToggleBlock() {
  return useOptimisticSocialMutation(toggleBlock, 'blocked')
}
export function useBlockedUsers() {
  return useQuery({
    queryKey: ['blocked-users'],
    queryFn: () => listBlockedUsers(100),
    staleTime: 15_000,
    refetchOnReconnect: true,
  })
}
export function useFollowers(id: string) {
  return useQuery({
    queryKey: ['profile', id, 'followers'],
    queryFn: () => listFollowers(id),
    enabled: !!id,
    staleTime: 30_000,
    refetchOnReconnect: true,
  })
}
export function useFollowing(id: string) {
  return useQuery({
    queryKey: ['profile', id, 'following'],
    queryFn: () => listFollowing(id),
    enabled: !!id,
    staleTime: 30_000,
    refetchOnReconnect: true,
  })
}
export function useProfileComments(id: string) {
  return useQuery({
    queryKey: ['profile', id, 'comments'],
    queryFn: () => listProfileComments(id),
    enabled: !!id,
    staleTime: 15_000,
    refetchOnReconnect: true,
  })
}
export function useAddProfileComment() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ profileId, body }: { profileId: string; body: string }) =>
      addProfileComment(profileId, body),
    onSuccess: (_, v) => qc.invalidateQueries({ queryKey: ['profile', v.profileId, 'comments'] }),
  })
}
export function useRecordProfileVisit() {
  return useMutation({ mutationFn: recordProfileVisit })
}
