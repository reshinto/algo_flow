// Daily Temperatures — monotonic stack: for each day, find how many days until a warmer temperature (0 if none)
function dailyTemperatures(temperatures: number[]): number[] {
  const arrayLength = temperatures.length;
  const waitDays = new Array(arrayLength).fill(0); // @step:initialize
  const pendingStack: number[] = []; // @step:initialize

  for (let dayIndex = 0; dayIndex < arrayLength; dayIndex++) {
    const todayTemp = temperatures[dayIndex]!; // @step:visit

    while (pendingStack.length > 0) {
      const stackTop = pendingStack[pendingStack.length - 1]!; // @step:compare
      if (temperatures[stackTop]! < todayTemp) {
        // @step:compare
        const poppedIndex = pendingStack.pop()!; // @step:compare
        waitDays[poppedIndex] = dayIndex - poppedIndex; // @step:compare
      } else {
        break;
      }
    }

    pendingStack.push(dayIndex); // @step:visit
  }

  return waitDays; // @step:complete
}
