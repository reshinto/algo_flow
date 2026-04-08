// Longest Palindromic Substring — Expand Around Center approach
// Returns the longest substring of `text` that is a palindrome.
// Time: O(n²), Space: O(1)

package main

func longestPalindromicSubstring(text string) string {
	chars := []rune(text)
	if len(chars) == 0 { return "" } // @step:initialize

	longestStart := 0 // @step:initialize
	longestLength := 1 // @step:initialize

	for centerIndex := 0; centerIndex < len(chars); centerIndex++ {
		// @step:expandCenter

		// Odd-length palindromes: single character as center
		oddRadius := 0 // @step:expandCenter
		for centerIndex-oddRadius-1 >= 0 &&
			centerIndex+oddRadius+1 < len(chars) &&
			chars[centerIndex-oddRadius-1] == chars[centerIndex+oddRadius+1] {
			// @step:compareChars
			oddRadius++ // @step:charsMatch
		}
		oddLength := 2*oddRadius + 1 // @step:updateLongest
		if oddLength > longestLength {
			// @step:updateLongest
			longestStart = centerIndex - oddRadius // @step:updateLongest
			longestLength = oddLength // @step:updateLongest
		}

		// Even-length palindromes: gap between centerIndex and centerIndex+1
		if centerIndex+1 < len(chars) && chars[centerIndex] == chars[centerIndex+1] {
			// @step:compareChars
			evenRadius := 1 // @step:charsMatch
			for centerIndex-evenRadius >= 0 &&
				centerIndex+evenRadius+1 < len(chars) &&
				chars[centerIndex-evenRadius] == chars[centerIndex+evenRadius+1] {
				// @step:compareChars
				evenRadius++ // @step:charsMatch
			}
			evenLength := 2 * evenRadius // @step:updateLongest
			if evenLength > longestLength {
				// @step:updateLongest
				longestStart = centerIndex - evenRadius + 1 // @step:updateLongest
				longestLength = evenLength // @step:updateLongest
			}
		}
	}

	return string(chars[longestStart : longestStart+longestLength]) // @step:complete
}
