package rotatearray

import (
	"reflect"
	"testing"
)

func TestRotateByThree(t *testing.T) {
	if !reflect.DeepEqual(rotateArray([]int{1, 2, 3, 4, 5, 6, 7}, 3), []int{5, 6, 7, 1, 2, 3, 4}) {
		t.Error("mismatch")
	}
}

func TestRotateByZero(t *testing.T) {
	if !reflect.DeepEqual(rotateArray([]int{1, 2, 3, 4, 5}, 0), []int{1, 2, 3, 4, 5}) {
		t.Error("mismatch")
	}
}

func TestRotateByLength(t *testing.T) {
	if !reflect.DeepEqual(rotateArray([]int{1, 2, 3, 4, 5}, 5), []int{1, 2, 3, 4, 5}) {
		t.Error("mismatch")
	}
}

func TestSingleElement(t *testing.T) {
	if !reflect.DeepEqual(rotateArray([]int{42}, 1), []int{42}) {
		t.Error("mismatch")
	}
}

func TestEmptyArray(t *testing.T) {
	result := rotateArray([]int{}, 3)
	if len(result) != 0 {
		t.Error("Expected empty")
	}
}

func TestTwoElementsByOne(t *testing.T) {
	if !reflect.DeepEqual(rotateArray([]int{1, 2}, 1), []int{2, 1}) {
		t.Error("mismatch")
	}
}

func TestNMinusOne(t *testing.T) {
	if !reflect.DeepEqual(rotateArray([]int{1, 2, 3, 4, 5}, 4), []int{2, 3, 4, 5, 1}) {
		t.Error("mismatch")
	}
}

func TestMultipleOfLength(t *testing.T) {
	if !reflect.DeepEqual(rotateArray([]int{1, 2, 3}, 6), []int{1, 2, 3}) {
		t.Error("mismatch")
	}
}

func TestRotateByOneLarger(t *testing.T) {
	if !reflect.DeepEqual(rotateArray([]int{1, 2, 3, 4, 5}, 1), []int{5, 1, 2, 3, 4}) {
		t.Error("mismatch")
	}
}
