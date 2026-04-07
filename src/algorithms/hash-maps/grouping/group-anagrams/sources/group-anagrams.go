// Group Anagrams — group words that are anagrams of each other using sorted-key hashing
package main

import "sort"

func groupAnagrams(words []string) [][]string {
	groupMap := make(map[string][]string) // @step:initialize
	for _, word := range words {
		runeSlice := []rune(word)
		sort.Slice(runeSlice, func(a, b int) bool { return runeSlice[a] < runeSlice[b] })
		sortedKey := string(runeSlice) // @step:lookup-key
		if _, exists := groupMap[sortedKey]; exists {
			groupMap[sortedKey] = append(groupMap[sortedKey], word) // @step:update-value
		} else {
			groupMap[sortedKey] = []string{word} // @step:insert-key
		}
	}
	result := make([][]string, 0, len(groupMap))
	for _, group := range groupMap {
		result = append(result, group)
	}
	return result // @step:complete
}
