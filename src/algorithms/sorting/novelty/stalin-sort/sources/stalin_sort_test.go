package main

import (
	"reflect"
	"testing"
)

func TestEliminatesOutOfOrderElements(t *testing.T) {
	// 3 survives (first), 1 < 3 eliminated, 2 < 3 eliminated -> [3]
	result := stalinSort([]int{3, 1, 2})
	expected := []int{3}
	if !reflect.DeepEqual(result, expected) {
		t.Errorf("expected %v, got %v", expected, result)
	}
}

func TestKeepsAllElementsWhenArrayIsAlreadySorted(t *testing.T) {
	result := stalinSort([]int{1, 2, 3, 4, 5})
	expected := []int{1, 2, 3, 4, 5}
	if !reflect.DeepEqual(result, expected) {
		t.Errorf("expected %v, got %v", expected, result)
	}
}

func TestReducesReverseSortedArrayToFirstElement(t *testing.T) {
	result := stalinSort([]int{5, 4, 3, 2, 1})
	expected := []int{5}
	if !reflect.DeepEqual(result, expected) {
		t.Errorf("expected %v, got %v", expected, result)
	}
}

func TestHandlesArrayWithPartialOrder(t *testing.T) {
	result := stalinSort([]int{3, 1, 4, 2, 5})
	expected := []int{3, 4, 5}
	if !reflect.DeepEqual(result, expected) {
		t.Errorf("expected %v, got %v", expected, result)
	}
}

func TestHandlesArrayWithEqualElements(t *testing.T) {
	result := stalinSort([]int{2, 2, 2, 2})
	expected := []int{2, 2, 2, 2}
	if !reflect.DeepEqual(result, expected) {
		t.Errorf("expected %v, got %v", expected, result)
	}
}

func TestHandlesSingleElementArray(t *testing.T) {
	result := stalinSort([]int{42})
	expected := []int{42}
	if !reflect.DeepEqual(result, expected) {
		t.Errorf("expected %v, got %v", expected, result)
	}
}

func TestHandlesEmptyArray(t *testing.T) {
	result := stalinSort([]int{})
	if len(result) != 0 {
		t.Errorf("expected empty slice, got %v", result)
	}
}

func TestHandlesArrayWithDuplicateMaxValues(t *testing.T) {
	result := stalinSort([]int{5, 3, 5})
	expected := []int{5, 5}
	if !reflect.DeepEqual(result, expected) {
		t.Errorf("expected %v, got %v", expected, result)
	}
}

func TestDoesNotMutateOriginalArray(t *testing.T) {
	original := []int{3, 1, 2}
	originalCopy := []int{3, 1, 2}
	result := stalinSort(original)
	if !reflect.DeepEqual(result, []int{3}) {
		t.Errorf("expected [3], got %v", result)
	}
	if !reflect.DeepEqual(original, originalCopy) {
		t.Errorf("original array was mutated: got %v", original)
	}
}
