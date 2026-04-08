package main

import (
	"reflect"
	"testing"
)

func TestNumberOfRecentCallsDefault(t *testing.T) {
	if !reflect.DeepEqual(numberOfRecentCalls([]int{1, 100, 3001, 3002}), []int{1, 2, 3, 3}) {
		t.Errorf("expected [1 2 3 3]")
	}
}

func TestNumberOfRecentCallsSingle(t *testing.T) {
	if !reflect.DeepEqual(numberOfRecentCalls([]int{500}), []int{1}) {
		t.Errorf("expected [1]")
	}
}

func TestNumberOfRecentCallsAllInWindow(t *testing.T) {
	if !reflect.DeepEqual(numberOfRecentCalls([]int{1, 500, 1000, 2000, 3000}), []int{1, 2, 3, 4, 5}) {
		t.Errorf("expected [1 2 3 4 5]")
	}
}

func TestNumberOfRecentCallsWindowSlides(t *testing.T) {
	if !reflect.DeepEqual(numberOfRecentCalls([]int{1, 100, 3001, 3002, 6002}), []int{1, 2, 3, 3, 2}) {
		t.Errorf("expected [1 2 3 3 2]")
	}
}

func TestNumberOfRecentCallsBoundaryIncluded(t *testing.T) {
	if !reflect.DeepEqual(numberOfRecentCalls([]int{1, 3001}), []int{1, 2}) {
		t.Errorf("expected [1 2]")
	}
}

func TestNumberOfRecentCallsBoundaryExcluded(t *testing.T) {
	if !reflect.DeepEqual(numberOfRecentCalls([]int{1, 3002}), []int{1, 1}) {
		t.Errorf("expected [1 1]")
	}
}

func TestNumberOfRecentCallsAllSpaced(t *testing.T) {
	if !reflect.DeepEqual(numberOfRecentCalls([]int{1, 3002, 6003, 9004}), []int{1, 1, 1, 1}) {
		t.Errorf("expected [1 1 1 1]")
	}
}

func TestNumberOfRecentCallsEmpty(t *testing.T) {
	result := numberOfRecentCalls([]int{})
	if len(result) != 0 {
		t.Errorf("expected empty slice")
	}
}
