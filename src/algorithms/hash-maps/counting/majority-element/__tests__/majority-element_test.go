package main

import "testing"

func TestMajorityElement_Returns2ForDefault(t *testing.T) {
	if majorityElement([]int{2, 2, 1, 1, 1, 2, 2}) != 2 {
		t.Error("expected 2")
	}
}

func TestMajorityElement_Returns3For3_2_3(t *testing.T) {
	if majorityElement([]int{3, 2, 3}) != 3 {
		t.Error("expected 3")
	}
}

func TestMajorityElement_ReturnsSingleElement(t *testing.T) {
	if majorityElement([]int{1}) != 1 {
		t.Error("expected 1")
	}
}

func TestMajorityElement_Returns1ForAllOnes(t *testing.T) {
	if majorityElement([]int{1, 1, 1, 1}) != 1 {
		t.Error("expected 1")
	}
}

func TestMajorityElement_Returns5For5_5_5_1_2(t *testing.T) {
	if majorityElement([]int{5, 5, 5, 1, 2}) != 5 {
		t.Error("expected 5")
	}
}

func TestMajorityElement_Returns1For1_2_1_1_3(t *testing.T) {
	if majorityElement([]int{1, 2, 1, 1, 3}) != 1 {
		t.Error("expected 1")
	}
}

func TestMajorityElement_Returns7For7_7(t *testing.T) {
	if majorityElement([]int{7, 7}) != 7 {
		t.Error("expected 7")
	}
}

func TestMajorityElement_ReturnsCorrectMajorityForLargeRepeatedPrefix(t *testing.T) {
	if majorityElement([]int{9, 9, 9, 9, 1, 2, 3}) != 9 {
		t.Error("expected 9")
	}
}
