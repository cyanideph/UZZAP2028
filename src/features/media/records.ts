import { supabase } from '@/lib/supabase'
import type { PickedMedia } from './api'

export async function registerMedia(
  asset: PickedMedia,
  bucket: string,
  path: string,
  relation: { contentId?: string | null; roomId?: string | null; messageId?: string | null } = {},
) {
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) throw new Error('You must be signed in to register media.')
  const { data, error } = await supabase
    .from('media')
    .insert({
      owner_id: user.id,
      bucket,
      path,
      mime_type: asset.mimeType,
      size_bytes: asset.fileSize || null,
      width: asset.width ?? null,
      height: asset.height ?? null,
      duration_ms: asset.durationMs ?? null,
      content_id: relation.contentId ?? null,
      room_id: relation.roomId ?? null,
      message_id: relation.messageId ?? null,
      filename: asset.fileName,
    })
    .select('*')
    .single()
  if (error) throw error
  return data
}
