package main

import (
	"fmt"
	"strings"
	"testing"
)

func TestSetPermutationsGenerates6For3Elements(t *testing.T) {
	result := setPermutations([]int{1, 2, 3})
	if len(result) != 6 {
		t.Errorf("expected 6 permutations, got %d", len(result))
	}
}

func TestSetPermutationsContainsAllExpected(t *testing.T) {
	result := setPermutations([]int{1, 2, 3})
	permSet := make(map[string]struct{})
	for _, perm := range result {
		parts := make([]string, len(perm))
		for elemIdx, val := range perm {
			parts[elemIdx] = fmt.Sprintf("%d", val)
		}
		permSet[strings.Join(parts, ",")] = struct{}{}
	}
	expected := []string{"1,2,3", "1,3,2", "2,1,3", "2,3,1", "3,1,2", "3,2,1"}
	for _, perm := range expected {
		if _, exists := permSet[perm]; !exists {
			t.Errorf("expected permutation %q not found", perm)
		}
	}
}

func TestSetPermutationsTwoElementsGeneratesTwo(t *testing.T) {
	result := setPermutations([]int{1, 2})
	if len(result) != 2 {
		t.Errorf("expected 2 permutations, got %d", len(result))
	}
}

func TestSetPermutationsSingleElementGeneratesOne(t *testing.T) {
	result := setPermutations([]int{42})
	if len(result) != 1 {
		t.Errorf("expected 1 permutation, got %d", len(result))
	}
	if result[0][0] != 42 {
		t.Errorf("expected [42], got %v", result[0])
	}
}

func TestSetPermutationsEmptyArrayGeneratesOne(t *testing.T) {
	result := setPermutations([]int{})
	if len(result) != 1 {
		t.Errorf("expected 1 permutation for empty input, got %d", len(result))
	}
	if len(result[0]) != 0 {
		t.Errorf("expected empty permutation, got %v", result[0])
	}
}

func TestSetPermutationsEachPermutationHasSameLength(t *testing.T) {
	result := setPermutations([]int{1, 2, 3})
	for permIdx, perm := range result {
		if len(perm) != 3 {
			t.Errorf("permutation at index %d has length %d, expected 3", permIdx, len(perm))
		}
	}
}

func TestSetPermutationsGenerates24For4Elements(t *testing.T) {
	result := setPermutations([]int{1, 2, 3, 4})
	if len(result) != 24 {
		t.Errorf("expected 24 permutations for 4 elements, got %d", len(result))
	}
}

func TestSetPermutationsAllDistinct(t *testing.T) {
	result := setPermutations([]int{1, 2, 3})
	uniquePerms := make(map[string]struct{})
	for _, perm := range result {
		parts := make([]string, len(perm))
		for elemIdx, val := range perm {
			parts[elemIdx] = fmt.Sprintf("%d", val)
		}
		uniquePerms[strings.Join(parts, ",")] = struct{}{}
	}
	if len(uniquePerms) != len(result) {
		t.Errorf("found duplicate permutations: %d unique out of %d total", len(uniquePerms), len(result))
	}
}
