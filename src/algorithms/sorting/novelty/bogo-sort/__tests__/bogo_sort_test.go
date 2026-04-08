package main

import (
	"reflect"
	"testing"
)

func TestSortsSmallArrayUsingSeededPrng(t *testing.T) {
	result := bogoSort([]int{3, 1, 2})
	expected := []int{1, 2, 3}
	if !reflect.DeepEqual(result, expected) {
		t.Errorf("expected %v, got %v", expected, result)
	}
}

func TestHandlesAlreadySortedArray(t *testing.T) {
	result := bogoSort([]int{1, 2, 3})
	expected := []int{1, 2, 3}
	if !reflect.DeepEqual(result, expected) {
		t.Errorf("expected %v, got %v", expected, result)
	}
}

func TestHandlesSingleElementArray(t *testing.T) {
	result := bogoSort([]int{42})
	expected := []int{42}
	if !reflect.DeepEqual(result, expected) {
		t.Errorf("expected %v, got %v", expected, result)
	}
}

func TestHandlesEmptyArray(t *testing.T) {
	result := bogoSort([]int{})
	if len(result) != 0 {
		t.Errorf("expected empty slice, got %v", result)
	}
}

func TestDoesNotMutateOriginalArray(t *testing.T) {
	original := []int{3, 1, 2}
	originalCopy := []int{3, 1, 2}
	sorted := bogoSort(original)
	if !reflect.DeepEqual(sorted, []int{1, 2, 3}) {
		t.Errorf("expected sorted [1 2 3], got %v", sorted)
	}
	if !reflect.DeepEqual(original, originalCopy) {
		t.Errorf("original array was mutated: got %v", original)
	}
}

func TestProducesSortedResultWithinCap(t *testing.T) {
	result := bogoSort([]int{2, 1})
	if len(result) != 2 {
		t.Errorf("expected length 2, got %d", len(result))
	}
	// With seed 42 and only 2 elements, it should sort quickly
	if result[0] > result[1] {
		t.Errorf("expected sorted result, got %v", result)
	}
}
