export type NormalizedById<T> = {
  byId: Record<string, T>;
  idArray: string[];
};
export function normalizeById<T extends { id: string }>(
  items: T[] | null,
): NormalizedById<T> | null {
  if (!items) return null;

  const result: NormalizedById<T> = {
    byId: {},
    idArray: [],
  };

  for (const item of items) {
    result.byId[item.id] = item;
    result.idArray.push(item.id);
  }

  return result;
}
