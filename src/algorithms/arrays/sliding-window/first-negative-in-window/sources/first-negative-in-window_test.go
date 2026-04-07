package firstnegativeinwindow

import (
	"reflect"
	"testing"
)

func TestDefaultInput(t *testing.T) {
	result := firstNegativeInWindow([]int{12, -1, -7, 8, -15, 30, 16, 28}, 3)
	if !reflect.DeepEqual(result, []int{-1, -1, -7, -15, -15, 0}) {
		t.Errorf("got %v", result)
	}
}

func TestNoNegatives(t *testing.T) {
	result := firstNegativeInWindow([]int{1, 2, 3, 4, 5}, 3)
	if !reflect.DeepEqual(result, []int{0, 0, 0}) {
		t.Errorf("got %v", result)
	}
}

func TestAllNegatives(t *testing.T) {
	result := firstNegativeInWindow([]int{-3, -5, -2, -8}, 2)
	if !reflect.DeepEqual(result, []int{-3, -5, -2}) {
		t.Errorf("got %v", result)
	}
}

func TestWindowSizeOne(t *testing.T) {
	result := firstNegativeInWindow([]int{4, -2, 3, -1}, 1)
	if !reflect.DeepEqual(result, []int{0, -2, 0, -1}) {
		t.Errorf("got %v", result)
	}
}

func TestWindowFullArray(t *testing.T) {
	result := firstNegativeInWindow([]int{1, 2, -3, 4}, 4)
	if !reflect.DeepEqual(result, []int{-3}) {
		t.Errorf("got %v", result)
	}
}

func TestEmptyInput(t *testing.T) {
	result := firstNegativeInWindow([]int{}, 3)
	if len(result) != 0 {
		t.Error("Expected empty")
	}
}

func TestWindowExceedsLength(t *testing.T) {
	result := firstNegativeInWindow([]int{1, 2}, 5)
	if len(result) != 0 {
		t.Error("Expected empty")
	}
}

func TestWindowSizeZero(t *testing.T) {
	result := firstNegativeInWindow([]int{1, -2, 3}, 0)
	if len(result) != 0 {
		t.Error("Expected empty")
	}
}

func TestCorrectOutputLength(t *testing.T) {
	inputArray := []int{12, -1, -7, 8, -15, 30, 16, 28}
	windowSize := 3
	result := firstNegativeInWindow(inputArray, windowSize)
	expected := len(inputArray) - windowSize + 1
	if len(result) != expected {
		t.Errorf("Expected length %d, got %d", expected, len(result))
	}
}
