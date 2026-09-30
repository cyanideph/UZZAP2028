import {useEffect,useRef,useState} from "react";
import {useLocalSearchParams,router} from "expo-router";
import {KeyboardAvoidingView,Platform,ScrollView,View} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {Screen} from "@/components/Screen";
import {Button,Composer,Header,IconButton,LoadingState,MessageBubble,Text,UserRow,ReplyPreview} from "@/components/ui";
import {useConversationMessages,useSendConversationMessage,useReplyToConversationMessage} from "@/features/conversations/hooks";
import {useQuery,useMutation,useQueryClient} from "@tanstack/react-query";
import {supabase} from "@/lib/supabase";
import {useTheme} from "@/theme";

type ConversationMessage={id:string;body?:string|null;mine?:boolean;sender_name?:string|null;created_at?:string|null};

export default function Conversation(){
  const {theme}=useTheme();
  const qc=useQueryClient();
  const {id}=useLocalSearchParams<{id:string}>();
  const conversationId=String(id??"");
  const read=useMutation({
    mutationFn:async()=>{
      const {data,error}=await supabase.rpc("mark_conversation_read",{p_conversation_id:conversationId});
      if(error)throw error;
      return data;
    },
    onSuccess:()=>{void qc.invalidateQueries({queryKey:["conversation",conversationId]});},
  });
  const query=useConversationMessages(conversationId);
  const conversation=useQuery({
    queryKey:["conversation",conversationId],
    queryFn:async()=>{
      const {data,error}=await supabase.from("conversations").select("id,title,kind,created_by").eq("id",conversationId).maybeSingle();
      if(error)throw error;
      return data;
    },
    enabled:!!conversationId,
    staleTime:60_000,
  });
  const send=useSendConversationMessage();
  const reply=useReplyToConversationMessage();
  const [error,setError]=useState("");
  const [replying,setReplying]=useState<ConversationMessage|null>(null);
  const messages=(Array.isArray(query.data)?query.data:(query.data?.items??[])) as ConversationMessage[];
  const lastReadMessageId=useRef<string|null>(null);

  useEffect(()=>{
    const latest=messages.at(-1)?.id;
    if(!conversationId||!latest||lastReadMessageId.current===latest||read.isPending)return;
    lastReadMessageId.current=latest;
    read.mutate();
  },[conversationId,messages,read.isPending]);

  const submit=(body:string)=>{
    setError("");
    if(replying){
      reply.mutate({conversationId,messageId:replying.id,body},{
        onSuccess:()=>setReplying(null),
        onError:e=>setError(e instanceof Error?e.message:"Unable to reply"),
      });
      return;
    }
    send.mutate({conversationId,body},{
      onError:e=>setError(e instanceof Error?e.message:"Unable to send message"),
    });
  };

  return <Screen scroll={false}>
    <KeyboardAvoidingView style={{flex:1}} behavior={Platform.OS==="ios"?"padding":undefined}>
      <Header title={conversation.data?.title??"Conversation"} subtitle={conversation.data?.kind==="group"?"Group conversation":"Direct message"}
        left={<IconButton variant="soft" accessibilityLabel="Go back" onPress={()=>router.back()}><Ionicons name="chevron-back" size={22} color={theme.colors.primary}/></IconButton>}
        right={<IconButton variant="soft" accessibilityLabel="Conversation options" disabled><Ionicons name="ellipsis-horizontal" size={20} color={theme.colors.primary}/></IconButton>}
      />
      {conversation.isLoading?<Text variant="caption">Loading conversation…</Text>:<UserRow name={conversation.data?.title??"Member"} username={conversation.data?.kind==="group"?"Group":"Direct message"} />}
      <ScrollView style={{flex:1}} contentContainerStyle={{paddingVertical:12,gap:2}} keyboardShouldPersistTaps="handled">
        {query.isLoading?<LoadingState/>:query.error?<Text variant="caption" style={{color:theme.colors.danger}}>Unable to load this conversation. Please try again.</Text>:messages.length?messages.map((m,i)=>
          <View key={m.id??i}>
            <MessageBubble text={m.body??""} mine={!!m.mine} name={m.sender_name??(!m.mine?"Member":undefined)} time={m.created_at?new Date(m.created_at).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}):"now"}/>
            <Button variant="ghost" onPress={()=>setReplying(m)}>Reply</Button>
          </View>
        ):<Text variant="caption" style={{textAlign:"center",paddingVertical:32}}>No messages yet. Say hello.</Text>}
      </ScrollView>
      {error?<Text variant="caption" style={{color:theme.colors.danger,marginBottom:6}}>{error}</Text>:null}
      {replying?<ReplyPreview author={replying.sender_name??"Member"} text={replying.body??""} onPress={()=>setReplying(null)}/>:null}
      <Composer onSend={submit} disabled={send.isPending||reply.isPending}/>
    </KeyboardAvoidingView>
  </Screen>;
}
