package main

import (
	"reflect"
	"testing"
)

func TestImplementQueueUsingStacksFifo(t *testing.T) {
	if !reflect.DeepEqual(implementQueueUsingStacks([]int{1, 2, 3, 4, 5}), []int{1, 2, 3, 4, 5}) {
		t.Errorf("expected [1 2 3 4 5]")
	}
}

func TestImplementQueueUsingStacksTwoElements(t *testing.T) {
	if !reflect.DeepEqual(implementQueueUsingStacks([]int{10, 20}), []int{10, 20}) {
		t.Errorf("expected [10 20]")
	}
}

func TestImplementQueueUsingStacksSingle(t *testing.T) {
	if !reflect.DeepEqual(implementQueueUsingStacks([]int{42}), []int{42}) {
		t.Errorf("expected [42]")
	}
}

func TestImplementQueueUsingStacksEmpty(t *testing.T) {
	result := implementQueueUsingStacks([]int{})
	if len(result) != 0 {
		t.Errorf("expected empty slice")
	}
}

func TestImplementQueueUsingStacksDuplicates(t *testing.T) {
	if !reflect.DeepEqual(implementQueueUsingStacks([]int{7, 7, 7}), []int{7, 7, 7}) {
		t.Errorf("expected [7 7 7]")
	}
}

func TestImplementQueueUsingStacksDescending(t *testing.T) {
	if !reflect.DeepEqual(implementQueueUsingStacks([]int{5, 4, 3, 2, 1}), []int{5, 4, 3, 2, 1}) {
		t.Errorf("expected [5 4 3 2 1]")
	}
}

func TestImplementQueueUsingStacksNegative(t *testing.T) {
	if !reflect.DeepEqual(implementQueueUsingStacks([]int{-3, -1, 0, 2}), []int{-3, -1, 0, 2}) {
		t.Errorf("expected [-3 -1 0 2]")
	}
}
