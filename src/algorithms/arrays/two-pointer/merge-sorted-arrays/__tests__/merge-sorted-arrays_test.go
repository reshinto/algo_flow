package mergesortedarrays

import (
	"reflect"
	"testing"
)

func TestBasicMerge(t *testing.T) {
	result := mergeSortedArrays([]int{1, 3, 5}, []int{2, 4, 6})
	expected := []int{1, 2, 3, 4, 5, 6}
	if !reflect.DeepEqual(result, expected) {
		t.Errorf("Expected %v, got %v", expected, result)
	}
}

func TestEmptyFirstArray(t *testing.T) {
	result := mergeSortedArrays([]int{}, []int{1, 2, 3})
	expected := []int{1, 2, 3}
	if !reflect.DeepEqual(result, expected) {
		t.Errorf("Expected %v, got %v", expected, result)
	}
}

func TestEmptySecondArray(t *testing.T) {
	result := mergeSortedArrays([]int{1, 2, 3}, []int{})
	expected := []int{1, 2, 3}
	if !reflect.DeepEqual(result, expected) {
		t.Errorf("Expected %v, got %v", expected, result)
	}
}

func TestBothEmpty(t *testing.T) {
	result := mergeSortedArrays([]int{}, []int{})
	if len(result) != 0 {
		t.Errorf("Expected empty, got %v", result)
	}
}

func TestOverlappingValues(t *testing.T) {
	result := mergeSortedArrays([]int{1, 2, 4}, []int{2, 3, 5})
	expected := []int{1, 2, 2, 3, 4, 5}
	if !reflect.DeepEqual(result, expected) {
		t.Errorf("Expected %v, got %v", expected, result)
	}
}

func TestSingleElementArrays(t *testing.T) {
	result := mergeSortedArrays([]int{5}, []int{3})
	expected := []int{3, 5}
	if !reflect.DeepEqual(result, expected) {
		t.Errorf("Expected %v, got %v", expected, result)
	}
}

func TestDefaultInput(t *testing.T) {
	result := mergeSortedArrays([]int{1, 3, 5, 7, 9}, []int{2, 4, 6, 8, 10})
	expected := []int{1, 2, 3, 4, 5, 6, 7, 8, 9, 10}
	if !reflect.DeepEqual(result, expected) {
		t.Errorf("Expected %v, got %v", expected, result)
	}
}
