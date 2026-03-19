"use client";
import {
  createContext,
  SetStateAction,
  useEffect,
  useContext,
  useRef,
  useState,
} from "react";

interface contextProps {
  isStuck: boolean;
  setIsStuck: React.Dispatch<SetStateAction<boolean>>;
}
const ContextTableHead = createContext<contextProps | undefined>(undefined);

export const useTableHeadContext = () => {
  const context = useContext(ContextTableHead);
  if (context === undefined) {
    throw new Error(
      "useTableHeadContext must be used within a ContextTableHead.Provider",
    );
  }
  return context;
};

function TableHeadBgChange({ children }: { children: React.ReactNode }) {
  const [isStuck, setIsStuck] = useState(false);
  const stickyRef = useRef<HTMLTableSectionElement | null>(null);
  const value = { isStuck, setIsStuck };
  useEffect(() => {
    const copyRef = stickyRef!.current!;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsStuck(!entry.isIntersecting);
      },
      {
        threshold: 0,
        rootMargin: "0px 0px 0px 0px",
      },
    );
    observer.observe(copyRef);

    return () => {
      observer.unobserve(copyRef);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div className=" w-full h-[1px]" ref={stickyRef}></div>
      <ContextTableHead.Provider value={value}>
        <div>{children}</div>
      </ContextTableHead.Provider>
    </>
  );
}

export default TableHeadBgChange;
