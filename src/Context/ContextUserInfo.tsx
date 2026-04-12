"use client";
import { supabase } from "@/database/supabase";
import { useSongTrack, useVolumeValue } from "@/lib/zustand";
import type { JwtPayload } from "@supabase/supabase-js";
import {
  createContext,
  Dispatch,
  ReactNode,
  RefObject,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
export interface UserInfoContextProps {
  userInfo: JwtPayload | undefined;
  setUserInfo: Dispatch<SetStateAction<JwtPayload | undefined>>;
  immediateLogoutIndicateRef: RefObject<string | null>;
}

interface ContextUserInfoProps {
  user: UserInfoContextProps["userInfo"];
  children: ReactNode;
}

export const UserInfoContext = createContext<UserInfoContextProps | undefined>(
  undefined,
);

export const useUserInfoContext = () => {
  const context = useContext(UserInfoContext);
  if (context === undefined) {
    throw new Error(
      `useUserInfoContext must be used within a UserInfoContext.Provide`,
    );
  }
  return context;
};
function ContextUserInfo({ user, children }: ContextUserInfoProps) {
  const [userInfo, setUserInfo] = useState(user);
  const immediateLogoutIndicateRef = useRef<null | string>("user");
  const value = { userInfo, setUserInfo, immediateLogoutIndicateRef };
  useEffect(() => {
    const supabaseClient = supabase;
    const {
      data: { subscription },
    } = supabaseClient.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_OUT") {
        immediateLogoutIndicateRef.current = null;
        setUserInfo(undefined);
        useVolumeValue.getState().reset();
        useSongTrack.getState().reset();
        window.location.href = "/";
      }
    });
    return () => {
      subscription.unsubscribe();
    };
  }, []);
  return (
    <UserInfoContext.Provider value={value}>
      {children}
    </UserInfoContext.Provider>
  );
}

export default ContextUserInfo;
