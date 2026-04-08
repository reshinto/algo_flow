package main

import (
	"reflect"
	"testing"
)

func TestSortsUnsortedArray(t *testing.T) {
	result := sleepSort([]int{5, 3, 8, 1, 4, 2, 7, 6})
	expected := []int{1, 2, 3, 4, 5, 6, 7, 8}
	if !reflect.DeepEqual(result, expected) {
		t.Errorf("expected %v, got %v", expected, result)
	}
}

func TestHandlesAlreadySortedArray(t *testing.T) {
	result := sleepSort([]int{1, 2, 3, 4, 5})
	expected := []int{1, 2, 3, 4, 5}
	if !reflect.DeepEqual(result, expected) {
		t.Errorf("expected %v, got %v", expected, result)
	}
}

func TestHandlesReverseSortedArray(t *testing.T) {
	result := sleepSort([]int{5, 4, 3, 2, 1})
	expected := []int{1, 2, 3, 4, 5}
	if !reflect.DeepEqual(result, expected) {
		t.Errorf("expected %v, got %v", expected, result)
	}
}

func TestHandlesArrayWithDuplicateValues(t *testing.T) {
	result := sleepSort([]int{3, 1, 4, 1, 5, 9, 2, 6})
	expected := []int{1, 1, 2, 3, 4, 5, 6, 9}
	if !reflect.DeepEqual(result, expected) {
		t.Errorf("expected %v, got %v", expected, result)
	}
}

func TestHandlesSingleElementArray(t *testing.T) {
	result := sleepSort([]int{42})
	expected := []int{42}
	if !reflect.DeepEqual(result, expected) {
		t.Errorf("expected %v, got %v", expected, result)
	}
}

func TestHandlesEmptyArray(t *testing.T) {
	result := sleepSort([]int{})
	if len(result) != 0 {
		t.Errorf("expected empty slice, got %v", result)
	}
}

func TestDoesNotMutateOriginalArray(t *testing.T) {
	original := []int{3, 1, 2}
	originalCopy := []int{3, 1, 2}
	sorted := sleepSort(original)
	if !reflect.DeepEqual(sorted, []int{1, 2, 3}) {
		t.Errorf("expected sorted [1 2 3], got %v", sorted)
	}
	if !reflect.DeepEqual(original, originalCopy) {
		t.Errorf("original array was mutated: got %v", original)
	}
}
