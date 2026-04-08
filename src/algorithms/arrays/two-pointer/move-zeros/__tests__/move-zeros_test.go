package movezeros

import (
	"reflect"
	"testing"
)

func TestMovesZerosToEnd(t *testing.T) {
	result := moveZeros([]int{0, 1, 0, 3, 12})
	expected := []int{1, 3, 12, 0, 0}
	if !reflect.DeepEqual(result, expected) {
		t.Errorf("Expected %v, got %v", expected, result)
	}
}

func TestNoZeros(t *testing.T) {
	result := moveZeros([]int{1, 2, 3, 4, 5})
	expected := []int{1, 2, 3, 4, 5}
	if !reflect.DeepEqual(result, expected) {
		t.Errorf("Expected %v, got %v", expected, result)
	}
}

func TestAllZeros(t *testing.T) {
	result := moveZeros([]int{0, 0, 0})
	expected := []int{0, 0, 0}
	if !reflect.DeepEqual(result, expected) {
		t.Errorf("Expected %v, got %v", expected, result)
	}
}

func TestEmptyArray(t *testing.T) {
	result := moveZeros([]int{})
	if len(result) != 0 {
		t.Errorf("Expected empty, got %v", result)
	}
}

func TestZerosAtStart(t *testing.T) {
	result := moveZeros([]int{0, 0, 1, 2})
	expected := []int{1, 2, 0, 0}
	if !reflect.DeepEqual(result, expected) {
		t.Errorf("Expected %v, got %v", expected, result)
	}
}

func TestDefaultInput(t *testing.T) {
	result := moveZeros([]int{0, 1, 0, 3, 12, 0, 5})
	expected := []int{1, 3, 12, 5, 0, 0, 0}
	if !reflect.DeepEqual(result, expected) {
		t.Errorf("Expected %v, got %v", expected, result)
	}
}

func TestDoesNotMutateOriginal(t *testing.T) {
	original := []int{0, 1, 0, 3, 12}
	moveZeros(original)
	expected := []int{0, 1, 0, 3, 12}
	if !reflect.DeepEqual(original, expected) {
		t.Errorf("Original array was mutated: got %v", original)
	}
}
