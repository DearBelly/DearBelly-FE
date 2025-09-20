export const toUrlDate = (date: string) => date.replace(/\./g, "-");
export const fromUrlDate = (date: string) => date.replace(/-/g, ".");
