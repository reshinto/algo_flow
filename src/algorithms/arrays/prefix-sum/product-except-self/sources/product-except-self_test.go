package productexceptself

import (
	"reflect"
	"testing"
)

func TestBasicFourElement(t *testing.T) {
	if !reflect.DeepEqual(productExceptSelf([]int{1, 2, 3, 4}), []int{24, 12, 8, 6}) {
		t.Error("mismatch")
	}
}

func TestDefaultFiveElement(t *testing.T) {
	if !reflect.DeepEqual(productExceptSelf([]int{1, 2, 3, 4, 5}), []int{120, 60, 40, 30, 24}) {
		t.Error("mismatch")
	}
}

func TestSingleZero(t *testing.T) {
	if !reflect.DeepEqual(productExceptSelf([]int{1, 0, 3}), []int{0, 3, 0}) {
		t.Error("mismatch")
	}
}

func TestTwoZeros(t *testing.T) {
	if !reflect.DeepEqual(productExceptSelf([]int{0, 1, 0}), []int{0, 0, 0}) {
		t.Error("mismatch")
	}
}

func TestSingleElement(t *testing.T) {
	if !reflect.DeepEqual(productExceptSelf([]int{5}), []int{1}) {
		t.Error("mismatch")
	}
}

func TestEmptyArray(t *testing.T) {
	result := productExceptSelf([]int{})
	if len(result) != 0 {
		t.Error("Expected empty slice")
	}
}

func TestAllOnes(t *testing.T) {
	if !reflect.DeepEqual(productExceptSelf([]int{1, 1, 1}), []int{1, 1, 1}) {
		t.Error("mismatch")
	}
}

func TestNegativeNumbers(t *testing.T) {
	if !reflect.DeepEqual(productExceptSelf([]int{-1, 2, -3}), []int{-6, 3, -2}) {
		t.Error("mismatch")
	}
}
