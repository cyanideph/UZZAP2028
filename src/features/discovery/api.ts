import { supabase } from '@/lib/supabase'
export async function searchRooms(query: string, limit = 20) {
  const { data, error } = await supabase.rpc('search_public_rooms', {
    p_query: query,
    p_limit: limit,
  })
  if (error) throw error
  return data ?? []
}
export async function searchContent(query: string, limit = 20) {
  const { data, error } = await supabase.rpc('search_content', {
    p_query: query,
    p_room_id: null,
    p_limit: limit,
    p_offset: 0,
  })
  if (error) throw error
  return data
}
export async function listPublicChats(limit = 30, offset = 0) {
  const { data, error } = await supabase.rpc('list_public_chats', {
    p_limit: limit,
    p_offset: offset,
  })
  if (error) throw error
  return data ?? []
}
export async function searchProfiles(query: string, limit = 8) {
  const { data, error } = await supabase.rpc('search_profiles', { p_query: query, p_limit: limit })
  if (error) throw error
  return data ?? []
}
