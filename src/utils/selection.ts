export const toggleId = (ids: string[], id: string): string[] => {
  return ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id];
};

export const toggleAllIds = (ids: string[], allIds: string[]): string[] => {
  return ids.length === allIds.length ? [] : allIds;
};

export const isChecked = (ids: string[], id: string): boolean => ids.includes(id);

export const isAllChecked = (ids: string[], allIds: string[]): boolean =>
  ids.length === allIds.length;

export const isAnyChecked = (ids: string[]): boolean => ids.length > 0;
