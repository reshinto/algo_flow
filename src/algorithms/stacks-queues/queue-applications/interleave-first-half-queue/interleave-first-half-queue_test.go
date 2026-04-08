package main

import (
	"reflect"
	"testing"
)

func TestInterleaveFirstHalfQueueSixElements(t *testing.T) {
	if !reflect.DeepEqual(interleaveFirstHalfQueue([]int{1, 2, 3, 4, 5, 6}), []int{1, 4, 2, 5, 3, 6}) {
		t.Errorf("expected [1 4 2 5 3 6]")
	}
}

func TestInterleaveFirstHalfQueueFourElements(t *testing.T) {
	if !reflect.DeepEqual(interleaveFirstHalfQueue([]int{1, 2, 3, 4}), []int{1, 3, 2, 4}) {
		t.Errorf("expected [1 3 2 4]")
	}
}

func TestInterleaveFirstHalfQueueTwoElements(t *testing.T) {
	if !reflect.DeepEqual(interleaveFirstHalfQueue([]int{1, 2}), []int{1, 2}) {
		t.Errorf("expected [1 2]")
	}
}

func TestInterleaveFirstHalfQueueSingleElement(t *testing.T) {
	if !reflect.DeepEqual(interleaveFirstHalfQueue([]int{42}), []int{42}) {
		t.Errorf("expected [42]")
	}
}

func TestInterleaveFirstHalfQueueEmpty(t *testing.T) {
	result := interleaveFirstHalfQueue([]int{})
	if len(result) != 0 {
		t.Errorf("expected empty slice")
	}
}

func TestInterleaveFirstHalfQueueEightElements(t *testing.T) {
	if !reflect.DeepEqual(interleaveFirstHalfQueue([]int{1, 2, 3, 4, 5, 6, 7, 8}), []int{1, 5, 2, 6, 3, 7, 4, 8}) {
		t.Errorf("expected [1 5 2 6 3 7 4 8]")
	}
}
