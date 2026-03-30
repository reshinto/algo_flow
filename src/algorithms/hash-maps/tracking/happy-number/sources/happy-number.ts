// Happy Number — detect happy numbers using digit-square-sum cycling with a hash set
function digitSquareSum(num: number): number {
  let total = 0; // @step:initialize
  while (num > 0) {
    const digit = num % 10;
    total += digit * digit;
    num = Math.floor(num / 10);
  }
  return total;
}

function happyNumber(startNumber: number): boolean {
  const seen = new Set<number>(); // @step:initialize
  let current = startNumber;
  while (current !== 1) {
    seen.add(current); // @step:insert-key
    current = digitSquareSum(current); // @step:process-element
    if (seen.has(current)) {
      // @step:check-duplicate
      return false; // @step:key-found
    }
  }
  return true; // @step:complete
}
