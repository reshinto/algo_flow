// Word Pattern — check if a string follows a pattern using bidirectional hash map mapping
package main

import "strings"

func wordPattern(pattern string, sentence string) bool {
	words := strings.Split(sentence, " ") // @step:initialize
	charToWord := make(map[rune]string)   // @step:initialize
	wordToChar := make(map[string]rune)   // @step:initialize
	patternRunes := []rune(pattern)
	if len(patternRunes) != len(words) {
		return false // @step:initialize
	}
	for charIndex := 0; charIndex < len(patternRunes); charIndex++ {
		patternChar := patternRunes[charIndex]
		currentWord := words[charIndex]
		mappedWord, hasMappedWord := charToWord[patternChar] // @step:lookup-key
		mappedChar, hasMappedChar := wordToChar[currentWord] // @step:lookup-key
		if !hasMappedWord && !hasMappedChar {
			charToWord[patternChar] = currentWord // @step:insert-key
			wordToChar[currentWord] = patternChar // @step:insert-key
		} else if mappedWord == currentWord && mappedChar == patternChar {
			continue // @step:key-found
		} else {
			return false // @step:key-not-found
		}
	}
	return true // @step:complete
}
