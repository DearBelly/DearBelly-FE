import type { CategoryId } from "@/store/useCategoryStore";

export const toggleId = (ids: CategoryId[], id: CategoryId): CategoryId[] => {
  return ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id];
};

export const toggleAllIds = (ids: CategoryId[], allIds: CategoryId[]): CategoryId[] => {
  return ids.length === allIds.length ? [] : allIds;
};

export const isChecked = (ids: CategoryId[], id: CategoryId): boolean => ids.includes(id);

export const isAllChecked = (ids: CategoryId[], allIds: CategoryId[]): boolean =>
  ids.length === allIds.length;

export const isAnyChecked = (ids: CategoryId[]): boolean => ids.length > 0;
