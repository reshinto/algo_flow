// Intersection of Two Arrays — find common elements using a hash set
function intersectionOfTwoArrays(numbersA: number[], numbersB: number[]): number[] {
  const setA = new Set<number>(); // @step:initialize
  for (let elementIndex = 0; elementIndex < numbersA.length; elementIndex++) {
    setA.add(numbersA[elementIndex]!); // @step:insert-key
  }
  const result: number[] = [];
  for (let elementIndex = 0; elementIndex < numbersB.length; elementIndex++) {
    const currentNum = numbersB[elementIndex]!;
    if (setA.has(currentNum)) {
      // @step:lookup-key
      result.push(currentNum); // @step:key-found
      setA.delete(currentNum);
    }
  }
  return result; // @step:complete
}
