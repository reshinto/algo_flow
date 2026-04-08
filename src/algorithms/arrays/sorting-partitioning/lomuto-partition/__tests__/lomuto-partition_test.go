package lomutopartition

import (
	"reflect"
	"testing"
)

func TestDefaultInputPivotAtCorrectPosition(t *testing.T) {
	pivotIndex, result := lomutoPartition([]int{8, 3, 6, 1, 5, 9, 2, 7})
	if result[pivotIndex] != 7 {
		t.Errorf("Expected pivot value 7 at pivotIndex=%d, got %d", pivotIndex, result[pivotIndex])
	}
	for _, leftVal := range result[:pivotIndex] {
		if leftVal > 7 {
			t.Errorf("Left element %d > pivot 7", leftVal)
		}
	}
	for _, rightVal := range result[pivotIndex+1:] {
		if rightVal <= 7 {
			t.Errorf("Right element %d should be > pivot 7", rightVal)
		}
	}
}

func TestSortedArrayPivotAtLast(t *testing.T) {
	pivotIndex, result := lomutoPartition([]int{1, 2, 3, 4, 5})
	if pivotIndex != 4 {
		t.Errorf("Expected pivotIndex=4, got %d", pivotIndex)
	}
	if result[4] != 5 {
		t.Errorf("Expected result[4]=5, got %d", result[4])
	}
}

func TestReverseSortedPivotAtFirst(t *testing.T) {
	pivotIndex, result := lomutoPartition([]int{5, 4, 3, 2, 1})
	if pivotIndex != 0 {
		t.Errorf("Expected pivotIndex=0, got %d", pivotIndex)
	}
	if result[0] != 1 {
		t.Errorf("Expected result[0]=1, got %d", result[0])
	}
}

func TestSingleElement(t *testing.T) {
	pivotIndex, result := lomutoPartition([]int{42})
	if pivotIndex != 0 {
		t.Errorf("Expected pivotIndex=0, got %d", pivotIndex)
	}
	if !reflect.DeepEqual(result, []int{42}) {
		t.Errorf("Expected [42], got %v", result)
	}
}

func TestEmptyArray(t *testing.T) {
	pivotIndex, result := lomutoPartition([]int{})
	if pivotIndex != -1 {
		t.Errorf("Expected pivotIndex=-1 for empty, got %d", pivotIndex)
	}
	if len(result) != 0 {
		t.Errorf("Expected empty result, got %v", result)
	}
}

func TestTwoElementsLargerFirst(t *testing.T) {
	pivotIndex, result := lomutoPartition([]int{5, 2})
	if pivotIndex != 0 {
		t.Errorf("Expected pivotIndex=0, got %d", pivotIndex)
	}
	if result[0] != 2 || result[1] != 5 {
		t.Errorf("Expected [2,5], got %v", result)
	}
}
