import { supabase } from '@/lib/supabase'
export type ContentRecord = {
  id: string
  title: string | null
  body: string | null
  kind: string
  author_id: string
  created_at: string
}
export type PollOption = { id: string; label: string; position: number }
export async function getContent(id: string): Promise<ContentRecord | null> {
  const { data, error } = await supabase
    .from('contents')
    .select('id,title,body,kind,author_id,created_at')
    .eq('id', id)
    .maybeSingle()
  if (error) throw error
  return data as ContentRecord | null
}
export async function listPollOptions(contentId: string): Promise<PollOption[]> {
  const { data, error } = await supabase
    .from('poll_options')
    .select('id,label,position')
    .eq('content_id', contentId)
    .order('position', { ascending: true })
  if (error) throw error
  return (data ?? []) as PollOption[]
}
export async function listContentFeed(
  roomId: string | null = null,
  authorId: string | null = null,
  beforeCreatedAt: string | null = null,
  beforeId: string | null = null,
  limit = 20,
) {
  const { data, error } = await supabase.rpc('list_content_feed', {
    p_room_id: roomId,
    p_author_id: authorId,
    p_before_created_at: beforeCreatedAt,
    p_before_id: beforeId,
    p_limit: limit,
  })
  if (error) throw error
  return Array.isArray(data) ? data : (data?.items ?? [])
}
export async function createContent(
  roomId: string | null,
  kind: string,
  title: string | null,
  body: string | null,
  metadata: Record<string, unknown> = {},
) {
  const { data, error } = await supabase.rpc('create_content', {
    p_room_id: roomId,
    p_kind: kind,
    p_title: title,
    p_body: body,
    p_metadata: metadata,
  })
  if (error) throw error
  return data
}
export async function toggleReaction(contentId: string, reaction: string) {
  const { data, error } = await supabase.rpc('toggle_content_reaction', {
    p_content_id: contentId,
    p_reaction: reaction,
  })
  if (error) throw error
  return data
}
export async function toggleSave(contentId: string) {
  const { data, error } = await supabase.rpc('toggle_content_save', { p_content_id: contentId })
  if (error) throw error
  return data
}
export async function votePoll(contentId: string, optionId: string) {
  const { data, error } = await supabase.rpc('vote_content_poll', {
    p_content_id: contentId,
    p_option_id: optionId,
  })
  if (error) throw error
  return data
}
export async function getPollResults(contentId: string) {
  const { data, error } = await supabase.rpc('get_content_poll_results', {
    p_content_id: contentId,
  })
  if (error) throw error
  return data ?? { total_votes: 0, items: [] }
}
export async function listContentComments(
  contentId: string,
  beforeCreatedAt: string | null = null,
  beforeId: string | null = null,
  limit = 50,
) {
  const { data, error } = await supabase.rpc('list_content_comments', {
    p_content_id: contentId,
    p_before_created_at: beforeCreatedAt,
    p_before_id: beforeId,
    p_limit: limit,
  })
  if (error) throw error
  return Array.isArray(data) ? data : (data?.items ?? [])
}
export async function addContentComment(
  contentId: string,
  body: string,
  parentId: string | null = null,
) {
  const { data, error } = await supabase.rpc('add_content_comment', {
    p_content_id: contentId,
    p_body: body,
    p_parent_id: parentId,
  })
  if (error) throw error
  return data
}
export async function repostContent(contentId: string, roomId: string | null = null) {
  const { data, error } = await supabase.rpc('repost_content', {
    p_content_id: contentId,
    p_room_id: roomId ?? null,
  })
  if (error) throw error
  return data
}
