package heaps

import (
	"reflect"
	"testing"
)

func TestSortNearlySortedDefault(t *testing.T) {
	result := sortNearlySorted([]int{6, 5, 3, 2, 8, 10, 9}, 3)
	if !reflect.DeepEqual(result, []int{2, 3, 5, 6, 8, 9, 10}) {
		t.Errorf("Expected [2,3,5,6,8,9,10], got %v", result)
	}
}

func TestSortNearlySortedK0(t *testing.T) {
	result := sortNearlySorted([]int{1, 2, 3, 4, 5}, 0)
	if !reflect.DeepEqual(result, []int{1, 2, 3, 4, 5}) {
		t.Errorf("Expected [1,2,3,4,5], got %v", result)
	}
}

func TestSortNearlySortedK1(t *testing.T) {
	result := sortNearlySorted([]int{2, 1, 4, 3, 6, 5}, 1)
	if !reflect.DeepEqual(result, []int{1, 2, 3, 4, 5, 6}) {
		t.Errorf("Expected [1,2,3,4,5,6], got %v", result)
	}
}

func TestSortNearlySortedSingle(t *testing.T) {
	result := sortNearlySorted([]int{42}, 0)
	if !reflect.DeepEqual(result, []int{42}) {
		t.Errorf("Expected [42], got %v", result)
	}
}

func TestSortNearlySortedTwo(t *testing.T) {
	result := sortNearlySorted([]int{2, 1}, 1)
	if !reflect.DeepEqual(result, []int{1, 2}) {
		t.Errorf("Expected [1,2], got %v", result)
	}
}

func TestSortNearlySortedKEqualsLengthMinus1(t *testing.T) {
	result := sortNearlySorted([]int{5, 4, 3, 2, 1}, 4)
	if !reflect.DeepEqual(result, []int{1, 2, 3, 4, 5}) {
		t.Errorf("Expected [1,2,3,4,5], got %v", result)
	}
}

func TestSortNearlySortedDuplicates(t *testing.T) {
	result := sortNearlySorted([]int{3, 3, 1, 1, 2}, 2)
	if !reflect.DeepEqual(result, []int{1, 1, 2, 3, 3}) {
		t.Errorf("Expected [1,1,2,3,3], got %v", result)
	}
}
