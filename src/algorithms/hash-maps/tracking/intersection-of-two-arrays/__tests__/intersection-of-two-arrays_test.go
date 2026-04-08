package main

import (
	"reflect"
	"sort"
	"testing"
)

func TestIntersectionOfTwoArrays_Returns2ForDefault(t *testing.T) {
	result := intersectionOfTwoArrays([]int{1, 2, 2, 1}, []int{2, 2})
	if !reflect.DeepEqual(result, []int{2}) {
		t.Errorf("expected [2], got %v", result)
	}
}

func TestIntersectionOfTwoArrays_Returns4_9ForSecondExample(t *testing.T) {
	result := intersectionOfTwoArrays([]int{4, 9, 5}, []int{9, 4, 9, 8, 4})
	sort.Ints(result)
	if !reflect.DeepEqual(result, []int{4, 9}) {
		t.Errorf("expected [4, 9], got %v", result)
	}
}

func TestIntersectionOfTwoArrays_ReturnsEmptyForNoOverlap(t *testing.T) {
	result := intersectionOfTwoArrays([]int{1, 2}, []int{3, 4})
	if len(result) != 0 {
		t.Errorf("expected empty, got %v", result)
	}
}

func TestIntersectionOfTwoArrays_ReturnsEmptyForEmptyArrays(t *testing.T) {
	result := intersectionOfTwoArrays([]int{}, []int{})
	if len(result) != 0 {
		t.Errorf("expected empty, got %v", result)
	}
}

func TestIntersectionOfTwoArrays_ReturnsEmptyWhenFirstEmpty(t *testing.T) {
	result := intersectionOfTwoArrays([]int{}, []int{1, 2})
	if len(result) != 0 {
		t.Errorf("expected empty, got %v", result)
	}
}

func TestIntersectionOfTwoArrays_ReturnsEmptyWhenSecondEmpty(t *testing.T) {
	result := intersectionOfTwoArrays([]int{1, 2}, []int{})
	if len(result) != 0 {
		t.Errorf("expected empty, got %v", result)
	}
}

func TestIntersectionOfTwoArrays_HandlesIdenticalArrays(t *testing.T) {
	result := intersectionOfTwoArrays([]int{1, 2, 3}, []int{1, 2, 3})
	sort.Ints(result)
	if !reflect.DeepEqual(result, []int{1, 2, 3}) {
		t.Errorf("expected [1, 2, 3], got %v", result)
	}
}

func TestIntersectionOfTwoArrays_ReturnsSingleElementIntersection(t *testing.T) {
	result := intersectionOfTwoArrays([]int{5}, []int{5})
	if !reflect.DeepEqual(result, []int{5}) {
		t.Errorf("expected [5], got %v", result)
	}
}
