package main

import "testing"

func TestMinimumJumpsTwoJumpsToEnd(t *testing.T) {
	if minimumJumps([]int{2, 3, 1, 1, 4}) != 2 {
		t.Errorf("[2,3,1,1,4] should return 2")
	}
}

func TestMinimumJumpsAllOnes(t *testing.T) {
	if minimumJumps([]int{1, 1, 1, 1}) != 3 {
		t.Errorf("[1,1,1,1] should return 3")
	}
}

func TestMinimumJumpsTwoElements(t *testing.T) {
	if minimumJumps([]int{2, 1}) != 1 {
		t.Errorf("[2,1] should return 1")
	}
}

func TestMinimumJumpsSingleElement(t *testing.T) {
	if minimumJumps([]int{0}) != 0 {
		t.Errorf("[0] single element should return 0")
	}
}

func TestMinimumJumpsUnreachable(t *testing.T) {
	if minimumJumps([]int{1, 0, 1}) != -1 {
		t.Errorf("[1,0,1] unreachable should return -1")
	}
}

func TestMinimumJumpsEmpty(t *testing.T) {
	if minimumJumps([]int{}) != 0 {
		t.Errorf("empty array should return 0")
	}
}

func TestMinimumJumpsSingleBigJump(t *testing.T) {
	if minimumJumps([]int{5, 1, 1, 1, 1}) != 1 {
		t.Errorf("[5,1,1,1,1] single big jump should return 1")
	}
}
