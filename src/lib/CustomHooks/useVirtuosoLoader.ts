import { useContainerHeightContext } from "@/Context/ContextContainerHeight";

const itemHeight = 64;
export const useVirtuosoLoader = ({ length }: { length: number }) => {
  const { height } = useContainerHeightContext();
  const maxItem = Math.ceil(height / itemHeight) + 1;
  const autualItem = length;
  const count = Math.min(autualItem, maxItem);
  return count;
};
