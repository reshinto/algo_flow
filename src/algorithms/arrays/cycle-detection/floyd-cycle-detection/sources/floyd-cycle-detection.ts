// Floyd's Cycle Detection — tortoise and hare: treat array as linked structure, detect cycle and find entrance
function floydCycleDetection(inputArray: number[]): { hasCycle: boolean; cycleStart: number } {
  if (inputArray.length === 0) {
    // @step:initialize
    return { hasCycle: false, cycleStart: -1 }; // @step:initialize
  }

  let tortoise = 0; // @step:initialize
  let hare = 0; // @step:initialize

  // Phase 1: detect meeting point inside the cycle
  let iterationCount = 0;
  const maxIterations = inputArray.length * 2;
  do {
    if (tortoise < 0 || tortoise >= inputArray.length) break;
    if (hare < 0 || hare >= inputArray.length) break;
    tortoise = inputArray[tortoise]!; // @step:visit
    const hareNext = inputArray[hare]!;
    if (hareNext < 0 || hareNext >= inputArray.length) break;
    hare = inputArray[hareNext]!; // @step:visit
    iterationCount++;
    if (iterationCount > maxIterations) break;
  } while (tortoise !== hare); // @step:compare

  // Phase 2: find cycle entrance — reset tortoise to start, hare stays at meeting point
  tortoise = 0; // @step:visit
  while (tortoise !== hare) {
    // @step:compare
    tortoise = inputArray[tortoise]!; // @step:visit
    hare = inputArray[hare]!; // @step:visit
  }

  return { hasCycle: true, cycleStart: tortoise }; // @step:complete
}
