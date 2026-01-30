type Relative = {
  id: string;
  name: string;
};

export function outputRelative(
  related_id?: string | null,
  related_name?: string | null,
): Relative | undefined {
  if (!related_id || !related_name) return undefined;

  return {
    id: related_id,
    name: related_name,
  };
}
