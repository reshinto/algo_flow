package main

import "testing"

func TestMaxSubarrayKadaneClassicInput(t *testing.T) {
	if maxSubarrayKadane([]int{-2, 1, -3, 4, -1, 2, 1, -5, 4}) != 6 {
		t.Errorf("classic kadane input should return 6")
	}
}

func TestMaxSubarrayKadaneSinglePositive(t *testing.T) {
	if maxSubarrayKadane([]int{1}) != 1 {
		t.Errorf("single positive element should return 1")
	}
}

func TestMaxSubarrayKadaneSingleNegative(t *testing.T) {
	if maxSubarrayKadane([]int{-1}) != -1 {
		t.Errorf("single negative element should return -1")
	}
}

func TestMaxSubarrayKadaneMostlyPositive(t *testing.T) {
	if maxSubarrayKadane([]int{5, 4, -1, 7, 8}) != 23 {
		t.Errorf("[5,4,-1,7,8] should return 23")
	}
}

func TestMaxSubarrayKadaneAllNegative(t *testing.T) {
	if maxSubarrayKadane([]int{-3, -2, -1}) != -1 {
		t.Errorf("all negative should return least negative")
	}
}
