// Integer to Roman — convert an integer to its Roman numeral string using a value-symbol lookup table
function integerToRoman(value: number): string {
  const valuePairs: [number, string][] = []; // @step:initialize
  valuePairs.push([1000, "M"]); // @step:insert-key
  valuePairs.push([900, "CM"]); // @step:insert-key
  valuePairs.push([500, "D"]); // @step:insert-key
  valuePairs.push([400, "CD"]); // @step:insert-key
  valuePairs.push([100, "C"]); // @step:insert-key
  valuePairs.push([90, "XC"]); // @step:insert-key
  valuePairs.push([50, "L"]); // @step:insert-key
  valuePairs.push([40, "XL"]); // @step:insert-key
  valuePairs.push([10, "X"]); // @step:insert-key
  valuePairs.push([9, "IX"]); // @step:insert-key
  valuePairs.push([5, "V"]); // @step:insert-key
  valuePairs.push([4, "IV"]); // @step:insert-key
  valuePairs.push([1, "I"]); // @step:insert-key
  let remaining = value;
  let result = "";
  for (const [numericValue, symbol] of valuePairs) {
    while (remaining >= numericValue) {
      remaining -= numericValue; // @step:lookup-key
      result += symbol; // @step:key-found
    }
  }
  return result; // @step:complete
}
