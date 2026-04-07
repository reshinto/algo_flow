package previoussmallerelement

import (
	"reflect"
	"testing"
)

func TestDefaultInput(t *testing.T) {
	result := previousSmallerElement([]int{4, 10, 5, 8, 20, 15, 3, 12})
	expected := []int{-1, 4, 4, 5, 8, 8, -1, 3}
	if !reflect.DeepEqual(result, expected) {
		t.Errorf("Expected %v, got %v", expected, result)
	}
}

func TestStrictlyDecreasing(t *testing.T) {
	result := previousSmallerElement([]int{5, 4, 3, 2, 1})
	expected := []int{-1, -1, -1, -1, -1}
	if !reflect.DeepEqual(result, expected) {
		t.Errorf("Expected %v, got %v", expected, result)
	}
}

func TestStrictlyIncreasing(t *testing.T) {
	result := previousSmallerElement([]int{1, 2, 3, 4, 5})
	expected := []int{-1, 1, 2, 3, 4}
	if !reflect.DeepEqual(result, expected) {
		t.Errorf("Expected %v, got %v", expected, result)
	}
}

func TestAllEqual(t *testing.T) {
	result := previousSmallerElement([]int{3, 3, 3, 3})
	expected := []int{-1, -1, -1, -1}
	if !reflect.DeepEqual(result, expected) {
		t.Errorf("Expected %v, got %v", expected, result)
	}
}

func TestSingleElement(t *testing.T) {
	result := previousSmallerElement([]int{7})
	expected := []int{-1}
	if !reflect.DeepEqual(result, expected) {
		t.Errorf("Expected %v, got %v", expected, result)
	}
}

func TestEmptyArray(t *testing.T) {
	result := previousSmallerElement([]int{})
	if len(result) != 0 {
		t.Errorf("Expected empty, got %v", result)
	}
}

func TestValleyPeakPattern(t *testing.T) {
	result := previousSmallerElement([]int{1, 3, 2, 4})
	expected := []int{-1, 1, 1, 2}
	if !reflect.DeepEqual(result, expected) {
		t.Errorf("Expected %v, got %v", expected, result)
	}
}
