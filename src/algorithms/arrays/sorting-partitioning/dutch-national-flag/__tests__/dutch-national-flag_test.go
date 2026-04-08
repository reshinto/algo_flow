package dutchnationalflag

import (
	"reflect"
	"testing"
)

func TestMixedArray(t *testing.T) {
	result := dutchNationalFlag([]int{2, 0, 1, 2, 1, 0})
	expected := []int{0, 0, 1, 1, 2, 2}
	if !reflect.DeepEqual(result, expected) {
		t.Errorf("Expected %v, got %v", expected, result)
	}
}

func TestAlreadySorted(t *testing.T) {
	result := dutchNationalFlag([]int{0, 0, 1, 1, 2, 2})
	expected := []int{0, 0, 1, 1, 2, 2}
	if !reflect.DeepEqual(result, expected) {
		t.Errorf("Expected %v, got %v", expected, result)
	}
}

func TestReverseSorted(t *testing.T) {
	result := dutchNationalFlag([]int{2, 2, 1, 1, 0, 0})
	expected := []int{0, 0, 1, 1, 2, 2}
	if !reflect.DeepEqual(result, expected) {
		t.Errorf("Expected %v, got %v", expected, result)
	}
}

func TestAllZeros(t *testing.T) {
	result := dutchNationalFlag([]int{0, 0, 0})
	expected := []int{0, 0, 0}
	if !reflect.DeepEqual(result, expected) {
		t.Errorf("Expected %v, got %v", expected, result)
	}
}

func TestEmptyArray(t *testing.T) {
	result := dutchNationalFlag([]int{})
	if len(result) != 0 {
		t.Errorf("Expected empty array, got %v", result)
	}
}

func TestDefaultInput(t *testing.T) {
	result := dutchNationalFlag([]int{2, 0, 1, 2, 1, 0, 0, 2, 1})
	expected := []int{0, 0, 0, 1, 1, 1, 2, 2, 2}
	if !reflect.DeepEqual(result, expected) {
		t.Errorf("Expected %v, got %v", expected, result)
	}
}

func TestDoesNotMutateOriginal(t *testing.T) {
	original := []int{2, 0, 1}
	dutchNationalFlag(original)
	expected := []int{2, 0, 1}
	if !reflect.DeepEqual(original, expected) {
		t.Errorf("Original array was mutated: got %v", original)
	}
}
