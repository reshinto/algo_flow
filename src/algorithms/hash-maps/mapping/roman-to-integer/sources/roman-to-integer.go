// Roman to Integer — convert a Roman numeral string to its integer value using a lookup map
package main

func romanToInteger(text string) int {
	romanMap := make(map[rune]int) // @step:initialize
	romanMap['I'] = 1    // @step:insert-key
	romanMap['V'] = 5    // @step:insert-key
	romanMap['X'] = 10   // @step:insert-key
	romanMap['L'] = 50   // @step:insert-key
	romanMap['C'] = 100  // @step:insert-key
	romanMap['D'] = 500  // @step:insert-key
	romanMap['M'] = 1000 // @step:insert-key
	chars := []rune(text)
	totalValue := 0
	for charIndex := 0; charIndex < len(chars); charIndex++ {
		currentSymbol := chars[charIndex] // @step:lookup-key
		currentValue := romanMap[currentSymbol] // @step:key-found
		nextValue := 0
		if charIndex+1 < len(chars) {
			nextValue = romanMap[chars[charIndex+1]]
		}
		if currentValue < nextValue {
			totalValue -= currentValue // @step:key-found
		} else {
			totalValue += currentValue // @step:key-found
		}
	}
	return totalValue // @step:complete
}
