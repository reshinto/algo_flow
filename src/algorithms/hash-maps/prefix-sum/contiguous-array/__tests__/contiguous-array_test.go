package main

import "testing"

func TestContiguousArray_Returns6ForDefault(t *testing.T) {
	if contiguousArray([]int{0, 1, 0, 1, 1, 0}) != 6 {
		t.Error("expected 6")
	}
}

func TestContiguousArray_Returns2For0_1(t *testing.T) {
	if contiguousArray([]int{0, 1}) != 2 {
		t.Error("expected 2")
	}
}

func TestContiguousArray_Returns2For0_1_0(t *testing.T) {
	if contiguousArray([]int{0, 1, 0}) != 2 {
		t.Error("expected 2")
	}
}

func TestContiguousArray_Returns0ForAllZeros(t *testing.T) {
	if contiguousArray([]int{0, 0, 0}) != 0 {
		t.Error("expected 0")
	}
}

func TestContiguousArray_Returns0ForAllOnes(t *testing.T) {
	if contiguousArray([]int{1, 1, 1}) != 0 {
		t.Error("expected 0")
	}
}

func TestContiguousArray_Returns0ForEmpty(t *testing.T) {
	if contiguousArray([]int{}) != 0 {
		t.Error("expected 0")
	}
}

func TestContiguousArray_Returns4For0_0_1_1(t *testing.T) {
	if contiguousArray([]int{0, 0, 1, 1}) != 4 {
		t.Error("expected 4")
	}
}

func TestContiguousArray_Returns4For1_0_1_0_1(t *testing.T) {
	if contiguousArray([]int{1, 0, 1, 0, 1}) != 4 {
		t.Error("expected 4")
	}
}
