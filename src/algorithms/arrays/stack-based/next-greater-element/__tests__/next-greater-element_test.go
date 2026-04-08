package nextgreaterelement

import (
	"reflect"
	"testing"
)

func TestMixedArray(t *testing.T) {
	result := nextGreaterElement([]int{4, 5, 2, 10, 8})
	expected := []int{5, 10, 10, -1, -1}
	if !reflect.DeepEqual(result, expected) {
		t.Errorf("Expected %v, got %v", expected, result)
	}
}

func TestStrictlyIncreasing(t *testing.T) {
	result := nextGreaterElement([]int{1, 2, 3, 4})
	expected := []int{2, 3, 4, -1}
	if !reflect.DeepEqual(result, expected) {
		t.Errorf("Expected %v, got %v", expected, result)
	}
}

func TestStrictlyDecreasing(t *testing.T) {
	result := nextGreaterElement([]int{4, 3, 2, 1})
	expected := []int{-1, -1, -1, -1}
	if !reflect.DeepEqual(result, expected) {
		t.Errorf("Expected %v, got %v", expected, result)
	}
}

func TestAllEqual(t *testing.T) {
	result := nextGreaterElement([]int{5, 5, 5})
	expected := []int{-1, -1, -1}
	if !reflect.DeepEqual(result, expected) {
		t.Errorf("Expected %v, got %v", expected, result)
	}
}

func TestSingleElement(t *testing.T) {
	result := nextGreaterElement([]int{7})
	expected := []int{-1}
	if !reflect.DeepEqual(result, expected) {
		t.Errorf("Expected %v, got %v", expected, result)
	}
}

func TestEmptyArray(t *testing.T) {
	result := nextGreaterElement([]int{})
	if len(result) != 0 {
		t.Errorf("Expected empty, got %v", result)
	}
}

func TestDefaultInput(t *testing.T) {
	result := nextGreaterElement([]int{4, 5, 2, 10, 8, 1, 3})
	expected := []int{5, 10, 10, -1, -1, 3, -1}
	if !reflect.DeepEqual(result, expected) {
		t.Errorf("Expected %v, got %v", expected, result)
	}
}

func TestWithDuplicates(t *testing.T) {
	result := nextGreaterElement([]int{2, 1, 2, 4, 3})
	expected := []int{4, 2, 4, -1, -1}
	if !reflect.DeepEqual(result, expected) {
		t.Errorf("Expected %v, got %v", expected, result)
	}
}
