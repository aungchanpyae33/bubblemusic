"use client";
import { useEffect, useState } from "react";

export const useNaviSet = () => {
  const [isNavigating, setIsNavigating] = useState(false);
  useEffect(() => {
    return () => {
      setIsNavigating(false);
    };
  }, []);
  return [isNavigating, setIsNavigating] as const;
};
