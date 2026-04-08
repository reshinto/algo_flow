package rotatearraycyclic

import (
	"reflect"
	"testing"
)

func TestRotateByTwo(t *testing.T) {
	if !reflect.DeepEqual(rotateArrayCyclic([]int{1, 2, 3, 4, 5, 6}, 2), []int{5, 6, 1, 2, 3, 4}) {
		t.Error("mismatch")
	}
}

func TestRotateByOne(t *testing.T) {
	if !reflect.DeepEqual(rotateArrayCyclic([]int{1, 2, 3, 4, 5}, 1), []int{5, 1, 2, 3, 4}) {
		t.Error("mismatch")
	}
}

func TestRotateByLength(t *testing.T) {
	if !reflect.DeepEqual(rotateArrayCyclic([]int{1, 2, 3, 4}, 4), []int{1, 2, 3, 4}) {
		t.Error("mismatch")
	}
}

func TestRotateLargerThanLength(t *testing.T) {
	if !reflect.DeepEqual(rotateArrayCyclic([]int{1, 2, 3, 4, 5, 6}, 8), []int{5, 6, 1, 2, 3, 4}) {
		t.Error("mismatch")
	}
}

func TestRotateByZero(t *testing.T) {
	if !reflect.DeepEqual(rotateArrayCyclic([]int{1, 2, 3, 4}, 0), []int{1, 2, 3, 4}) {
		t.Error("mismatch")
	}
}

func TestEmptyArray(t *testing.T) {
	result := rotateArrayCyclic([]int{}, 3)
	if len(result) != 0 {
		t.Error("Expected empty")
	}
}

func TestSingleElement(t *testing.T) {
	if !reflect.DeepEqual(rotateArrayCyclic([]int{42}, 5), []int{42}) {
		t.Error("mismatch")
	}
}

func TestTwoElements(t *testing.T) {
	if !reflect.DeepEqual(rotateArrayCyclic([]int{1, 2}, 1), []int{2, 1}) {
		t.Error("mismatch")
	}
}

func TestSingleLongCycle(t *testing.T) {
	if !reflect.DeepEqual(rotateArrayCyclic([]int{1, 2, 3, 4, 5, 6}, 1), []int{6, 1, 2, 3, 4, 5}) {
		t.Error("mismatch")
	}
}
