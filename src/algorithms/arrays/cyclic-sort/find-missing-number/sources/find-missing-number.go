// Find Missing Number — XOR approach: XOR all elements with expected range 0..n, pair cancellations leave the missing number
package findmissingnumber

func findMissingNumber(inputArray []int) int {
	arrayLength := len(inputArray) // @step:initialize
	currentXor := 0               // @step:initialize

	for expectedRange := 0; expectedRange <= arrayLength; expectedRange++ {
		currentXor ^= expectedRange // @step:compare
	}

	for scanIndex := 0; scanIndex < arrayLength; scanIndex++ {
		currentXor ^= inputArray[scanIndex] // @step:visit
	}

	return currentXor // @step:complete
}
