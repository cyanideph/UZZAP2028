import { supabase } from './supabase'
import type { RealtimeChannel } from '@supabase/supabase-js'
export function subscribeToRoomMessages(
  roomId: string,
  onMessage: (payload: any) => void,
): RealtimeChannel {
  return supabase
    .channel('room:' + roomId)
    .on(
      'postgres_changes',
      { event: 'INSERT', schema: 'public', table: 'room_messages', filter: 'room_id=eq.' + roomId },
      onMessage,
    )
    .subscribe()
}
export function subscribeToConversationMessages(
  conversationId: string,
  onMessage: (payload: any) => void,
): RealtimeChannel {
  return supabase
    .channel('conversation:' + conversationId)
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'conversation_messages',
        filter: 'conversation_id=eq.' + conversationId,
      },
      onMessage,
    )
    .subscribe()
}
export function subscribeToNotifications(
  userId: string,
  onNotification: (payload: any) => void,
): RealtimeChannel {
  return supabase
    .channel('notifications:' + userId)
    .on(
      'postgres_changes',
      { event: 'INSERT', schema: 'public', table: 'notifications', filter: 'user_id=eq.' + userId },
      onNotification,
    )
    .subscribe()
}
export async function removeRealtimeChannel(channel: RealtimeChannel) {
  await supabase.removeChannel(channel)
}
