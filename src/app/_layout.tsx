import "../../global.css";
import {useEffect} from "react";
import {AppState,Platform} from "react-native";
import {Stack} from "expo-router";
import {SafeAreaProvider} from "react-native-safe-area-context";
import {QueryClient,QueryClientProvider,focusManager} from "@tanstack/react-query";
import {StatusBar} from "expo-status-bar";
import {useTheme,ThemeProvider} from "@/theme";

const queryClient=new QueryClient({
  defaultOptions:{
    queries:{
      retry:2,
      refetchOnReconnect:true,
      refetchOnWindowFocus:false,
    },
  },
});

function AppShell(){
  const {isDark}=useTheme();
  useEffect(()=>{
    const subscription=AppState.addEventListener("change",status=>{
      if(Platform.OS!=="web") focusManager.setFocused(status==="active");
    });
    return()=>subscription.remove();
  },[]);
  return <><StatusBar style={isDark?"light":"dark"}/><Stack screenOptions={{headerShown:false}}/></>;
}

export default function RootLayout(){
  return <SafeAreaProvider><QueryClientProvider client={queryClient}><ThemeProvider><AppShell/></ThemeProvider></QueryClientProvider></SafeAreaProvider>;
}
