/* pathify.ts */
export const pathify = (str: string) => {
  return str.match(/\w+/g)!.join("-").toLowerCase();
};
