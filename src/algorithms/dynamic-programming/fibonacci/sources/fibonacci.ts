function fibonacciTabulation(targetIndex: number): number {
  if (targetIndex <= 1) return targetIndex;
  const dpTable = new Array(targetIndex + 1).fill(0);
  dpTable[1] = 1;
  for (let currentIndex = 2; currentIndex <= targetIndex; currentIndex++) {
    dpTable[currentIndex] = dpTable[currentIndex - 1] + dpTable[currentIndex - 2];
  }
  return dpTable[targetIndex];
}
