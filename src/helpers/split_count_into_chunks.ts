export function splitArrayIntoChunks(array: string[], chunkSize: number) {
  const result: string[][] = [];

  for (let i = 0; i < array.length; i += chunkSize) {
    result.push(array.slice(i, i + chunkSize));
  }

  return result;
}
