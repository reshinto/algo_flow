package main

import (
	"fmt"
	"sort"
	"strings"
	"testing"
)

func TestPowerSetGenerates2ToNSubsets(t *testing.T) {
	result := powerSet([]int{1, 2, 3, 4})
	if len(result) != 16 {
		t.Errorf("expected 16 subsets, got %d", len(result))
	}
}

func TestPowerSetIncludesEmptySet(t *testing.T) {
	result := powerSet([]int{1, 2, 3})
	hasEmpty := false
	for _, subset := range result {
		if len(subset) == 0 {
			hasEmpty = true
			break
		}
	}
	if !hasEmpty {
		t.Error("expected empty set in power set result")
	}
}

func TestPowerSetIncludesFullSet(t *testing.T) {
	result := powerSet([]int{1, 2, 3})
	hasFull := false
	for _, subset := range result {
		sorted := make([]int, len(subset))
		copy(sorted, subset)
		sort.Ints(sorted)
		if fmt.Sprint(sorted) == "[1 2 3]" {
			hasFull = true
			break
		}
	}
	if !hasFull {
		t.Error("expected full set in power set result")
	}
}

func TestPowerSetEmptyInputReturnsOneEmptySubset(t *testing.T) {
	result := powerSet([]int{})
	if len(result) != 1 {
		t.Errorf("expected 1 subset for empty input, got %d", len(result))
	}
	if len(result[0]) != 0 {
		t.Errorf("expected empty subset, got %v", result[0])
	}
}

func TestPowerSetSingleElementReturnsTwoSubsets(t *testing.T) {
	result := powerSet([]int{7})
	if len(result) != 2 {
		t.Errorf("expected 2 subsets for single element, got %d", len(result))
	}
}

func TestPowerSetThreeElementsReturnsEightSubsets(t *testing.T) {
	result := powerSet([]int{1, 2, 3})
	if len(result) != 8 {
		t.Errorf("expected 8 subsets for 3 elements, got %d", len(result))
	}
}

func TestPowerSetNoDuplicateSubsets(t *testing.T) {
	result := powerSet([]int{1, 2, 3, 4})
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
		t.Errorf("found duplicate subsets: %d unique out of %d total", len(uniqueSubsets), len(result))
	}
}
