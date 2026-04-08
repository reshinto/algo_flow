package main

import "testing"

func TestCanJumpReachableMultiplePaths(t *testing.T) {
	if canJump([]int{2, 3, 1, 1, 4}) != true {
		t.Errorf("[2,3,1,1,4] should return true")
	}
}

func TestCanJumpBlockedByZero(t *testing.T) {
	if canJump([]int{3, 2, 1, 0, 4}) != false {
		t.Errorf("[3,2,1,0,4] should return false")
	}
}

func TestCanJumpSingleElement(t *testing.T) {
	if canJump([]int{0}) != true {
		t.Errorf("[0] single element should return true")
	}
}

func TestCanJumpTwoElementsReachable(t *testing.T) {
	if canJump([]int{1, 2}) != true {
		t.Errorf("[1,2] should return true")
	}
}

func TestCanJumpBlockedAtStart(t *testing.T) {
	if canJump([]int{0, 1}) != false {
		t.Errorf("[0,1] blocked at start should return false")
	}
}

func TestCanJumpLongJumpClearsZeros(t *testing.T) {
	if canJump([]int{5, 0, 0, 0, 0, 1}) != true {
		t.Errorf("[5,0,0,0,0,1] long jump should return true")
	}
}

func TestCanJumpAllZeros(t *testing.T) {
	if canJump([]int{0, 0, 0}) != false {
		t.Errorf("[0,0,0] all zeros should return false")
	}
}

func TestCanJumpOneStepToEnd(t *testing.T) {
	if canJump([]int{1, 0}) != true {
		t.Errorf("[1,0] one step to end should return true")
	}
}
