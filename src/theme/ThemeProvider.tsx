import {PropsWithChildren,createContext,useContext,useMemo} from "react";
import {useColorScheme} from "react-native";
import {darkTheme,lightTheme,AppTheme} from "./tokens";
import {ThemePreference,useThemeStore} from "./store";
type ThemeContextValue={theme:AppTheme;preference:ThemePreference;isDark:boolean;setPreference:(preference:ThemePreference)=>void};
const ThemeContext=createContext<ThemeContextValue|null>(null);
export function ThemeProvider({children}:PropsWithChildren){
 const system=useColorScheme(); const {preference,setPreference}=useThemeStore(); const isDark=preference==="dark"||(preference==="system"&&system==="dark");
 const theme=useMemo(()=>isDark?darkTheme:lightTheme,[isDark]);
 return <ThemeContext.Provider value={{theme,preference,isDark,setPreference}}>{children}</ThemeContext.Provider>;
}
export function useTheme(){const value=useContext(ThemeContext);if(!value)throw new Error("useTheme must be used inside ThemeProvider");return value;}