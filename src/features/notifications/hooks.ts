import {useEffect} from "react";
import {useMutation,useQuery,useQueryClient} from "@tanstack/react-query";
import type {RealtimeChannel} from "@supabase/supabase-js";
import {listNotifications,markNotificationRead,markAllNotificationsRead,getNotificationPreferences,setNotificationPreferences} from "./api";
import {supabase} from "@/lib/supabase";

export function useNotifications(){
  const qc=useQueryClient();
  const query=useQuery({queryKey:["notifications"],queryFn:()=>listNotifications(),staleTime:10_000,refetchOnReconnect:true});
  useEffect(()=>{
    let active=true;
    let channel:RealtimeChannel|undefined;
    (async()=>{
      const {data}=await supabase.auth.getUser();
      if(!active||!data.user)return;
      channel=supabase.channel(`notifications-live:${data.user.id}`)
        .on("postgres_changes",{event:"INSERT",schema:"public",table:"notifications",filter:`user_id=eq.${data.user.id}`},()=>{
          void qc.invalidateQueries({queryKey:["notifications"]});
        })
        .subscribe();
    })();
    return()=>{
      active=false;
      if(channel)void supabase.removeChannel(channel);
    };
  },[qc]);
  return query;
}

export function useMarkNotificationRead(){
  const qc=useQueryClient();
  return useMutation({
    mutationFn:(id)=>markNotificationRead(id),
    onMutate:async id=>{
      await qc.cancelQueries({queryKey:["notifications"]});
      return {previous:qc.getQueryData(["notifications"])};
    },
    onError:(_e,_id,ctx)=>{
      if(ctx?.previous)qc.setQueryData(["notifications"],ctx.previous);
    },
    onSettled:()=>qc.invalidateQueries({queryKey:["notifications"]}),
  });
}

export function useMarkAllNotificationsRead(){
  const qc=useQueryClient();
  return useMutation({
    mutationFn:()=>markAllNotificationsRead(),
    onMutate:async()=>{
      await qc.cancelQueries({queryKey:["notifications"]});
      return {previous:qc.getQueryData(["notifications"])};
    },
    onError:(_e,_v,ctx)=>{
      if(ctx?.previous)qc.setQueryData(["notifications"],ctx.previous);
    },
    onSettled:()=>qc.invalidateQueries({queryKey:["notifications"]}),
  });
}

export function useNotificationPreferences(){
  return useQuery({queryKey:["notification-preferences"],queryFn:()=>getNotificationPreferences(),staleTime:60_000,refetchOnReconnect:true});
}

export function useSetNotificationPreferences(){
  const qc=useQueryClient();
  return useMutation({
    mutationFn:(next)=>setNotificationPreferences(next),
    onMutate:async next=>{
      await qc.cancelQueries({queryKey:["notification-preferences"]});
      const previous=qc.getQueryData(["notification-preferences"]);
      qc.setQueryData(["notification-preferences"],next);
      return {previous};
    },
    onError:(_e,_v,ctx)=>{
      if(ctx?.previous)qc.setQueryData(["notification-preferences"],ctx.previous);
    },
    onSettled:()=>qc.invalidateQueries({queryKey:["notification-preferences"]}),
  });
}
