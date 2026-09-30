import {createMMKV} from "react-native-mmkv";

export const storage=createMMKV({id:"aminoappuiclone"});

export const mmkvStorage={
  getString:(key:string)=>storage.getString(key),
  setString:(key:string,value:string)=>storage.set(key,value),
  remove:(key:string)=>storage.remove(key),
  contains:(key:string)=>storage.contains(key),
};
