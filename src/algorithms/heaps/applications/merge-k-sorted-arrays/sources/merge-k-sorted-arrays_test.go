package heaps

import (
	"reflect"
	"testing"
)

func TestMergeKSortedArraysDefault(t *testing.T) {
	result := mergeKSortedArrays([][]int{{1, 4, 7}, {2, 5, 8}, {3, 6, 9}})
	expected := []int{1, 2, 3, 4, 5, 6, 7, 8, 9}
	if !reflect.DeepEqual(result, expected) {
		t.Errorf("Expected %v, got %v", expected, result)
	}
}

func TestMergeKSortedArraysUnequalLengths(t *testing.T) {
	result := mergeKSortedArrays([][]int{{1}, {2, 3, 4}, {5, 6}})
	if !reflect.DeepEqual(result, []int{1, 2, 3, 4, 5, 6}) {
		t.Errorf("Expected [1,2,3,4,5,6], got %v", result)
	}
}

func TestMergeKSortedArraysSingle(t *testing.T) {
	result := mergeKSortedArrays([][]int{{1, 2, 3}})
	if !reflect.DeepEqual(result, []int{1, 2, 3}) {
		t.Errorf("Expected [1,2,3], got %v", result)
	}
}

func TestMergeKSortedArraysTwo(t *testing.T) {
	result := mergeKSortedArrays([][]int{{1, 3, 5}, {2, 4, 6}})
	if !reflect.DeepEqual(result, []int{1, 2, 3, 4, 5, 6}) {
		t.Errorf("Expected [1,2,3,4,5,6], got %v", result)
	}
}

func TestMergeKSortedArraysSingleElements(t *testing.T) {
	result := mergeKSortedArrays([][]int{{3}, {1}, {2}})
	if !reflect.DeepEqual(result, []int{1, 2, 3}) {
		t.Errorf("Expected [1,2,3], got %v", result)
	}
}

func TestMergeKSortedArraysDuplicates(t *testing.T) {
	result := mergeKSortedArrays([][]int{{1, 3, 3}, {2, 3, 4}})
	if !reflect.DeepEqual(result, []int{1, 2, 3, 3, 3, 4}) {
		t.Errorf("Expected [1,2,3,3,3,4], got %v", result)
	}
}

func TestMergeKSortedArraysNegative(t *testing.T) {
	result := mergeKSortedArrays([][]int{{-3, -1, 0}, {-2, 1, 2}})
	if !reflect.DeepEqual(result, []int{-3, -2, -1, 0, 1, 2}) {
		t.Errorf("Expected [-3,-2,-1,0,1,2], got %v", result)
	}
}
