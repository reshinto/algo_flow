package main

import (
	"reflect"
	"testing"
)

func TestMaxFrequencyStackDefault(t *testing.T) {
	if !reflect.DeepEqual(maxFrequencyStack([]int{5, 7, 5, 7, 4, 5}), []int{5, 7, 5, 4, 7, 5}) {
		t.Errorf("expected [5 7 5 4 7 5]")
	}
}

func TestMaxFrequencyStackSameFrequencyLifo(t *testing.T) {
	if !reflect.DeepEqual(maxFrequencyStack([]int{1, 2, 3}), []int{3, 2, 1}) {
		t.Errorf("expected [3 2 1]")
	}
}

func TestMaxFrequencyStackSingleRepeated(t *testing.T) {
	if !reflect.DeepEqual(maxFrequencyStack([]int{9, 9, 9}), []int{9, 9, 9}) {
		t.Errorf("expected [9 9 9]")
	}
}

func TestMaxFrequencyStackAlternated(t *testing.T) {
	if !reflect.DeepEqual(maxFrequencyStack([]int{1, 2, 1, 2}), []int{2, 1, 2, 1}) {
		t.Errorf("expected [2 1 2 1]")
	}
}

func TestMaxFrequencyStackSingle(t *testing.T) {
	if !reflect.DeepEqual(maxFrequencyStack([]int{42}), []int{42}) {
		t.Errorf("expected [42]")
	}
}

func TestMaxFrequencyStackEmpty(t *testing.T) {
	result := maxFrequencyStack([]int{})
	if len(result) != 0 {
		t.Errorf("expected empty slice")
	}
}

func TestMaxFrequencyStackMostFrequentFirst(t *testing.T) {
	result := maxFrequencyStack([]int{7, 1, 7, 2, 7})
	if result[0] != 7 || result[1] != 7 || result[2] != 2 {
		t.Errorf("expected first two pops to be 7 and third to be 2")
	}
}
