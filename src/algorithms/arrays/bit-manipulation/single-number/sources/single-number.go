// Single Number (XOR) — every element appears twice except one; XOR cancels all pairs, leaving the unique element
package singlenumber

func singleNumber(inputArray []int) int {
	runningXor := 0 // @step:initialize

	for _, element := range inputArray {
		runningXor ^= element // @step:visit
	}

	return runningXor // @step:complete
}
