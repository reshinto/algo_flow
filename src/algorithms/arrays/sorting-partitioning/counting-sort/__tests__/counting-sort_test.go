package countingsort

import (
	"reflect"
	"testing"
)

func TestBasicUnsortedArray(t *testing.T) {
	result := countingSort([]int{3, 1, 4, 1, 5, 9, 2, 6})
	expected := []int{1, 1, 2, 3, 4, 5, 6, 9}
	if !reflect.DeepEqual(result, expected) {
		t.Errorf("Expected %v, got %v", expected, result)
	}
}

func TestAlreadySorted(t *testing.T) {
	result := countingSort([]int{1, 2, 3, 4, 5})
	expected := []int{1, 2, 3, 4, 5}
	if !reflect.DeepEqual(result, expected) {
		t.Errorf("Expected %v, got %v", expected, result)
	}
}

func TestReverseSorted(t *testing.T) {
	result := countingSort([]int{5, 4, 3, 2, 1})
	expected := []int{1, 2, 3, 4, 5}
	if !reflect.DeepEqual(result, expected) {
		t.Errorf("Expected %v, got %v", expected, result)
	}
}

func TestAllSameElements(t *testing.T) {
	result := countingSort([]int{3, 3, 3, 3})
	expected := []int{3, 3, 3, 3}
	if !reflect.DeepEqual(result, expected) {
		t.Errorf("Expected %v, got %v", expected, result)
	}
}

func TestSingleElement(t *testing.T) {
	result := countingSort([]int{7})
	expected := []int{7}
	if !reflect.DeepEqual(result, expected) {
		t.Errorf("Expected %v, got %v", expected, result)
	}
}

func TestEmptyArray(t *testing.T) {
	result := countingSort([]int{})
	if len(result) != 0 {
		t.Errorf("Expected empty array, got %v", result)
	}
}

func TestDuplicates(t *testing.T) {
	result := countingSort([]int{4, 2, 2, 8, 3, 3, 1})
	expected := []int{1, 2, 2, 3, 3, 4, 8}
	if !reflect.DeepEqual(result, expected) {
		t.Errorf("Expected %v, got %v", expected, result)
	}
}

func TestDefaultInput(t *testing.T) {
	result := countingSort([]int{4, 2, 2, 8, 3, 3, 1, 7, 5})
	expected := []int{1, 2, 2, 3, 3, 4, 5, 7, 8}
	if !reflect.DeepEqual(result, expected) {
		t.Errorf("Expected %v, got %v", expected, result)
	}
}
