package heaps

import (
	"reflect"
	"testing"
)

func TestHeapSortVisualizationDefault(t *testing.T) {
	result := heapSortVisualization([]int{9, 5, 7, 1, 3, 8, 2, 6, 4})
	expected := []int{1, 2, 3, 4, 5, 6, 7, 8, 9}
	if !reflect.DeepEqual(result, expected) {
		t.Errorf("Expected %v, got %v", expected, result)
	}
}

func TestHeapSortVisualizationAlreadySorted(t *testing.T) {
	result := heapSortVisualization([]int{1, 2, 3, 4, 5})
	expected := []int{1, 2, 3, 4, 5}
	if !reflect.DeepEqual(result, expected) {
		t.Errorf("Expected %v, got %v", expected, result)
	}
}

func TestHeapSortVisualizationReverseSorted(t *testing.T) {
	result := heapSortVisualization([]int{5, 4, 3, 2, 1})
	expected := []int{1, 2, 3, 4, 5}
	if !reflect.DeepEqual(result, expected) {
		t.Errorf("Expected %v, got %v", expected, result)
	}
}

func TestHeapSortVisualizationDuplicates(t *testing.T) {
	result := heapSortVisualization([]int{3, 1, 4, 1, 5, 9, 2, 6, 5})
	expected := []int{1, 1, 2, 3, 4, 5, 5, 6, 9}
	if !reflect.DeepEqual(result, expected) {
		t.Errorf("Expected %v, got %v", expected, result)
	}
}

func TestHeapSortVisualizationSingleElement(t *testing.T) {
	result := heapSortVisualization([]int{42})
	if !reflect.DeepEqual(result, []int{42}) {
		t.Errorf("Expected [42], got %v", result)
	}
}

func TestHeapSortVisualizationEmpty(t *testing.T) {
	result := heapSortVisualization([]int{})
	if len(result) != 0 {
		t.Errorf("Expected empty slice, got %v", result)
	}
}

func TestHeapSortVisualizationTwoElements(t *testing.T) {
	result := heapSortVisualization([]int{2, 1})
	if !reflect.DeepEqual(result, []int{1, 2}) {
		t.Errorf("Expected [1, 2], got %v", result)
	}
}

func TestHeapSortVisualizationNegativeValues(t *testing.T) {
	result := heapSortVisualization([]int{-3, 1, -5, 4, 0})
	expected := []int{-5, -3, 0, 1, 4}
	if !reflect.DeepEqual(result, expected) {
		t.Errorf("Expected %v, got %v", expected, result)
	}
}
