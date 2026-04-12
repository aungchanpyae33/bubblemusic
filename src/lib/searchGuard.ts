export const searchGuard = (query: string | undefined) => {
  if (
    !query ||
    typeof query !== "string" ||
    query.trim() === "" ||
    query.length > 100 ||
    query.length === 0
  ) {
    return true;
  }
};
