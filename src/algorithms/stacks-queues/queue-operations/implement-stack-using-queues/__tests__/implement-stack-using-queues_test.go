package main

import (
	"reflect"
	"testing"
)

func TestImplementStackUsingQueuesLifo(t *testing.T) {
	if !reflect.DeepEqual(implementStackUsingQueues([]int{1, 2, 3, 4, 5}), []int{5, 4, 3, 2, 1}) {
		t.Errorf("expected [5 4 3 2 1]")
	}
}

func TestImplementStackUsingQueuesTwoElements(t *testing.T) {
	if !reflect.DeepEqual(implementStackUsingQueues([]int{10, 20}), []int{20, 10}) {
		t.Errorf("expected [20 10]")
	}
}

func TestImplementStackUsingQueuesSingle(t *testing.T) {
	if !reflect.DeepEqual(implementStackUsingQueues([]int{42}), []int{42}) {
		t.Errorf("expected [42]")
	}
}

func TestImplementStackUsingQueuesEmpty(t *testing.T) {
	result := implementStackUsingQueues([]int{})
	if len(result) != 0 {
		t.Errorf("expected empty slice")
	}
}

func TestImplementStackUsingQueuesDescendingBecomesAscending(t *testing.T) {
	if !reflect.DeepEqual(implementStackUsingQueues([]int{5, 4, 3, 2, 1}), []int{1, 2, 3, 4, 5}) {
		t.Errorf("expected [1 2 3 4 5]")
	}
}

func TestImplementStackUsingQueuesAscendingBecomesDescending(t *testing.T) {
	if !reflect.DeepEqual(implementStackUsingQueues([]int{1, 2, 3}), []int{3, 2, 1}) {
		t.Errorf("expected [3 2 1]")
	}
}

func TestImplementStackUsingQueuesNegative(t *testing.T) {
	if !reflect.DeepEqual(implementStackUsingQueues([]int{-3, -1, 0, 2}), []int{2, 0, -1, -3}) {
		t.Errorf("expected [2 0 -1 -3]")
	}
}
