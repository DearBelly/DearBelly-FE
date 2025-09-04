import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Category {
  id: string;
  label: string;
}

interface CategoryStore {
  categories: Category[];
  checkedIds: string[];
  allIds: string[];
  toggle: (id: string) => void;
  toggleAll: () => void;
  isChecked: (id: string) => boolean;
  isAllChecked: () => boolean;
  isAnyChecked: () => boolean;
  reset: () => void;
}

export const useCategoryStore = create<CategoryStore>()(
  persist(
    (set, get) => {
      const categories: Category[] = [
        { id: "health", label: "임신 기간 동안, 임산부의 건강과 관련된 정보를 알고 싶어요." },
        { id: "money", label: "임신, 출산, 육아와 관련된 정책과 지원금 정보를 알고 싶어요." },
        { id: "ready", label: "임신 준비 과정에 필요한 정보를 알고 싶어요." },
        { id: "granulation", label: "출산과 육아에 관한 다양한 정보를 알고 싶어요." },
        { id: "education", label: "임신, 출산 육아와 관련된 교육 프로그램 정보를 알고 싶어요." },
        { id: "mind", label: "임신 기간 동안 정서적인 도움을 줄 수 있는 정보에 대해서 알고 싶어요." },
      ];

      return {
        categories,
        checkedIds: [],
        allIds: categories.map((c) => c.id),

        toggle: (id) => {
          const current = get().checkedIds;
          set({
            checkedIds: current.includes(id)
              ? current.filter((x) => x !== id)
              : [...current, id],
          });
        },

        toggleAll: () => {
          const { checkedIds, allIds } = get();
          const isAll = checkedIds.length === allIds.length;
          set({ checkedIds: isAll ? [] : allIds });
        },

        isChecked: (id) => get().checkedIds.includes(id),

        isAllChecked: () => {
          const { checkedIds, allIds } = get();
          return checkedIds.length === allIds.length;
        },

        isAnyChecked: () => get().checkedIds.length > 0,

        reset: () => set({ checkedIds: [] }),
      };
    },
    {
      name: "dearbelly_categories",
      partialize: (state) => ({ checkedIds: state.checkedIds }),
    }
  )
);
