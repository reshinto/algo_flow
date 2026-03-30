// Roman to Integer — convert a Roman numeral string to its integer value using a lookup map
function romanToInteger(text: string): number {
  const romanMap = new Map<string, number>(); // @step:initialize
  romanMap.set("I", 1); // @step:insert-key
  romanMap.set("V", 5); // @step:insert-key
  romanMap.set("X", 10); // @step:insert-key
  romanMap.set("L", 50); // @step:insert-key
  romanMap.set("C", 100); // @step:insert-key
  romanMap.set("D", 500); // @step:insert-key
  romanMap.set("M", 1000); // @step:insert-key
  let totalValue = 0;
  for (let charIndex = 0; charIndex < text.length; charIndex++) {
    const currentSymbol = text[charIndex]!; // @step:lookup-key
    const nextSymbol = text[charIndex + 1];
    const currentValue = romanMap.get(currentSymbol)!; // @step:key-found
    const nextValue = nextSymbol !== undefined ? (romanMap.get(nextSymbol) ?? 0) : 0;
    if (currentValue < nextValue) {
      totalValue -= currentValue; // @step:key-found
    } else {
      totalValue += currentValue; // @step:key-found
    }
  }
  return totalValue; // @step:complete
}
