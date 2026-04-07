// Isomorphic Strings — check if two strings are isomorphic using bidirectional char mapping
package main

func isomorphicStrings(textA string, textB string) bool {
	aToB := make(map[rune]rune) // @step:initialize
	bToA := make(map[rune]rune) // @step:initialize
	runesA := []rune(textA)
	runesB := []rune(textB)
	if len(runesA) != len(runesB) {
		return false // @step:initialize
	}
	for charIndex := 0; charIndex < len(runesA); charIndex++ {
		charA := runesA[charIndex]
		charB := runesB[charIndex]
		mappedB, hasMappedB := aToB[charA] // @step:lookup-key
		mappedA, hasMappedA := bToA[charB] // @step:lookup-key
		if !hasMappedB && !hasMappedA {
			aToB[charA] = charB // @step:insert-key
			bToA[charB] = charA // @step:insert-key
		} else if mappedB == charB && mappedA == charA {
			continue // @step:key-found
		} else {
			return false // @step:key-not-found
		}
	}
	return true // @step:complete
}
