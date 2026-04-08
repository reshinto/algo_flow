package main

import (
	"reflect"
	"testing"
)

func TestSortsUnsortedArray(t *testing.T) {
	result := stoogeSort([]int{5, 3, 1, 4, 2})
	expected := []int{1, 2, 3, 4, 5}
	if !reflect.DeepEqual(result, expected) {
		t.Errorf("expected %v, got %v", expected, result)
	}
}

func TestHandlesAlreadySortedArray(t *testing.T) {
	result := stoogeSort([]int{1, 2, 3})
	expected := []int{1, 2, 3}
	if !reflect.DeepEqual(result, expected) {
		t.Errorf("expected %v, got %v", expected, result)
	}
}

func TestHandlesReverseSortedArray(t *testing.T) {
	result := stoogeSort([]int{3, 2, 1})
	expected := []int{1, 2, 3}
	if !reflect.DeepEqual(result, expected) {
		t.Errorf("expected %v, got %v", expected, result)
	}
}

func TestHandlesArrayWithDuplicateValues(t *testing.T) {
	result := stoogeSort([]int{3, 1, 2, 1, 3})
	expected := []int{1, 1, 2, 3, 3}
	if !reflect.DeepEqual(result, expected) {
		t.Errorf("expected %v, got %v", expected, result)
	}
}

func TestHandlesSingleElementArray(t *testing.T) {
	result := stoogeSort([]int{42})
	expected := []int{42}
	if !reflect.DeepEqual(result, expected) {
		t.Errorf("expected %v, got %v", expected, result)
	}
}

func TestHandlesEmptyArray(t *testing.T) {
	result := stoogeSort([]int{})
	if len(result) != 0 {
		t.Errorf("expected empty slice, got %v", result)
	}
}

func TestHandlesArrayWithNegativeNumbers(t *testing.T) {
	result := stoogeSort([]int{3, -1, 2})
	expected := []int{-1, 2, 3}
	if !reflect.DeepEqual(result, expected) {
		t.Errorf("expected %v, got %v", expected, result)
	}
}

func TestDoesNotMutateOriginalArray(t *testing.T) {
	original := []int{5, 3, 1, 4, 2}
	originalCopy := []int{5, 3, 1, 4, 2}
	sorted := stoogeSort(original)
	if !reflect.DeepEqual(sorted, []int{1, 2, 3, 4, 5}) {
		t.Errorf("expected sorted [1 2 3 4 5], got %v", sorted)
	}
	if !reflect.DeepEqual(original, originalCopy) {
		t.Errorf("original array was mutated: got %v", original)
	}
}
