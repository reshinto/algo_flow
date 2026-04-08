// Integer to Roman — convert an integer to its Roman numeral string using a value-symbol lookup table
package main

func integerToRoman(value int) string {
	type valuePair struct {
		numericValue int
		symbol       string
	}
	valuePairs := []valuePair{} // @step:initialize
	valuePairs = append(valuePairs, valuePair{1000, "M"})  // @step:insert-key
	valuePairs = append(valuePairs, valuePair{900, "CM"})  // @step:insert-key
	valuePairs = append(valuePairs, valuePair{500, "D"})   // @step:insert-key
	valuePairs = append(valuePairs, valuePair{400, "CD"})  // @step:insert-key
	valuePairs = append(valuePairs, valuePair{100, "C"})   // @step:insert-key
	valuePairs = append(valuePairs, valuePair{90, "XC"})   // @step:insert-key
	valuePairs = append(valuePairs, valuePair{50, "L"})    // @step:insert-key
	valuePairs = append(valuePairs, valuePair{40, "XL"})   // @step:insert-key
	valuePairs = append(valuePairs, valuePair{10, "X"})    // @step:insert-key
	valuePairs = append(valuePairs, valuePair{9, "IX"})    // @step:insert-key
	valuePairs = append(valuePairs, valuePair{5, "V"})     // @step:insert-key
	valuePairs = append(valuePairs, valuePair{4, "IV"})    // @step:insert-key
	valuePairs = append(valuePairs, valuePair{1, "I"})     // @step:insert-key
	remaining := value
	result := ""
	for _, pair := range valuePairs {
		for remaining >= pair.numericValue {
			remaining -= pair.numericValue // @step:lookup-key
			result += pair.symbol          // @step:key-found
		}
	}
	return result // @step:complete
}
