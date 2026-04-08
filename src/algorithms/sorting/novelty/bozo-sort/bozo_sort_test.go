package main

import (
	"reflect"
	"testing"
)

func TestSortsSmallArrayUsingSeededPrng(t *testing.T) {
	result := bozoSort([]int{3, 1, 2})
	expected := []int{1, 2, 3}
	if !reflect.DeepEqual(result, expected) {
		t.Errorf("expected %v, got %v", expected, result)
	}
}

func TestHandlesAlreadySortedArray(t *testing.T) {
	result := bozoSort([]int{1, 2, 3})
	expected := []int{1, 2, 3}
	if !reflect.DeepEqual(result, expected) {
		t.Errorf("expected %v, got %v", expected, result)
	}
}

func TestHandlesSingleElementArray(t *testing.T) {
	result := bozoSort([]int{42})
	expected := []int{42}
	if !reflect.DeepEqual(result, expected) {
		t.Errorf("expected %v, got %v", expected, result)
	}
}

func TestHandlesEmptyArray(t *testing.T) {
	result := bozoSort([]int{})
	if len(result) != 0 {
		t.Errorf("expected empty slice, got %v", result)
	}
}

func TestProducesResultWithSameLengthAsInput(t *testing.T) {
	result := bozoSort([]int{3, 1, 2})
	if len(result) != 3 {
		t.Errorf("expected length 3, got %d", len(result))
	}
}

func TestDoesNotMutateOriginalArray(t *testing.T) {
	original := []int{3, 1, 2}
	originalCopy := []int{3, 1, 2}
	sorted := bozoSort(original)
	if !reflect.DeepEqual(sorted, []int{1, 2, 3}) {
		t.Errorf("expected sorted [1 2 3], got %v", sorted)
	}
	if !reflect.DeepEqual(original, originalCopy) {
		t.Errorf("original array was mutated: got %v", original)
	}
}

func TestHandles2ElementArray(t *testing.T) {
	result := bozoSort([]int{2, 1})
	expected := []int{1, 2}
	if !reflect.DeepEqual(result, expected) {
		t.Errorf("expected %v, got %v", expected, result)
	}
}
