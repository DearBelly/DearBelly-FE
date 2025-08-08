import { create } from 'zustand';

interface CategoryStore {
  checkedIds: string[]; 
  toggle: (id: string) => void;
  toggleAll: (allIds: string[]) => void;
  isChecked: (id: string) => boolean;
  isAllChecked: (allIds: string[]) => boolean;
  setInitialState: (ids: string[]) => void;
  reset: () => void;
}

export const useCategoryStore = create<CategoryStore>((set, get) => ({
  checkedIds: [],

  toggle: (id) => {
    const current = get().checkedIds;
    const newChecked = current.includes(id)
      ? current.filter((item) => item !== id)
      : [...current, id];
    set({ checkedIds: newChecked });
  },

  toggleAll: (allIds) => {
    const isAll = get().checkedIds.length === allIds.length;
    set({ checkedIds: isAll ? [] : allIds });
  },

  isChecked: (id) => {
    return get().checkedIds.includes(id);
  },

  isAllChecked: (allIds) => {
    return get().checkedIds.length === allIds.length;
  },

  setInitialState: (ids) => {
    set({ checkedIds: ids });
  },

  reset: () => {
    set({ checkedIds: [] });
  },
}));
