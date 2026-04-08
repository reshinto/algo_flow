package main

import (
	"fmt"
	"sort"
	"strings"
	"testing"
)

func TestKCombinationsC53Equals10(t *testing.T) {
	result := kCombinations([]int{1, 2, 3, 4, 5}, 3)
	if len(result) != 10 {
		t.Errorf("expected 10 combinations, got %d", len(result))
	}
}

func TestKCombinationsEverySubsetHasKElements(t *testing.T) {
	result := kCombinations([]int{1, 2, 3, 4, 5}, 3)
	for subsetIdx, subset := range result {
		if len(subset) != 3 {
			t.Errorf("subset at index %d has %d elements, expected 3", subsetIdx, len(subset))
		}
	}
}

func TestKCombinationsC42Equals6(t *testing.T) {
	result := kCombinations([]int{1, 2, 3, 4}, 2)
	if len(result) != 6 {
		t.Errorf("expected 6 combinations, got %d", len(result))
	}
}

func TestKCombinationsKEqualsNFullSet(t *testing.T) {
	result := kCombinations([]int{1, 2, 3}, 3)
	if len(result) != 1 {
		t.Errorf("expected 1 combination when k equals n, got %d", len(result))
	}
	sorted := make([]int, len(result[0]))
	copy(sorted, result[0])
	sort.Ints(sorted)
	if fmt.Sprint(sorted) != "[1 2 3]" {
		t.Errorf("expected [1 2 3], got %v", sorted)
	}
}

func TestKCombinationsKZeroReturnsEmptySubset(t *testing.T) {
	result := kCombinations([]int{1, 2, 3}, 0)
	if len(result) != 1 {
		t.Errorf("expected 1 result for k=0, got %d", len(result))
	}
	if len(result[0]) != 0 {
		t.Errorf("expected empty subset for k=0, got %v", result[0])
	}
}

func TestKCombinationsKExceedsNReturnsEmpty(t *testing.T) {
	result := kCombinations([]int{1, 2}, 5)
	if len(result) != 0 {
		t.Errorf("expected empty result when k > n, got %d combinations", len(result))
	}
}

func TestKCombinationsEmptyInputWithPositiveK(t *testing.T) {
	result := kCombinations([]int{}, 2)
	if len(result) != 0 {
		t.Errorf("expected empty result for empty input, got %d combinations", len(result))
	}
}

func TestKCombinationsNoDuplicates(t *testing.T) {
	result := kCombinations([]int{1, 2, 3, 4, 5}, 3)
	uniqueSubsets := make(map[string]struct{})
	for _, subset := range result {
		sorted := make([]int, len(subset))
		copy(sorted, subset)
		sort.Ints(sorted)
		parts := make([]string, len(sorted))
		for elemIdx, val := range sorted {
			parts[elemIdx] = fmt.Sprintf("%d", val)
		}
		key := strings.Join(parts, ",")
		uniqueSubsets[key] = struct{}{}
	}
	if len(uniqueSubsets) != len(result) {
		t.Errorf("found duplicate combinations: %d unique out of %d total", len(uniqueSubsets), len(result))
	}
}
