package slidingwindowmaxdeque

import (
	"reflect"
	"testing"
)

func TestDefaultInput(t *testing.T) {
	result := slidingWindowMaxDeque([]int{1, 3, -1, -3, 5, 3, 6, 7}, 3)
	expected := []int{3, 3, 5, 5, 6, 7}
	if !reflect.DeepEqual(result, expected) {
		t.Errorf("Expected %v, got %v", expected, result)
	}
}

func TestEmptyArray(t *testing.T) {
	result := slidingWindowMaxDeque([]int{}, 3)
	if len(result) != 0 {
		t.Errorf("Expected empty, got %v", result)
	}
}

func TestWindowExceedsArrayLength(t *testing.T) {
	result := slidingWindowMaxDeque([]int{1, 2}, 5)
	if len(result) != 0 {
		t.Errorf("Expected empty, got %v", result)
	}
}

func TestWindowEqualsArrayLength(t *testing.T) {
	result := slidingWindowMaxDeque([]int{3, 1, 4, 1, 5}, 5)
	expected := []int{5}
	if !reflect.DeepEqual(result, expected) {
		t.Errorf("Expected %v, got %v", expected, result)
	}
}

func TestWindowSizeOne(t *testing.T) {
	result := slidingWindowMaxDeque([]int{4, 2, 7, 1, 9}, 1)
	expected := []int{4, 2, 7, 1, 9}
	if !reflect.DeepEqual(result, expected) {
		t.Errorf("Expected %v, got %v", expected, result)
	}
}

func TestAllEqualElements(t *testing.T) {
	result := slidingWindowMaxDeque([]int{5, 5, 5, 5}, 2)
	expected := []int{5, 5, 5}
	if !reflect.DeepEqual(result, expected) {
		t.Errorf("Expected %v, got %v", expected, result)
	}
}

func TestDecreasingArray(t *testing.T) {
	result := slidingWindowMaxDeque([]int{9, 7, 5, 3, 1}, 3)
	expected := []int{9, 7, 5}
	if !reflect.DeepEqual(result, expected) {
		t.Errorf("Expected %v, got %v", expected, result)
	}
}

func TestIncreasingArray(t *testing.T) {
	result := slidingWindowMaxDeque([]int{1, 3, 5, 7, 9}, 3)
	expected := []int{5, 7, 9}
	if !reflect.DeepEqual(result, expected) {
		t.Errorf("Expected %v, got %v", expected, result)
	}
}

func TestNegativeNumbers(t *testing.T) {
	result := slidingWindowMaxDeque([]int{-4, -2, -5, -1, -3}, 2)
	expected := []int{-2, -2, -1, -1}
	if !reflect.DeepEqual(result, expected) {
		t.Errorf("Expected %v, got %v", expected, result)
	}
}
