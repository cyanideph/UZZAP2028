import {useQuery} from "@tanstack/react-query"; import {searchRooms,searchContent,listPublicChats,searchProfiles} from "./api";
export function useRoomSearch(query:string){return useQuery({queryKey:["rooms","search",query],queryFn:()=>searchRooms(query),enabled:query.trim().length>0,staleTime:30_000});}
export function useContentSearch(query:string){return useQuery({queryKey:["content","search",query],queryFn:()=>searchContent(query),enabled:query.trim().length>0,staleTime:15_000});}
export function usePublicChats(){return useQuery({queryKey:["public-chats"],queryFn:listPublicChats,staleTime:30_000,refetchOnReconnect:true});}
export function useProfileSearch(query:string){return useQuery({queryKey:["profiles","search",query],queryFn:()=>searchProfiles(query),enabled:query.trim().length>0,staleTime:15_000});}
