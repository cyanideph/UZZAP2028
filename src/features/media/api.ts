import * as ImagePicker from "expo-image-picker";
import {supabase} from "@/lib/supabase";

export type PickedMedia={uri:string;mimeType:string;fileName:string;fileSize:number;width?:number;height?:number;durationMs?:number};

export async function pickMedia():Promise<PickedMedia[]>{
  const permission=await ImagePicker.requestMediaLibraryPermissionsAsync();
  if(!permission.granted)throw new Error("Photo library permission is required to attach media.");
  const result=await ImagePicker.launchImageLibraryAsync({mediaTypes:ImagePicker.MediaTypeOptions.All,allowsMultipleSelection:true,quality:0.9,selectionLimit:10});
  if(result.canceled)return [];
  return result.assets.map((asset,index)=>{
    const mimeType=asset.mimeType??(asset.type==="video"?"video/mp4":"image/jpeg");
    const fileSize=asset.fileSize??0;
    if(fileSize>50*1024*1024)throw new Error((asset.fileName??"Media")+" is larger than 50 MB.");
    return {uri:asset.uri,mimeType,fileName:asset.fileName??("upload-"+Date.now()+"-"+index),fileSize,width:asset.width,height:asset.height,durationMs:asset.duration??undefined};
  });
}

export async function uploadMedia(asset:PickedMedia,bucket:"content-media"|"room-media"){
  const response=await fetch(asset.uri);
  if(!response.ok)throw new Error("Unable to read selected media.");
  const bytes=await response.arrayBuffer();
  const path="pending/"+Date.now()+"-"+asset.fileName;
  const result=await supabase.storage.from(bucket).upload(path,bytes,{contentType:asset.mimeType,upsert:false});
  if(result.error)throw result.error;
  return {bucket,path};
}
