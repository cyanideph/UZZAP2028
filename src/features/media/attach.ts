import {supabase} from "@/lib/supabase";

export async function attachRoomMessageMedia(messageId:string,mediaIds:string[]){
  if(!mediaIds.length)return;
  const {error}=await supabase.rpc("attach_room_message_media",{p_message_id:messageId,p_media_ids:mediaIds});
  if(error)throw error;
}
