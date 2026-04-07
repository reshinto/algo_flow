// String to Integer (atoi) — parse an integer from a string.
// Skips leading whitespace, reads optional sign, reads digits, clamps to 32-bit range.
// Time: O(n)  Space: O(1)

package main

const int32Min = -(1 << 31)
const int32Max = (1 << 31) - 1

func stringToInteger(text string) int64 {
	chars := []rune(text)
	charIndex := 0 // @step:initialize
	length := len(chars) // @step:initialize

	// Phase 1: skip leading whitespace
	for charIndex < length && chars[charIndex] == ' ' {
		charIndex++ // @step:skip-whitespace
	}

	// Phase 2: read optional sign
	sign := int64(1) // @step:read-sign
	if charIndex < length && chars[charIndex] == '-' {
		sign = -1 // @step:read-sign
		charIndex++ // @step:read-sign
	} else if charIndex < length && chars[charIndex] == '+' {
		charIndex++ // @step:read-sign
	}

	// Phase 3: read digits and accumulate
	result := int64(0) // @step:read-digits
	for charIndex < length {
		charCode := int64(chars[charIndex]) // @step:read-digits
		if charCode < 48 || charCode > 57 { break } // @step:read-digits

		digit := charCode - 48 // @step:write-char
		result = result*10 + digit // @step:write-char

		// Clamp early to avoid overflow
		if sign == 1 && result > int32Max { return int32Max } // @step:write-char
		if sign == -1 && -result < int32Min { return int32Min } // @step:write-char

		charIndex++ // @step:read-digits
	}

	finalResult := sign * result
	if finalResult < int32Min { return int32Min }
	if finalResult > int32Max { return int32Max }
	return finalResult // @step:complete
}
