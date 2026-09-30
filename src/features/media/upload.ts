import { supabase } from '@/lib/supabase'
import type { PickedMedia } from './api'
import { registerMedia } from './records'

export async function uploadAndRegister(
  asset: PickedMedia,
  bucket: 'content-media' | 'room-media',
  roomId?: string | null,
) {
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) throw new Error('You must be signed in.')
  const response = await fetch(asset.uri)
  if (!response.ok) throw new Error('Unable to read selected media.')
  const bytes = await response.arrayBuffer()
  const path = user.id + '/' + Date.now() + '-' + asset.fileName
  const uploaded = await supabase.storage
    .from(bucket)
    .upload(path, bytes, { contentType: asset.mimeType, upsert: false })
  if (uploaded.error) throw uploaded.error
  try {
    return await registerMedia(asset, bucket, path, { roomId })
  } catch (error) {
    await supabase.storage.from(bucket).remove([path])
    throw error
  }
}
