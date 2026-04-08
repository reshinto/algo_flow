package main

import (
	"reflect"
	"testing"
)

func TestOnlineStockSpanDefault(t *testing.T) {
	result := onlineStockSpan([]int{100, 80, 60, 70, 60, 75, 85})
	if !reflect.DeepEqual(result, []int{1, 1, 1, 2, 1, 4, 6}) {
		t.Errorf("expected [1 1 1 2 1 4 6], got %v", result)
	}
}

func TestOnlineStockSpanSingle(t *testing.T) {
	if !reflect.DeepEqual(onlineStockSpan([]int{50}), []int{1}) {
		t.Errorf("expected [1]")
	}
}

func TestOnlineStockSpanDecreasing(t *testing.T) {
	if !reflect.DeepEqual(onlineStockSpan([]int{100, 90, 80, 70}), []int{1, 1, 1, 1}) {
		t.Errorf("expected [1 1 1 1]")
	}
}

func TestOnlineStockSpanIncreasing(t *testing.T) {
	if !reflect.DeepEqual(onlineStockSpan([]int{10, 20, 30, 40}), []int{1, 2, 3, 4}) {
		t.Errorf("expected [1 2 3 4]")
	}
}

func TestOnlineStockSpanAllEqual(t *testing.T) {
	if !reflect.DeepEqual(onlineStockSpan([]int{50, 50, 50, 50}), []int{1, 2, 3, 4}) {
		t.Errorf("expected [1 2 3 4]")
	}
}

func TestOnlineStockSpanZigzag(t *testing.T) {
	if !reflect.DeepEqual(onlineStockSpan([]int{1, 3, 1, 3, 1}), []int{1, 2, 1, 4, 1}) {
		t.Errorf("expected [1 2 1 4 1]")
	}
}
