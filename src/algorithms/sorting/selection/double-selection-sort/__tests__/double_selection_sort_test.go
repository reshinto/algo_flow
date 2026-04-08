package main

import (
	"reflect"
	"testing"
)

func TestSortsUnsortedArray(t *testing.T) {
	result := doubleSelectionSort([]int{64, 34, 25, 12, 22, 11, 90})
	expected := []int{11, 12, 22, 25, 34, 64, 90}
	if !reflect.DeepEqual(result, expected) {
		t.Errorf("expected %v, got %v", expected, result)
	}
}

func TestHandlesAlreadySortedArray(t *testing.T) {
	result := doubleSelectionSort([]int{1, 2, 3, 4, 5})
	expected := []int{1, 2, 3, 4, 5}
	if !reflect.DeepEqual(result, expected) {
		t.Errorf("expected %v, got %v", expected, result)
	}
}

func TestHandlesReverseSortedArray(t *testing.T) {
	result := doubleSelectionSort([]int{5, 4, 3, 2, 1})
	expected := []int{1, 2, 3, 4, 5}
	if !reflect.DeepEqual(result, expected) {
		t.Errorf("expected %v, got %v", expected, result)
	}
}

func TestHandlesArrayWithDuplicateValues(t *testing.T) {
	result := doubleSelectionSort([]int{3, 1, 4, 1, 5, 9, 2, 6, 5})
	expected := []int{1, 1, 2, 3, 4, 5, 5, 6, 9}
	if !reflect.DeepEqual(result, expected) {
		t.Errorf("expected %v, got %v", expected, result)
	}
}

func TestHandlesSingleElementArray(t *testing.T) {
	result := doubleSelectionSort([]int{42})
	expected := []int{42}
	if !reflect.DeepEqual(result, expected) {
		t.Errorf("expected %v, got %v", expected, result)
	}
}

func TestHandlesEmptyArray(t *testing.T) {
	result := doubleSelectionSort([]int{})
	if len(result) != 0 {
		t.Errorf("expected empty slice, got %v", result)
	}
}

func TestHandlesArrayWithNegativeNumbers(t *testing.T) {
	result := doubleSelectionSort([]int{3, -1, 0, -5, 2})
	expected := []int{-5, -1, 0, 2, 3}
	if !reflect.DeepEqual(result, expected) {
		t.Errorf("expected %v, got %v", expected, result)
	}
}

func TestHandlesEvenLengthArray(t *testing.T) {
	result := doubleSelectionSort([]int{4, 2, 6, 1})
	expected := []int{1, 2, 4, 6}
	if !reflect.DeepEqual(result, expected) {
		t.Errorf("expected %v, got %v", expected, result)
	}
}

func TestDoesNotMutateOriginalArray(t *testing.T) {
	original := []int{3, 1, 2}
	originalCopy := []int{3, 1, 2}
	sorted := doubleSelectionSort(original)
	if !reflect.DeepEqual(sorted, []int{1, 2, 3}) {
		t.Errorf("expected sorted [1 2 3], got %v", sorted)
	}
	if !reflect.DeepEqual(original, originalCopy) {
		t.Errorf("original array was mutated: got %v", original)
	}
}
