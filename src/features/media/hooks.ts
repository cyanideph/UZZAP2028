import {useMutation} from "@tanstack/react-query";
import {pickMedia,uploadMedia,PickedMedia} from "./api";
import {uploadAndRegister} from "./upload";

export function usePickMedia(){return useMutation({mutationFn:pickMedia});}
export function useUploadMedia(){return useMutation({mutationFn:(value:{asset:PickedMedia;bucket:"content-media"|"room-media"})=>uploadMedia(value.asset,value.bucket)});}
export function useUploadAndRegisterMedia(){return useMutation({mutationFn:(value:{asset:PickedMedia;bucket:"content-media"|"room-media";roomId?:string|null})=>uploadAndRegister(value.asset,value.bucket,value.roomId)});}
