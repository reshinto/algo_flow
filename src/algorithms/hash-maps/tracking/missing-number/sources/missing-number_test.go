package main

import "testing"

func TestMissingNumber_Returns2For3_0_1(t *testing.T) {
	if missingNumber([]int{3, 0, 1}) != 2 {
		t.Error("expected 2")
	}
}

func TestMissingNumber_Returns2For0_1(t *testing.T) {
	if missingNumber([]int{0, 1}) != 2 {
		t.Error("expected 2")
	}
}

func TestMissingNumber_Returns8ForLargeArray(t *testing.T) {
	if missingNumber([]int{9, 6, 4, 2, 3, 5, 7, 0, 1}) != 8 {
		t.Error("expected 8")
	}
}

func TestMissingNumber_Returns0For1(t *testing.T) {
	if missingNumber([]int{1}) != 0 {
		t.Error("expected 0")
	}
}

func TestMissingNumber_Returns1For0(t *testing.T) {
	if missingNumber([]int{0}) != 1 {
		t.Error("expected 1")
	}
}

func TestMissingNumber_Returns0ForEmptyArray(t *testing.T) {
	if missingNumber([]int{}) != 0 {
		t.Error("expected 0")
	}
}

func TestMissingNumber_Returns3For0_1_2(t *testing.T) {
	if missingNumber([]int{0, 1, 2}) != 3 {
		t.Error("expected 3")
	}
}

func TestMissingNumber_Returns5For0_1_2_3_4_6(t *testing.T) {
	if missingNumber([]int{0, 1, 2, 3, 4, 6}) != 5 {
		t.Error("expected 5")
	}
}
