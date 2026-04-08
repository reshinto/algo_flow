package cyclicsort

import (
	"reflect"
	"testing"
)

func TestBasicUnsorted(t *testing.T) {
	result := cyclicSort([]int{3, 5, 2, 1, 4})
	if !reflect.DeepEqual(result, []int{1, 2, 3, 4, 5}) {
		t.Errorf("Expected [1 2 3 4 5], got %v", result)
	}
}

func TestAlreadySorted(t *testing.T) {
	result := cyclicSort([]int{1, 2, 3, 4})
	if !reflect.DeepEqual(result, []int{1, 2, 3, 4}) {
		t.Errorf("Expected [1 2 3 4], got %v", result)
	}
}

func TestReverseSorted(t *testing.T) {
	result := cyclicSort([]int{5, 4, 3, 2, 1})
	if !reflect.DeepEqual(result, []int{1, 2, 3, 4, 5}) {
		t.Errorf("Expected [1 2 3 4 5], got %v", result)
	}
}

func TestSingleElement(t *testing.T) {
	result := cyclicSort([]int{1})
	if !reflect.DeepEqual(result, []int{1}) {
		t.Errorf("Expected [1], got %v", result)
	}
}

func TestEmptyArray(t *testing.T) {
	result := cyclicSort([]int{})
	if len(result) != 0 {
		t.Errorf("Expected empty slice, got %v", result)
	}
}

func TestTwoElementsSwapped(t *testing.T) {
	result := cyclicSort([]int{2, 1})
	if !reflect.DeepEqual(result, []int{1, 2}) {
		t.Errorf("Expected [1 2], got %v", result)
	}
}

func TestDefaultInput(t *testing.T) {
	result := cyclicSort([]int{3, 5, 2, 1, 4, 6})
	if !reflect.DeepEqual(result, []int{1, 2, 3, 4, 5, 6}) {
		t.Errorf("Expected [1 2 3 4 5 6], got %v", result)
	}
}

func TestLongerArray(t *testing.T) {
	result := cyclicSort([]int{8, 3, 6, 1, 5, 9, 2, 7, 4, 10})
	if !reflect.DeepEqual(result, []int{1, 2, 3, 4, 5, 6, 7, 8, 9, 10}) {
		t.Errorf("Expected [1..10], got %v", result)
	}
}
