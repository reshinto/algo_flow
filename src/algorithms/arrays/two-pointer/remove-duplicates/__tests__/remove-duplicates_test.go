package removeduplicates

import (
	"reflect"
	"testing"
)

func TestBasicSortedArray(t *testing.T) {
	uniqueCount, result := removeDuplicates([]int{1, 1, 2, 2, 3})
	if uniqueCount != 3 {
		t.Errorf("Expected uniqueCount=3, got %d", uniqueCount)
	}
	if !reflect.DeepEqual(result, []int{1, 2, 3}) {
		t.Errorf("Expected [1,2,3], got %v", result)
	}
}

func TestNoDuplicates(t *testing.T) {
	uniqueCount, result := removeDuplicates([]int{1, 2, 3, 4, 5})
	if uniqueCount != 5 {
		t.Errorf("Expected uniqueCount=5, got %d", uniqueCount)
	}
	if !reflect.DeepEqual(result, []int{1, 2, 3, 4, 5}) {
		t.Errorf("Expected [1,2,3,4,5], got %v", result)
	}
}

func TestAllSame(t *testing.T) {
	uniqueCount, result := removeDuplicates([]int{7, 7, 7, 7})
	if uniqueCount != 1 {
		t.Errorf("Expected uniqueCount=1, got %d", uniqueCount)
	}
	if !reflect.DeepEqual(result, []int{7}) {
		t.Errorf("Expected [7], got %v", result)
	}
}

func TestSingleElement(t *testing.T) {
	uniqueCount, result := removeDuplicates([]int{42})
	if uniqueCount != 1 {
		t.Errorf("Expected uniqueCount=1, got %d", uniqueCount)
	}
	if !reflect.DeepEqual(result, []int{42}) {
		t.Errorf("Expected [42], got %v", result)
	}
}

func TestEmptyArray(t *testing.T) {
	uniqueCount, result := removeDuplicates([]int{})
	if uniqueCount != 0 {
		t.Errorf("Expected uniqueCount=0, got %d", uniqueCount)
	}
	if len(result) != 0 {
		t.Errorf("Expected empty result, got %v", result)
	}
}

func TestLongRuns(t *testing.T) {
	uniqueCount, result := removeDuplicates([]int{1, 1, 1, 2, 2, 2, 3, 3, 3})
	if uniqueCount != 3 {
		t.Errorf("Expected uniqueCount=3, got %d", uniqueCount)
	}
	if !reflect.DeepEqual(result, []int{1, 2, 3}) {
		t.Errorf("Expected [1,2,3], got %v", result)
	}
}

func TestDefaultInput(t *testing.T) {
	uniqueCount, result := removeDuplicates([]int{1, 1, 2, 2, 3, 4, 4, 5})
	if uniqueCount != 5 {
		t.Errorf("Expected uniqueCount=5, got %d", uniqueCount)
	}
	if !reflect.DeepEqual(result, []int{1, 2, 3, 4, 5}) {
		t.Errorf("Expected [1,2,3,4,5], got %v", result)
	}
}
