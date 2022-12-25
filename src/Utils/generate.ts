export const generateCode = (length: number) =>
  (Math.random() + 1).toString(36).substring(length);
