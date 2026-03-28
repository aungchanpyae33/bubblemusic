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

export type NormalizedByIdOnly<T> = {
  byId: Record<string, T>;
};

export function normalizeByIdOnly<T extends { id: string }>(
  items: T[] | null,
): NormalizedByIdOnly<T> | null {
  if (!items) return null;

  const byId: Record<string, T> = {};

  for (const item of items) {
    byId[item.id] = item;
  }

  return { byId };
}
