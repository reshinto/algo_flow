package main

import (
	"reflect"
	"testing"
)

func TestCountBitsZero(t *testing.T) {
	if !reflect.DeepEqual(countBits(0), []int{0}) {
		t.Errorf("expected [0] for countBits(0)")
	}
}

func TestCountBitsTwo(t *testing.T) {
	if !reflect.DeepEqual(countBits(2), []int{0, 1, 1}) {
		t.Errorf("expected [0,1,1] for countBits(2)")
	}
}

func TestCountBitsFive(t *testing.T) {
	if !reflect.DeepEqual(countBits(5), []int{0, 1, 1, 2, 1, 2}) {
		t.Errorf("expected [0,1,1,2,1,2] for countBits(5)")
	}
}

func TestCountBitsFifteenLastElement(t *testing.T) {
	result := countBits(15)
	if result[len(result)-1] != 4 {
		t.Errorf("last element of countBits(15) should be 4")
	}
}

func TestCountBitsLengthIsPlusOne(t *testing.T) {
	result := countBits(10)
	if len(result) != 11 {
		t.Errorf("countBits(10) should have length 11")
	}
}

func TestCountBitsPowersOfTwo(t *testing.T) {
	result := countBits(16)
	for _, power := range []int{1, 2, 4, 8, 16} {
		if result[power] != 1 {
			t.Errorf("result[%d] should be 1 (power of two)", power)
		}
	}
}

func TestCountBitsValuesBeforePowers(t *testing.T) {
	result := countBits(16)
	if result[7] != 3 {
		t.Errorf("result[7] should be 3")
	}
	if result[15] != 4 {
		t.Errorf("result[15] should be 4")
	}
}
